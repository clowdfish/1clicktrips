// mocking/searchController.js

var Promise = require('es6-promise').Promise;

module.exports = {

  getEvents: function(filter, limit) {

    console.log("Retrieving events. Limit=" + limit);

    return new Promise(function(resolve, reject) {

      if(userId > 0) {
        var eventsArray = [];
        for(var i=0; i<limit; i++) {
          eventsArray.push(createMockEvent(i+1));
        }

        resolve(eventsArray);
      }
      else {
        reject(new Error('Could not retrieve events.'));
      }
    });
  },

  getMeetingSpaces: function(filter, limit) {

    console.log("Retrieving meeting spaces. Limit=" + limit);

    return new Promise(function(resolve, reject) {

      if(userId > 0) {
        var meetingSpacesArray = [];
        for(var i=0; i<limit; i++) {
          meetingSpacesArray.push(createMockMeetingSpace(i+1));
        }

        resolve(meetingSpacesArray);
      }
      else {
        reject(new Error('Could not retrieve meeting spaces.'));
      }
    });
  },

  getTripAlternatives: function(tripId, segmentId, limit) {

    console.log("Retrieving trip alternatives.");

    return new Promise(function(resolve, reject) {

      if(userId > 0) {
        var alternativesArray = [];

        alternativesArray.push(createMockAlternative(1));
        alternativesArray.push(createMockAlternative(2));

        resolve(alternativesArray);
      }
      else {
        reject(new Error('Could not retrieve trip alternatives.'));
      }
    });
  },

  getTripResults: function(searchObject, userLicence) {

    console.log("Retrieving trip results.");

    return new Promise(function(resolve, reject) {

      if(userId > 0) {
        resolve(createMockTripResult());
      }
      else {
        reject(new Error('Could not retrieve trip result.'));
      }
    });
  }
};

// ==========================================================================
// MOCKING OBJECT CREATORS ==================================================
// ==========================================================================

function createMockEvent(id) {
  return {
    "id" : id,
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

function createMockMeetingSpace(id) {
  return {
    "id" : id,
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

function createMockAlternative(id) {

  // TODO implement

  return {
    "id" : id
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