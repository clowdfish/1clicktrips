// routes/search.js
var _ = require('underscore');
var Promise = require('es6-promise').Promise;

module.exports = function (app, express, production) {

  // ==========================================================================
  // CONTROLLER SETUP =========================================================
  // ==========================================================================

  var AuthController = null;
  var UserController = null;
  var SearchController = null;

  if(production) {
    UserController = require('../controller/userController');
    AuthController = require('../controller/authController');
    SearchController = require('../controller/searchController');
  }
  else {
    UserController = require('../mocking/userController');
    AuthController = require('../mocking/authController');
    SearchController = require('../mocking/searchController');
  }

  // ==========================================================================
  // ROUTER SETUP =============================================================
  // ==========================================================================

  // get an instance of router
  var searchApi = express.Router();

  // route all search requests to /search/
  app.use('/search', searchApi);

  // ==========================================================================
  // HOTELS API ===============================================================
  // ==========================================================================
  searchApi.post('/hotels', function(req, res) {

    var clientIpAddress = req.ip;

    console.log('Hotel request coming from a client with IP address: ' + clientIpAddress);
    console.log(JSON.stringify(req.body, null, 2));

    if(hotelRequestIsValid(req)) {

      if(!clientIpAddress)
        res.status(500).send('Could not figure out client IP address.');

      // add IP address of client
      req.body.ipAddress = clientIpAddress;

      SearchController.getHotels(req.body)
        .then(function(hotels) {
          res.status(200).json(hotels);
        })
        .catch(function(err) {
          res.status(500).json(err.message);
        });
    }
    else {
      res.status(400).send("status.user.error.request.malformed");
    }
  });

  // ==========================================================================
  // SEARCH API ===============================================================
  // ==========================================================================

  searchApi.post('/trips', function (req, res) {

    var secret = app.get('jwtTokenSecret');

    console.log('Trip request coming from the client:');
    console.log(JSON.stringify(req.body, null, 2));

    if(tripRequestIsValid(req, true)) {

      var userLicence = null;
      var userId = AuthController.getUserIdFromRequest(req, secret);

      UserController.getUser(userId)
        .then(function (user) {
          userLicence = user.licence;

          SearchController.getTripResults(req.body, user.licence)
            .then(function(tripResults) {
              res.status(200).json(tripResults);
            })
            .catch(function(err) {
              console.log(err.message);

              res.status(500).json(err.message);
            });
        });
    }
    else {
      res.status(400).send('status.user.error.request.malformed');
    }
  });

  searchApi.post('/trip-update', function (req, res) {

    var secret = app.get('jwtTokenSecret');

    console.log('Trip update request coming from the client:');
    console.log(JSON.stringify(req.body, null, 2));

    if(tripRequestIsValid(req, false)) {

      if(!req.body['tripKey']) {
        res.status(400).send('status.user.error.request.key.missing');
        return;
      }

      var userLicence = null;
      var userId = AuthController.getUserIdFromRequest(req, secret);

      UserController.getUser(userId)
        .then(function (user) {
          userLicence = user.licence;

          SearchController.getTripUpdate(req.body, user.licence)
            .then(function(tripResult) {
              res.status(200).json(tripResult);
            })
            .catch(function(err) {
              console.log(err.message);

              res.status(500).json(err.message);
            });
        });
    }
    else {
      res.status(400).send('status.user.error.request.malformed');
    }
  });

  searchApi.post('/trip-details', function (req, res) {

    var secret = app.get('jwtTokenSecret');

    console.log('Trip details request coming from the client:');
    console.log(JSON.stringify(req.body, null, 2));

    if(tripRequestIsValid(req, false)) {

      if(!req.body['tripKey']) {
        res.status(400).send('status.user.error.request.key.missing');
        return;
      }

      var userLicence = null;
      var userId = AuthController.getUserIdFromRequest(req, secret);

      UserController.getUser(userId)
        .then(function (user) {
          userLicence = user.licence;

          SearchController.getTripDetails(req.body, user.licence)
            .then(function(tripResult) {
              res.status(200).json(tripResult);
            })
            .catch(function(err) {
              console.log(err.message);

              res.status(500).json(err.message);
            });
        });
    }
    else {
      res.status(400).send('status.user.error.request.malformed');
    }
  });


  searchApi.post('/trip-plan', function(req, res) {
    var secret = app.get('jwtTokenSecret');

    console.log('Trip details request coming from the client:');
    console.log(JSON.stringify(req.body, null, 2));

    if(tripRequestIsValid(req, false)) {

      if(!req.body['tripKey']) {
        res.status(400).send('status.user.error.request.key.missing');
        return;
      }

      var userLicence = null;
      var userId = AuthController.getUserIdFromRequest(req, secret);

      UserController.getUser(userId)
        .then(function (user) {
          userLicence = user.licence;

          SearchController.getTripPlan(req.body, user.licence)
            .then(function(tripPlan) {
              req.session.tripPlan = tripPlan;
              res.status(200).send();
            })
            .catch(function(err) {
              res.status(500).json(err.message);
            });
        });
    } else {
      res.status(400).send('status.user.error.request.malformed');
    }
  });

  searchApi.get('/trip-plan', function(req, res) {
    if (req.session.tripPlan) {
      var file = _.clone(req.session.tripPlan);
      delete req.session['tripPlan'];
      res.set('Content-Type', 'text/calendar');
      res.set('Content-Length', file.content.length);
      res.set('Content-Disposition', 'attachment; filename="' + file.title + '.ics"');
      res.send(file.content);
    } else {
      res.status(500).send('status.error.file.not.available');
    }
  });

  // ==========================================================================
  // EVENT API ================================================================
  // ==========================================================================
  searchApi.get('/events', function (req, res) {

    var queryString = req.query.qs;
    // other query params: start_date, end_date, limit

    if(queryString) {
      console.log('Query for events received: ' + queryString);

      // TODO return only events matching the query string
    }
    else {
      // TODO return all events
    }

    SearchController.getEvents(null, 3)
      .then(function(events) {
        res.status(200).json(events);
      })
      .catch(function(err) {
        res.status(500).json(err.message);
      });
  });

  // ==========================================================================
  // MEETING SPACES API =======================================================
  // ==========================================================================
  searchApi.get('/spaces', function (req, res) {

    var queryString = req.query.qs;

    if(queryString) {
      console.log('Query for meeting spaces received: ' + queryString);

      // TODO return only meetings spaces matching the query string
    }
    else {
      // TODO return all events
    }

    SearchController.getMeetingSpaces(null, 3)
      .then(function(meetingSpaces) {
        res.status(200).json(meetingSpaces);
      })
      .catch(function(err) {
        res.status(500).json(err.message);
      });
  });
};

/**
 * Checks the validity of a trip search request object.
 *
 * @param req
 * @param initial
 * @returns {boolean}
 */
function tripRequestIsValid(req, initial) {

  if(!initial) {
    if(req.body['tripKey'] && req.body['currency'] && req.body['locale'])
      return true;
  }

  if(req.body['origin'] && req.body['destination'] &&
    req.body['timing'] && req.body['timing'].length > 0 &&
    req.body['currency'] && req.body['locale']) {

    // check origin format
    if(!isNumber(req.body['origin']['latitude'])
      || !isNumber(req.body['origin']['longitude']))
      return false;

    // check destination format
    if(!isNumber(req.body['destination']['latitude'])
      || !isNumber(req.body['destination']['longitude']))
      return false;

    req.body['timing'].forEach(function(timing) {
      if(!timingIsValid(timing))
        return false;
    });
  }
  else
    return false;

  return true;
}

/**
 * Checks the validity of a hotel search request object.
 *
 * @param req
 * @returns {boolean}
 */
function hotelRequestIsValid(req) {

  if(req.body['tripKey'] && req.body['sessionId'] &&
    req.body['location'] && req.body['dateString'] &&
    req.body['duration'] && req.body['locale'] &&
    req.body['currency'] && req.body['userAgent']) {

    // check location format
    if(!isNumber(req.body['location']['latitude'])
      || !isNumber(req.body['location']['longitude']))
      return false;

    if(!timingIsValid(req.body['dateString']))
      return false;
  }
  else
    return false;

  return true;
}

/**
 * Test if given argument is a number.
 *
 * @param n
 * @returns {boolean}
 */
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Test timing string coming from the client.
 *
 * @param timing
 * @returns {boolean}
 */
function timingIsValid(timing) {
  var timePattern =
    /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/;

  return timePattern.test(timing);
}