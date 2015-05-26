// mocking/searchController.js

var Promise = require('es6-promise').Promise;
var Config = require('../../config/general');

module.exports = {

  getEvents: function(filter, limit) {
    console.log("Retrieving mock events. Limit=" + limit);

    return new Promise(function(resolve, reject) {

      var eventsArray = [];
      for(var i=0; i<limit; i++) {
        eventsArray.push(createMockEvent(i+1));
      }

      resolve(eventsArray);
    });
  },

  getMeetingSpaces: function(filter, limit) {
    console.log("Retrieving mock meeting spaces. Limit=" + limit);

    return new Promise(function(resolve) {

      var meetingSpacesArray = [];
      for(var i=0; i<limit; i++) {
        meetingSpacesArray.push(createMockMeetingSpace(i+1));
      }

      resolve(meetingSpacesArray);
    });
  },

  getAlternatives: function(tripId, segmentId, language, currency) {
    console.log("Retrieving mock trip alternatives.");

    return new Promise(function(resolve, reject) {

      var alternativesArray = [];

			if("feg6754ehfwe" === tripId && "fwer2fweg" === segmentId) {
		    alternativesArray.push(createMockAlternative(segmentId));
		    alternativesArray.push(createMockAlternative(segmentId));
			}

      resolve(alternativesArray);
    });
  },

  getAlternativeHotels: function(tripId, segmentId, language, currency) {
    console.log("Retrieving alternative hotels");
    return new Promise(function(resolve, reject) {
      var mockData = createMockHotelAlternatives();
      resolve(mockData);
    });
  },

  getTripResults: function(searchObject, userLicence) {
    console.log("Retrieving mock trip results.");

    return new Promise(function(resolve, reject) {

      resolve(createMockTripResult());
    });
  }
};

// ==========================================================================
// MOCKING OBJECT CREATORS ==================================================
// ==========================================================================

function createMockHotelAlternatives() {
  return [{
    "id": 1,
    "name": "The New Yorker hotel",
    "imageUrl": 'http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg',
    "standard": 5,
    "distance": 1.5,
    "price": 50
  },
  {
    "id": 2,
    "name": "Empire Hotel",
    "imageUrl": 'http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg',
    "standard": 4,
    "distance": 2.5,
    "price": 30
  },
  {
    "id": 3,
    "name": "Mave Hotel NYC",
    "imageUrl": 'http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg',
    "standard": 3,
    "distance": 4,
    "price": 10
  }];
}

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
        "start" : "2015-02-09T02:54:51",
        "end" : "2015-02-15T09:54:51"
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

  return {
    "description": "Go by taxi",
    "replace": [
      "fawe324", "fwer2fweg"
    ],
    "segments" : [
      {
        "id": "ttg-r0-fwer2fweg",
        "start": {
          "description": "Origin",
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
        "departureTime": "2015-02-15T09:54:51",
        "arrivalTime": "2015-02-15T09:54:51",
        "duration": 18,
        "distance": 5.8,
        "path": "uxtfEr~ajUPbm@S~@Gb[yr@CwCrAkLnIuCrOX~RmF~WmBnd@sB^lCSe@vWiErAiGrHcAzC",
        "type": 4,
				"isMajor": 0,
        "price": {
          "amount": 2,
          "currency": "USD"
        }
      }
    ]
  }
}

function createMockTripResult() {
  return [
    [
      {
        "price": 724,
        "currency": "USD",
        "type": 0,
        "outbound": {
          "id": "feg6754ehfwe",
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
          "departureTime": "2015-02-15T09:54:51",
          "arrivalTime": "2015-02-15T09:54:51",
          "distance": 9568.339999999998,
          "duration": 918,
          "segments": [
            {
              "id": "fawe324",
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
              "departureTime": "2015-02-15T09:54:51",
              "arrivalTime": "2015-02-15T09:54:51",
              "duration": 0,
              "distance": 0.02,
              "path": "kxtfEv_bjUIc@",
              "type": 1,
              "description": "Walking, 80m",
              "instruction": "Walk to the bus stop ...",
							"isMajor": 0,
							"bookable": 0,
              "price": {
                "amount": 0,
                "currency": "USD"
              }
            },
            {
              "id": "fwer2fweg",
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
              "departureTime": "2015-02-15T09:54:51",
              "arrivalTime": "2015-02-15T09:54:51",
              "duration": 18,
              "distance": 5.8,
              "path": "uxtfEr~ajUPbm@S~@Gb[yr@CwCrAkLnIuCrOX~RmF~WmBnd@sB^lCSe@vWiErAiGrHcAzC",
              "type": 4,
              "description": "CA Bus Corp, City Bus",
              "instruction": "Take the bus line 10 to the airport.",
							"isMajor": 0,
							"bookable": 0,
              "price": {
                "amount": 2,
                "currency": "USD"
              }
            },
            {
              "id": "rwerwq3",
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
              "departureTime": "2015-02-15T09:54:51",
              "arrivalTime": "2015-02-15T09:54:51",
              "duration": 850,
              "distance": 9517.9,
              "path": "",
              "type": 16,
              "description": "Air America, Airbus A380",
              "instruction": "Take flight 2300 from San Diego to Frankfurt.",
							"isMajor": 1,
							"bookable": 1,
              "price": {
                "amount": 700,
                "currency": "USD"
              }
            },
            {
              "id": "fgergh74gr",
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
              "departureTime": "2015-02-15T09:54:51",
              "arrivalTime": "2015-02-15T09:54:51",
              "duration": 27,
              "distance": 18.22,
              "path": "cydhHsgbw@yJhlCwYbcDwu@j`BmnAvuBks@s]afAcUej@~`A}FjD_c@sGgj@suB_Oo}AoOqi@}[qG{Jan@wNy{@eUih@qo@wu@",
              "type": 8,
              "description": "Deutsche Bahn, Regional train",
              "instruction": "Take the S3 from Stuttgart (Flughafen) to Stuttgart Hbf from platform 2.",
							"isMajor": 0,
							"bookable": 0,
              "price": {
                "amount": 6,
                "currency": "USD"
              }
            },
            {
              "id": "g534gtrg",
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
              "departureTime": "2015-02-15T09:54:51",
              "arrivalTime": "2015-02-15T09:54:51",
              "duration": 21,
              "distance": 26.27,
              "path": "}fwhHub`w@iiB}fFfCfA~M{~@lj@qkAlYy]rYuRpe@gg@|TyZruBoxAjt@{SnVwc@xNijBxDiDfiA_bFt@}m@|LezBnCelAbd@w[yFqi@y@_{@le@cu@wAub@x`@{cI",
              "type": 8,
              "description": "Deutsche Bahn, Regional train",
              "instruction": "Take the RB 2351 to Reichenbach (Fils) from platform 13.",
							"isMajor": 0,
							"bookable": 1,
              "price": {
                "amount": 16,
                "currency": "USD"
              }
            },
            {
              "id": "5346zhewh",
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
              "departureTime": "2015-02-15T09:54:51",
              "arrivalTime": "2015-02-15T09:54:51",
              "duration": 2,
              "distance": 0.13,
              "path": "ohhhHmkwx@EZQUAaCLW@uAXK",
              "type": 1,
              "description": "Walking, 750m",
              "instruction": "Walk to your final destination.",
							"isMajor": 0,
							"bookable": 0,
              "price": {
                "amount": 0,
                "currency": "USD"
              }
            }
          ]
        }
      },
      {
        "price": 1263,
        "currency": "USD",
        "type": 1,
        "outbound": {
          "id": "ourte453fjz",
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
          "departureTime": "2015-02-15T09:54:51",
          "arrivalTime": "2015-02-15T09:54:51",
          "distance": 9585.95,
          "duration": 900,
          "segments": [
            {
              "id": "fwe1few",
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
              "departureTime": "2015-02-15T09:54:51",
              "arrivalTime": "2015-02-15T09:54:51",
              "duration": 0,
              "distance": 0.02,
              "path": "kxtfEv_bjUIc@",
              "type": 1,
              "description": "Walking, 80m",
              "instruction": "Walk to the bus stop ...",
							"isMajor": 0,
							"bookable": 0,
              "price": {
                "amount": 0,
                "currency": "USD"
              }
            },
            {
              "id": "jztk2drg",
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
              "departureTime": "2015-02-15T09:54:51",
              "arrivalTime": "2015-02-15T09:54:51",
              "duration": 18,
              "distance": 5.8,
              "path": "uxtfEr~ajUPbm@S~@Gb[yr@CwCrAkLnIuCrOX~RmF~WmBnd@sB^lCSe@vWiErAiGrHcAzC",
              "type": 4,
              "description": "CA Bus Corp, City Bus",
              "instruction": "Take the bus line 10 to the airport.",
							"isMajor": 0,
							"bookable": 1,
              "price": {
                "amount": 2,
                "currency": "USD"
              }
            },
            {
              "id": "aewr3jzt",
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
              "departureTime": "2015-02-15T09:54:51",
              "arrivalTime": "2015-02-15T09:54:51",
              "duration": 785,
              "distance": 9376.61,
              "path": "",
              "type": 16,
              "description": "Air America, Airbus A380",
              "instruction": "Take flight 2300 from San Diego to Frankfurt.",
							"isMajor": 1,
							"bookable": 1,
              "price": {
                "amount": 1200,
                "currency": "USD"
              }
            },
            {
              "id": "zeth4jku",
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
              "departureTime": "2015-02-15T09:54:51",
              "arrivalTime": "2015-02-15T09:54:51",
              "duration": 74,
              "distance": 177.12,
              "path": "i_opHuzhs@sBg|CrQm{@fc@oWt\\rEncLxcHfyGv{Ife@Yfn@p`AhfMzJ|j@fRnoDpxBx]vAluCgc@huB{pAr~BcZ~fBlz@xjDfkDxz@`hAbm@oJf~NarEfx@aInuI_Bds@_C|a@~`@pxA`uBzx@rZt_@aAhu@qyA`uCoaD|u@sr@`[{Cfg@g_Bha@{WfO}l@tbBymBvkCtQpeE}b@hiAsArY{R|v@lbAnrAjd@raDpl@tYlMllEn}CllBrj@ls@J`fBsQ`aBwcAr`BytBjy@u_Cdr@ytEvz@gyCbe@}UbPo}@`jCy{Dn`@cx@pjD_dL|bAgeC~h@}|@daBotB~e@a~@lpDqgJt_HimKvlAyoCxa@_R`Hoj@drG}eMbpAqgD|[}uAjo@eqExNup@`hAgmDx`@c|B|s@qkBhg@e_@huAMd\\tSt`A__@`cArHhb@sd@`gBjMph@wm@",
              "type": 8,
              "description": "Deutsche Bahn, Inter City Express",
              "instruction": "Take the ... to ...",
							"isMajor": 0,
							"bookable": 1,
              "price": {
                "amount": 45,
                "currency": "USD"
              }
            },
            {
              "id": "atwe5kukol",
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
              "departureTime": "2015-02-15T09:54:51",
              "arrivalTime": "2015-02-15T09:54:51",
              "duration": 21,
              "distance": 26.27,
              "path": "}fwhHub`w@iiB}fFfCfA~M{~@lj@qkAlYy]rYuRpe@gg@|TyZruBoxAjt@{SnVwc@xNijBxDiDfiA_bFt@}m@|LezBnCelAbd@w[yFqi@y@_{@le@cu@wAub@x`@{cI",
              "type": 8,
              "description": "Deutsche Bahn, Regional train",
              "instruction": "Take the RB 2351 to Reichenbach (Fils) from platform 13.",
							"isMajor": 0,
							"bookable": 1,
              "price": {
                "amount": 16,
                "currency": "USD"
              }
            },
            {
              "id": "agt6jhztwe",
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
              "departureTime": "2015-02-15T09:54:51",
              "arrivalTime": "2015-02-15T09:54:51",
              "duration": 2,
              "distance": 0.13,
              "path": "ohhhHmkwx@EZQUAaCLW@uAXK",
              "type": 1,
              "description": "Walking, 750m",
              "instruction": "Walk to your final destination.",
							"isMajor": 0,
							"bookable": 0,
              "price": {
                "amount": 0,
                "currency": "USD"
              }
            }
          ]
        }
      }
    ]
  ];
}
