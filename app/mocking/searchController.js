// mocking/searchController.js

var Promise = require('es6-promise').Promise;
var Config = require('../../config/general');
var SearchEngine = require('ttg-search');
var SearchApi = SearchEngine.SearchApi;

// handle different timezones?
var disableTimezones = true;
var searchApi = new SearchApi(disableTimezones, Config.logLocation);

module.exports = {

  getEvents: function(filter, limit) {

    console.log("Retrieving events. Limit=" + limit);

    return new Promise(function(resolve, reject) {

      var eventsArray = [];
      for(var i=0; i<limit; i++) {
        eventsArray.push(createMockEvent(i+1));
      }

      resolve(eventsArray);
    });
  },

  getMeetingSpaces: function(filter, limit) {

    console.log("Retrieving meeting spaces. Limit=" + limit);

    return new Promise(function(resolve) {

      var meetingSpacesArray = [];
      for(var i=0; i<limit; i++) {
        meetingSpacesArray.push(createMockMeetingSpace(i+1));
      }

      resolve(meetingSpacesArray);
    });
  },

  getTripAlternatives: function(tripId, segmentId, limit) {

    console.log("Retrieving trip alternatives.");

    return new Promise(function(resolve) {

      var alternativesArray = [];

      alternativesArray.push(createMockAlternative(1));
      alternativesArray.push(createMockAlternative(2));

      resolve(alternativesArray);
    });
  },

  getTripResults: function(searchObject, userLicence) {

    console.log("Retrieving trip results.");

    return new Promise(function(resolve, reject) {

      /*
      // Rome2Rio API request
      searchApi.search(searchObject, 0, userLicence)
        .then(function(itineraries) {

         resolve(itineraries);
        })
        .catch(function(error) {

          reject(error);
        });
      */

      resolve(createMockTripResult());
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
    [
      {
        "outbound": {
          "origin": {
            "description": "Origin",
            "location": {
              "latitude": 32.71574,
              "longitude": -117.1611
            }
          },
          "destination": {
            "description": "Destination",
            "location": {
              "latitude": 48.708,
              "longitude": 9.46498
            }
          },
          "departureTime": 0,
          "arrivalTime": 0,
          "distance": 9568.339999999998,
          "duration": 918,
          "segments": [
            {
              "start": {
                "description": "Origin",
                "location": {
                  "latitude": 32.71574,
                  "longitude": -117.1611
                }
              },
              "end": {
                "description": "Broadway & 4th Ave",
                "location": {
                  "latitude": 32.71579,
                  "longitude": -117.1609
                }
              },
              "departureTime": 0,
              "arrivalTime": 0,
              "duration": 0,
              "distance": 0.02,
              "path": "kxtfEv_bjUIc@",
              "type": 1,
              "price": {
                "amount": 0,
                "currency": "EUR"
              }
            },
            {
              "start": {
                "description": "Broadway & 4th Ave",
                "location": {
                  "latitude": 32.71579,
                  "longitude": -117.1609
                }
              },
              "end": {
                "description": "San Diego",
                "location": {
                  "latitude": 32.73198,
                  "longitude": -117.1974
                }
              },
              "departureTime": 0,
              "arrivalTime": 0,
              "duration": 18,
              "distance": 5.8,
              "path": "uxtfEr~ajUPbm@S~@Gb[yr@CwCrAkLnIuCrOX~RmF~WmBnd@sB^lCSe@vWiErAiGrHcAzC",
              "type": 4,
              "price": {
                "amount": 2,
                "currency": "USD"
              }
            },
            {
              "start": {
                "description": "San Diego",
                "location": {
                  "latitude": 32.73198,
                  "longitude": -117.1974
                }
              },
              "end": {
                "description": "Stuttgart",
                "location": {
                  "latitude": 48.69036,
                  "longitude": 9.19219
                }
              },
              "departureTime": 0,
              "arrivalTime": 0,
              "duration": 850,
              "distance": 9517.9,
              "path": "",
              "type": 16,
              "price": {
                "amount": 700,
                "currency": "USD"
              }
            },
            {
              "start": {
                "description": "Stuttgart",
                "location": {
                  "latitude": 48.69036,
                  "longitude": 9.19219
                }
              },
              "end": {
                "description": "Stuttgart Hbf",
                "location": {
                  "latitude": 48.78463,
                  "longitude": 9.18075
                }
              },
              "departureTime": 0,
              "arrivalTime": 0,
              "duration": 27,
              "distance": 18.22,
              "path": "cydhHsgbw@yJhlCwYbcDwu@j`BmnAvuBks@s]afAcUej@~`A}FjD_c@sGgj@suB_Oo}AoOqi@}[qG{Jan@wNy{@eUih@qo@wu@",
              "type": 8,
              "price": {
                "amount": 6,
                "currency": "USD"
              }
            },
            {
              "start": {
                "description": "Stuttgart Hbf",
                "location": {
                  "latitude": 48.78463,
                  "longitude": 9.18075
                }
              },
              "end": {
                "description": "Reichenbach(Fils)",
                "location": {
                  "latitude": 48.70808,
                  "longitude": 9.46375
                }
              },
              "departureTime": 0,
              "arrivalTime": 0,
              "duration": 21,
              "distance": 26.27,
              "path": "}fwhHub`w@iiB}fFfCfA~M{~@lj@qkAlYy]rYuRpe@gg@|TyZruBoxAjt@{SnVwc@xNijBxDiDfiA_bFt@}m@|LezBnCelAbd@w[yFqi@y@_{@le@cu@wAub@x`@{cI",
              "type": 8,
              "price": {
                "amount": 16,
                "currency": "USD"
              }
            },
            {
              "start": {
                "description": "Reichenbach(Fils)",
                "location": {
                  "latitude": 48.70808,
                  "longitude": 9.46375
                }
              },
              "end": {
                "description": "Destination",
                "location": {
                  "latitude": 48.708,
                  "longitude": 9.46498
                }
              },
              "departureTime": 0,
              "arrivalTime": 0,
              "duration": 2,
              "distance": 0.13,
              "path": "ohhhHmkwx@EZQUAaCLW@uAXK",
              "type": 1,
              "price": {
                "amount": 0,
                "currency": "EUR"
              }
            }
          ]
        },
        "price": 724,
        "currency": "EUR",
        "type": 0
      },
      {
        "outbound": {
          "origin": {
            "description": "Origin",
            "location": {
              "latitude": 32.71574,
              "longitude": -117.1611
            }
          },
          "destination": {
            "description": "Destination",
            "location": {
              "latitude": 48.708,
              "longitude": 9.46498
            }
          },
          "departureTime": 0,
          "arrivalTime": 0,
          "distance": 9585.95,
          "duration": 900,
          "segments": [
            {
              "start": {
                "description": "Origin",
                "location": {
                  "latitude": 32.71574,
                  "longitude": -117.1611
                }
              },
              "end": {
                "description": "Broadway & 4th Ave",
                "location": {
                  "latitude": 32.71579,
                  "longitude": -117.1609
                }
              },
              "departureTime": 0,
              "arrivalTime": 0,
              "duration": 0,
              "distance": 0.02,
              "path": "kxtfEv_bjUIc@",
              "type": 1,
              "price": {
                "amount": 0,
                "currency": "EUR"
              }
            },
            {
              "start": {
                "description": "Broadway & 4th Ave",
                "location": {
                  "latitude": 32.71579,
                  "longitude": -117.1609
                }
              },
              "end": {
                "description": "San Diego",
                "location": {
                  "latitude": 32.73198,
                  "longitude": -117.1974
                }
              },
              "departureTime": 0,
              "arrivalTime": 0,
              "duration": 18,
              "distance": 5.8,
              "path": "uxtfEr~ajUPbm@S~@Gb[yr@CwCrAkLnIuCrOX~RmF~WmBnd@sB^lCSe@vWiErAiGrHcAzC",
              "type": 4,
              "price": {
                "amount": 2,
                "currency": "USD"
              }
            },
            {
              "start": {
                "description": "San Diego",
                "location": {
                  "latitude": 32.73198,
                  "longitude": -117.1974
                }
              },
              "end": {
                "description": "Frankfurt",
                "location": {
                  "latitude": 50.05143,
                  "longitude": 8.5714
                }
              },
              "departureTime": 0,
              "arrivalTime": 0,
              "duration": 785,
              "distance": 9376.61,
              "path": "",
              "type": 16,
              "price": {
                "amount": 1200,
                "currency": "USD"
              }
            },
            {
              "start": {
                "description": "Frankfurt",
                "location": {
                  "latitude": 50.05143,
                  "longitude": 8.5714
                }
              },
              "end": {
                "description": "Stuttgart Hbf",
                "location": {
                  "latitude": 48.78463,
                  "longitude": 9.18075
                }
              },
              "departureTime": 0,
              "arrivalTime": 0,
              "duration": 74,
              "distance": 177.12,
              "path": "i_opHuzhs@sBg|CrQm{@fc@oWt\\rEncLxcHfyGv{Ife@Yfn@p`AhfMzJ|j@fRnoDpxBx]vAluCgc@huB{pAr~BcZ~fBlz@xjDfkDxz@`hAbm@oJf~NarEfx@aInuI_Bds@_C|a@~`@pxA`uBzx@rZt_@aAhu@qyA`uCoaD|u@sr@`[{Cfg@g_Bha@{WfO}l@tbBymBvkCtQpeE}b@hiAsArY{R|v@lbAnrAjd@raDpl@tYlMllEn}CllBrj@ls@J`fBsQ`aBwcAr`BytBjy@u_Cdr@ytEvz@gyCbe@}UbPo}@`jCy{Dn`@cx@pjD_dL|bAgeC~h@}|@daBotB~e@a~@lpDqgJt_HimKvlAyoCxa@_R`Hoj@drG}eMbpAqgD|[}uAjo@eqExNup@`hAgmDx`@c|B|s@qkBhg@e_@huAMd\\tSt`A__@`cArHhb@sd@`gBjMph@wm@",
              "type": 8,
              "price": {
                "amount": 45,
                "currency": "USD"
              }
            },
            {
              "start": {
                "description": "Stuttgart Hbf",
                "location": {
                  "latitude": 48.78463,
                  "longitude": 9.18075
                }
              },
              "end": {
                "description": "Reichenbach(Fils)",
                "location": {
                  "latitude": 48.70808,
                  "longitude": 9.46375
                }
              },
              "departureTime": 0,
              "arrivalTime": 0,
              "duration": 21,
              "distance": 26.27,
              "path": "}fwhHub`w@iiB}fFfCfA~M{~@lj@qkAlYy]rYuRpe@gg@|TyZruBoxAjt@{SnVwc@xNijBxDiDfiA_bFt@}m@|LezBnCelAbd@w[yFqi@y@_{@le@cu@wAub@x`@{cI",
              "type": 8,
              "price": {
                "amount": 16,
                "currency": "USD"
              }
            },
            {
              "start": {
                "description": "Reichenbach(Fils)",
                "location": {
                  "latitude": 48.70808,
                  "longitude": 9.46375
                }
              },
              "end": {
                "description": "Destination",
                "location": {
                  "latitude": 48.708,
                  "longitude": 9.46498
                }
              },
              "departureTime": 0,
              "arrivalTime": 0,
              "duration": 2,
              "distance": 0.13,
              "path": "ohhhHmkwx@EZQUAaCLW@uAXK",
              "type": 1,
              "price": {
                "amount": 0,
                "currency": "EUR"
              }
            }
          ]
        },
        "price": 1263,
        "currency": "EUR",
        "type": 1
      }
    ]
  ];
}