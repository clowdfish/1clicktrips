// routes/search.js

var Promise = require('es6-promise').Promise;
var AuthController = require('../controller/auth');

module.exports = function (app, express) {

  // ==========================================================================
  // SEARCH API ===============================================================
  // ==========================================================================

  // get an instance of router
  var searchApi = express.Router();

  // route all search requests to /search/
  app.use('/search', searchApi);

  // home page route
  searchApi.post('/trips', function (req, res) {

    var secret = app.get('jwtTokenSecret');

    console.log('Request coming from the client:');
    console.log(JSON.stringify(req.body, null, 2));

    if(checkValidityOfRequest(req)) {

      var userLicence = null;

      console.log("Extracting user:");
      AuthController.getUserFromRequest(req, secret)
        .then(function (user) {
          console.log(user);

          userLicence = user.licence;

          res.status(200).json(createMockTripResult());

          /*
          return new Promise(function (resolve) {

            searchObject = req.body;

            if (!req.body['preferences'] &&
              (user.email || user.twitter_token)) {

              console.log("Looking up preferences for user...");

              var userId = getUserIdFromToken(req);

              SettingsController.getSettings(userId, function (callback_settings) {
                if (callback_settings)
                  searchObject.preferences = callback_settings;
                resolve();
              });
            }
            else {
              console.log("No preferences available for user!");
              resolve();
            }
          });
          */
        });

        /*
        .then(function () {
          console.log("Start search with object: ");
          console.log(searchObject);

          // use TTG Search API to get results
          return tripEngine.getTrips(searchObject, userLicence);
        })
        .then(function (results) {
          console.log("Success.");
          res.status(200).json(results);
        })
        .catch(function (error) {
          console.error(error);
          res.status(500).json(error);
        });
       */
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
    req.body['appointments'].length>0 && req.body['settings'] && (
    req.body['oneWay'] === true || req.body['oneWay'] === false)) {

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