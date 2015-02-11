// routes/search.js

var Promise = require('es6-promise').Promise;

module.exports = function (app, express, production) {

  // ==========================================================================
  // CONTROLLER SETUP =========================================================
  // ==========================================================================

  var AuthController = null;
  var UserController = null;

  if(production) {
    UserController = require('../controller/user');
    AuthController = require('../controller/auth');
  }
  else {
    UserController = require('../mocking/user');
    AuthController = require('../mocking/auth');
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

    // the events API is not available in production as of now
    if(production) {
      res.status(404).send("Events Service not available yet.");
    }
    else {
      res.status(200).json([
        createMockEvent(),
        createMockEvent(),
        createMockEvent()
      ]);
    }
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

    // the meeting spaces API is not available in production as of now
    if(production) {
      res.status(404).send("Meeting Spaces Service not available yet.");
    }
    else {
      res.status(200).json([
        createMockMeetingSpace(),
        createMockMeetingSpace(),
        createMockMeetingSpace()
      ]);
    }
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

      // the meeting spaces API is not available in production as of now
      if(production) {
        res.status(404).send("Meeting Spaces Service not available yet.");
      }
      else {
        res.status(200).json([
          createMockAlternative(),
          createMockAlternative()
        ]);
      }
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

    if(checkValidityOfRequest(req)) {

      var userLicence = null;

      console.log("Extracting user:");
      var userId = AuthController.getUserIdFromRequest(req, secret);

      UserController.getUser(userId)
        .then(function (user) {
          console.log(user);

          userLicence = user.licence;

          if(!production)
            res.status(200).json(createMockTripResult());
          else
            res.status(404).send("Search Service not available yet.");

          /*
          return new Promise(function (resolve) {
            // resolve with preferences object
          }); */
        });

        /*
        .then(function () {
          searchObject = req.body;

          // use TTG Search API to get results
          return tripEngine.getTrips(searchObject, userLicence);
        })
        .then(function (results) {
          res.status(200).json(results);
        })
        .catch(function (error) {
          res.status(500).json(error);
        }); */
    }
    else {
      res.status(400).send('status.user.error.request.malformed');
    }
  });
};

function checkValidityOfRequest(req) {

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  if(req.body['origin'] && req.body['appointments'] &&
    req.body['appointments'].length > 0 && req.body['currency'] &&
    req.body['locale'] && (req.body['roundTrip'] === true ||
    req.body['roundTrip'] === false)) {

    if(!isNumber(req.body['origin']['latitude'])
      || !isNumber(req.body['origin']['longitude']))
      return false;

    req.body['appointments'].forEach(function(appointment) {
      if(!(appointment['location']
        && isNumber(appointment['location']['latitude'])
        && isNumber(appointment['location']['longitude'])))
        return false;

      var timePattern =
        /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/;

      if(!(timePattern.test(appointment['start']) &&
          timePattern.test(appointment['end'])))
        return false;
    });
  }
  else
    return false;

  return true;
}

// ==========================================================================
// MOCKING OBJECT CREATORS ==================================================
// ==========================================================================

function createMockEvent() {
  return {
    "id" : 1,
    "title" : "World Event Las Vegas",
    "description" : "An example event",
    "location" : {
      "latitude" : 36.161805,
      "longitude" : -115.141183
    },
    "tags" : [
      "test", "another tag", "cool"
    ],
    "dates" : [
      {
        "start" : "2015-02-09T02:54:51+00:0",
        "end" : "2015-02-15T09:54:51+00:0"
      }
    ],
    "open": true,
    "url" : "http://whatever.com",
    "image" : "http://placehold.it/150x150"
  }
}

function createMockMeetingSpace() {
  return {
    "id" : 1,
    "title" : "MeetNow Space",
    "description" : "An example meeting space",
    "location" : {
      "latitude" : 48.709008,
      "longitude" : 9.457281
    },
    "seatsAvailable" : 20,
    "catering" : false
  }
}

function createMockAlternative() {

  // TODO implement

  return {
    "id" : "test"
  }
}

function createMockTripResult() {
  return [
    {
      "outbound": {
        "origin": {
          "description": "Home Address",
          "location": {
            "latitude": 48.709008,
            "longitude": 9.457281
          }
        },
        "destination": {
          "description": "Customer in Hanover",
          "location": {
            "latitude": 52.419096,
            "longitude": 9.82575
          }
        },
        "departureTime": 1416802600,
        "arrivalTime": 1416821400,
        "distance": 413.8245964017389,
        "duration": 313,
        "segments": [
          {
            "start": {
              "description": "Home Address",
              "location": {
                "latitude": 48.709008,
                "longitude": 9.457281
              }
            },
            "end": {
              "description": "Customer in Hanover",
              "location": {
                "latitude": 52.419096,
                "longitude": 9.82575
              }
            },
            "departureTime": 1416802600,
            "arrivalTime": 1416821400,
            "duration": 313.3333333333333,
            "type": 4,
            "price": {
              "amount": 177.94457645274773,
              "currency": "EUR"
            }
          }
        ]
      },
      "price": 355.88915290549545,
      "currency": "EUR",
      "type": 0,
      "inbound": {
        "origin": {
          "latitude": 52.419096,
          "longitude": 9.82575
        },
        "destination": {
          "latitude": 48.709008,
          "longitude": 9.457281
        },
        "departureTime": 1416835800,
        "arrivalTime": 1416854600,
        "distance": 413.8245964017389,
        "duration": 313,
        "segments": [
          {
            "start": {
              "description": "Customer in Hanover",
              "location": {
                "latitude": 52.419096,
                "longitude": 9.82575
              }
            },
            "end": {
              "description": "Home Address",
              "location": {
                "latitude": 48.709008,
                "longitude": 9.457281
              }
            },
            "departureTime": 1416835800,
            "arrivalTime": 1416854600,
            "duration": 313.3333333333333,
            "type": 4,
            "price": {
              "amount": 177.94457645274773,
              "currency": "EUR"
            }
          }
        ]
      }
    },
    {
      "outbound": {
        "origin": {
          "description": "Home Address",
          "location": {
            "latitude": 48.709008,
            "longitude": 9.457281
          }
        },
        "destination": {
          "description": "Customer in Hanover",
          "location": {
            "latitude": 52.419096,
            "longitude": 9.82575
          }
        },
        "departureTime": 1416802600,
        "arrivalTime": 1416821400,
        "distance": 413.8245964017389,
        "duration": 313,
        "segments": [
          {
            "start": {
              "description": "Home Address",
              "location": {
                "latitude": 48.709008,
                "longitude": 9.457281
              }
            },
            "end": {
              "description": "Customer in Hanover",
              "location": {
                "latitude": 52.419096,
                "longitude": 9.82575
              }
            },
            "departureTime": 1416802600,
            "arrivalTime": 1416821400,
            "duration": 313.3333333333333,
            "type": 4,
            "price": {
              "amount": 177.94457645274773,
              "currency": "EUR"
            }
          }
        ]
      },
      "price": 355.88915290549545,
      "currency": "EUR",
      "type": 1,
      "inbound": {
        "origin": {
          "latitude": 52.419096,
          "longitude": 9.82575
        },
        "destination": {
          "latitude": 48.709008,
          "longitude": 9.457281
        },
        "departureTime": 1416835800,
        "arrivalTime": 1416854600,
        "distance": 413.8245964017389,
        "duration": 313,
        "segments": [
          {
            "start": {
              "description": "Customer in Hanover",
              "location": {
                "latitude": 52.419096,
                "longitude": 9.82575
              }
            },
            "end": {
              "description": "Home Address",
              "location": {
                "latitude": 48.709008,
                "longitude": 9.457281
              }
            },
            "departureTime": 1416835800,
            "arrivalTime": 1416854600,
            "duration": 313.3333333333333,
            "type": 4,
            "price": {
              "amount": 177.94457645274773,
              "currency": "EUR"
            }
          }
        ]
      }
    }
  ];
}