// routes/search.js

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
    SearchController = require('../mocking/searchController');
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

  // ==========================================================================
  // ALTERNATIVES API =========================================================
  // ==========================================================================
  searchApi.get('/alternatives', function (req, res) {

    var segmentId = req.query.segmentId;
    var tripId = req.query.tripId;
    // other query params: limit

    if(segmentId && tripId) {
      console.log('Query for segment received. Segment ID=' + segmentId
        + '; Trip ID=' + tripId);

      // TODO return only alternatives matching the given ID

      SearchController.getTripAlternatives(1, 1, null)
        .then(function(tripAlternatives) {
          res.status(200).json(tripAlternatives);
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

    console.log('Request coming from the client:');
    console.log(JSON.stringify(req.body, null, 2));

    if(checkValidity(req)) {

      var userLicence = null;

      console.log("Extracting user:");
      var userId = AuthController.getUserIdFromRequest(req, secret);

      UserController.getUser(userId)
        .then(function (user) {
          console.log(user);

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
};

function checkValidity(req) {

  var isValid = true;

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function checkAppointmentTimes(appointment) {
    var timePattern =
      /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/;

    return timePattern.test(appointment['start']) &&
      timePattern.test(appointment['end'])
  }

  if(req.body['origin'] && req.body['appointments'] &&
    req.body['appointments'].length > 0 && req.body['currency'] &&
    req.body['locale'] && (req.body['roundTrip'] === true ||
    req.body['roundTrip'] === false)) {

    if(!isNumber(req.body['origin']['latitude'])
      || !isNumber(req.body['origin']['longitude']))
      isValid = false;

    req.body['appointments'].forEach(function(appointment) {

      if(!(appointment['location']
        && isNumber(appointment['location']['latitude'])
        && isNumber(appointment['location']['longitude']))) {

        isValid = false;
      }

      if(!checkAppointmentTimes(appointment)) {

        isValid = false;
      }
    });
  }
  else
    isValid = false;

  return isValid;
}