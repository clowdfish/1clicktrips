// mocking/searchController.js

var Promise = require('es6-promise').Promise;

module.exports = {

  getEvents: function(filter, limit) {
    console.log("Retrieving mock events. Limit=" + limit);

    return new Promise(function(resolve) {

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

  getHotels: function(searchObject) {
    console.log("Retrieving alternative hotels");

    return new Promise(function(resolve) {

      resolve(createMockHotelAlternatives());
    });
  },

  getTripResults: function(searchObject, userLicence) {
    console.log("Retrieving mock trip results.");

    return new Promise(function(resolve) {

      resolve(createMockTripResult());
    });
  },

  getTripDetails: function(searchObject, userLicence) {
    console.log("Retrieving mock trip details.");

    return new Promise(function(resolve) {

      resolve(createMockTripDetails());
    });
  }
};

// ==========================================================================
// MOCKING OBJECT CREATORS ==================================================
// ==========================================================================

function createMockHotelAlternatives() {
  return [
    {
      "id": 277347,
      "name": "InterCityHotel Hannover",
      "address": "Rosenstrasse 1",
      "city": "Hannover",
      "postalCode": 30159,
      "imageUrl": "/hotels/3000000/2310000/2301700/2301671/2301671_30_t.jpg",
      "standard": 4,
      "distance": 7.5921226,
      "distanceUnit": "KM",
      "location": {
        "latitude": 52.37696,
        "longitude": 9.73808
      },
      "price": "63.75",
      "currency": "EUR",
      "deepLink": "http://www.travelnow.com/templates/489803/hotels/277347/overview?lang=de&amp;currency=EUR&amp;standardCheckin=8/9/2015&amp;standardCheckout=8/10/2015&amp;roomsCount=1&amp;rooms[0].adultsCount=2"
    },
    {
      "id": 128789,
      "name": "Mercure Hotel Hannover Oldenburger Allee",
      "address": "Oldenburger Allee 1",
      "city": "Hannover",
      "postalCode": 30659,
      "imageUrl": "/hotels/1000000/10000/8300/8259/8259_90_t.jpg",
      "standard": 4,
      "distance": 0.36288857,
      "distanceUnit": "KM",
      "location": {
        "latitude": 52.41627,
        "longitude": 9.8284
      },
      "price": "63.00",
      "currency": "EUR",
      "deepLink": "http://www.travelnow.com/templates/489803/hotels/128789/overview?lang=de&amp;currency=EUR&amp;standardCheckin=8/9/2015&amp;standardCheckout=8/10/2015&amp;roomsCount=1&amp;rooms[0].adultsCount=2"
    },
    {
      "id": 169136,
      "name": "Courtyard by Marriott Hannover Maschsee",
      "address": "Arthur-Menge-Ufer 3",
      "city": "Hannover",
      "postalCode": 30169,
      "imageUrl": "/hotels/1000000/570000/563900/563896/563896_86_t.jpg",
      "standard": 4,
      "distance": 8.821195,
      "distanceUnit": "KM",
      "location": {
        "latitude": 52.36244,
        "longitude": 9.73526
      },
      "price": "73.00",
      "currency": "EUR",
      "deepLink": "http://www.travelnow.com/templates/489803/hotels/169136/overview?lang=de&amp;currency=EUR&amp;standardCheckin=8/9/2015&amp;standardCheckout=8/10/2015&amp;roomsCount=1&amp;rooms[0].adultsCount=2"
    },
    {
      "id": 142986,
      "name": "Sheraton Hannover Pelikan Hotel",
      "address": "Pelikanplatz 31",
      "city": "Hannover",
      "postalCode": 30177,
      "imageUrl": "/hotels/1000000/10000/2500/2484/2484_152_t.jpg",
      "standard": 4.5,
      "distance": 4.3988633,
      "distanceUnit": "KM",
      "location": {
        "latitude": 52.39871,
        "longitude": 9.77037
      },
      "price": "89.00",
      "currency": "EUR",
      "deepLink": "http://www.travelnow.com/templates/489803/hotels/142986/overview?lang=de&amp;currency=EUR&amp;standardCheckin=8/9/2015&amp;standardCheckout=8/10/2015&amp;roomsCount=1&amp;rooms[0].adultsCount=2"
    },
    {
      "id": 485124,
      "name": "V.E.K Business by Centro Comfort",
      "address": "Nikolaistr. 12",
      "city": "Hannover",
      "postalCode": 30159,
      "imageUrl": "/hotels/6000000/5930000/5927500/5927442/5927442_18_t.jpg",
      "standard": 3,
      "distance": 7.5984716,
      "distanceUnit": "KM",
      "location": {
        "latitude": 52.38111,
        "longitude": 9.73301
      },
      "price": "49.00",
      "currency": "EUR",
      "deepLink": "http://www.travelnow.com/templates/489803/hotels/485124/overview?lang=de&amp;currency=EUR&amp;standardCheckin=8/9/2015&amp;standardCheckout=8/10/2015&amp;roomsCount=1&amp;rooms[0].adultsCount=2"
    },
    {
      "id": 119757,
      "name": "DORMERO Hotel Hannover",
      "address": "Hildesheimer Strasse 34-38",
      "city": "Hannover",
      "postalCode": 30169,
      "imageUrl": "/hotels/1000000/30000/28500/28491/28491_104_t.jpg",
      "standard": 4.5,
      "distance": 8.10492,
      "distanceUnit": "KM",
      "location": {
        "latitude": 52.36448,
        "longitude": 9.74713
      },
      "price": "75.65",
      "currency": "EUR",
      "deepLink": "http://www.travelnow.com/templates/489803/hotels/119757/overview?lang=de&amp;currency=EUR&amp;standardCheckin=8/9/2015&amp;standardCheckout=8/10/2015&amp;roomsCount=1&amp;rooms[0].adultsCount=2"
    },
    {
      "id": 232592,
      "name": "Kastens Hotel Luisenhof",
      "address": "Luisenstr. 1-3",
      "city": "Hannover",
      "postalCode": 30159,
      "imageUrl": "/hotels/1000000/10000/5400/5372/5372_129_t.jpg",
      "standard": 5,
      "distance": 7.66201,
      "distanceUnit": "KM",
      "location": {
        "latitude": 52.37418,
        "longitude": 9.74051
      },
      "price": "139.00",
      "currency": "EUR",
      "deepLink": "http://www.travelnow.com/templates/489803/hotels/232592/overview?lang=de&amp;currency=EUR&amp;standardCheckin=8/9/2015&amp;standardCheckout=8/10/2015&amp;roomsCount=1&amp;rooms[0].adultsCount=2"
    },
    {
      "id": 143549,
      "name": "Fora Hotel Hannover",
      "address": "Großer Kolonnenweg 19",
      "city": "Hannover",
      "postalCode": 30163,
      "imageUrl": "/hotels/1000000/20000/10600/10570/10570_128_t.jpg",
      "standard": 4,
      "distance": 6.082234,
      "distanceUnit": "KM",
      "location": {
        "latitude": 52.40678,
        "longitude": 9.73861
      },
      "price": "65.45",
      "currency": "EUR",
      "deepLink": "http://www.travelnow.com/templates/489803/hotels/143549/overview?lang=de&amp;currency=EUR&amp;standardCheckin=8/9/2015&amp;standardCheckout=8/10/2015&amp;roomsCount=1&amp;rooms[0].adultsCount=2"
    },
    {
      "id": 117602,
      "name": "Novotel Hannover",
      "address": "Podbielskistrasse 21/23",
      "city": "Hannover",
      "postalCode": 30163,
      "imageUrl": "/hotels/1000000/30000/28400/28343/28343_159_t.jpg",
      "standard": 4,
      "distance": 5.8926296,
      "distanceUnit": "KM",
      "location": {
        "latitude": 52.39018,
        "longitude": 9.75323
      },
      "price": "75.00",
      "currency": "EUR",
      "deepLink": "http://www.travelnow.com/templates/489803/hotels/117602/overview?lang=de&amp;currency=EUR&amp;standardCheckin=8/9/2015&amp;standardCheckout=8/10/2015&amp;roomsCount=1&amp;rooms[0].adultsCount=2"
    },
    {
      "id": 231335,
      "name": "Maritim Grand Hotel",
      "address": "Friedrichswall 11",
      "city": "Hannover",
      "postalCode": 30159,
      "imageUrl": "/hotels/1000000/30000/28500/28490/28490_64_t.jpg",
      "standard": 4,
      "distance": 8.256437,
      "distanceUnit": "KM",
      "location": {
        "latitude": 52.36863,
        "longitude": 9.73694
      },
      "price": "76.00",
      "currency": "EUR",
      "deepLink": "http://www.travelnow.com/templates/489803/hotels/231335/overview?lang=de&amp;currency=EUR&amp;standardCheckin=8/9/2015&amp;standardCheckout=8/10/2015&amp;roomsCount=1&amp;rooms[0].adultsCount=2"
    },
    {
      "id": 250028,
      "name": "GHOTEL hotel &amp; living Hannover",
      "address": "Lathusenstrasse 15",
      "city": "Hannover",
      "postalCode": 30625,
      "imageUrl": "/hotels/2000000/1480000/1473000/1472934/1472934_32_t.jpg",
      "standard": 3.5,
      "distance": 4.8830338,
      "distanceUnit": "KM",
      "location": {
        "latitude": 52.37883,
        "longitude": 9.79747
      },
      "price": "61.00",
      "currency": "EUR",
      "deepLink": "http://www.travelnow.com/templates/489803/hotels/250028/overview?lang=de&amp;currency=EUR&amp;standardCheckin=8/9/2015&amp;standardCheckout=8/10/2015&amp;roomsCount=1&amp;rooms[0].adultsCount=2"
    }
  ];
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

function createMockTripDetails() {
  return {
    "key": "eyJ0cmlwSWQiOiJFa0RPelFtOSIsInNlZ21lbnRQb2ludGVycyI6WzAsNSwwXX0=",
    "searchId": "",
    "origin": {
      "description": "Origin",
      "location": {
        "latitude": 31.9686,
        "longitude": -99.90181
      }
    },
    "destination": {
      "description": "Destination",
      "location": {
        "latitude": 35.51749,
        "longitude": -86.58044
      }
    },
    "departureTime": "",
    "arrivalTime": "",
    "distance": 1413.11,
    "duration": 479,
    "price": {
      "amount": 646.6,
      "currency": "usd",
      "estimate": true
    },
    "currency": "usd",
    "type": 2,
    "segments": [
      {
        "start": {
          "description": "Origin",
          "location": {
            "latitude": 31.9686,
            "longitude": -99.90181
          }
        },
        "end": {
          "description": "Abilene",
          "location": {
            "latitude": 32.41149,
            "longitude": -99.68021
          }
        },
        "departureTime": "",
        "arrivalTime": "",
        "duration": 65,
        "distance": 71.57,
        "path": "wzbbEfaw`RYzq@bS~_@aAviCkOvkAs@fpA}oA_@gxHgdAgiB_x@cgJsbI{uH{lJ_W_{@w{@{pAihDsh@sn@_^uq@{A{[c^eR_jBaa@g_BgQcB{iKJi_BoIk`F{|A{JcAqlFwAuIcFul@cuBwPcPwmAof@es@whAqgAsj@sf@cw@nGwFtqAwj@|o@vT",
        "isMajor": 1,
        "type": 32,
        "price": {
          "amount": 120,
          "currency": "usd"
        }
      },
      {
        "start": {
          "description": "Abilene",
          "location": {
            "latitude": 32.41149,
            "longitude": -99.68021
          },
          "code": "ABI"
        },
        "end": {
          "description": "Nashville",
          "location": {
            "latitude": 36.13118,
            "longitude": -86.66866
          },
          "code": "BNA"
        },
        "departureTime": "2015-07-31T18:23:00",
        "arrivalTime": "2015-07-31T23:49:00",
        "duration": 326,
        "distance": 1263.83,
        "path": "",
        "isMajor": 1,
        "type": 16,
        "bookingLink": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fUSD%2ffarm%2f1%2f9209.10037.2015-07-31%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-31719%7c3441%7c9209%7c2015-07-31T18%3a23%7c10968%7c2015-07-31T19%3a24%3bflight%7c-31719%7c2501%7c10968%7c2015-07-31T21%3a55%7c10037%7c2015-07-31T23%3a49%26carriers%3d-31719%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d366.60%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d5fcf5555-1402-4376-a1a4-80f81895d822%26deeplink_ids%3dcb31002824239ad97ea4aab78b7dee54%26q_datetime_utc%3d2015-07-30T14%3a17%3a57",
        "price": {
          "amount": 366.6,
          "currency": "usd"
        },
        "details": {
          "carriers": [
            {
              "code": "US",
              "name": "US Airways",
              "imageUrl": "http://s1.apideeplink.com/images/airlines/US.png",
              "displayCode": "US"
            }
          ],
          "operatingCarriers": [
            {
              "code": "AA",
              "name": "American Airlines",
              "imageUrl": "http://s1.apideeplink.com/images/airlines/AA.png",
              "displayCode": "AA"
            }
          ],
          "flightNumbers": [
            {
              "flightNumber": "3441",
              "carrier": {
                "code": "US",
                "name": "US Airways",
                "imageUrl": "http://s1.apideeplink.com/images/airlines/US.png",
                "displayCode": "US"
              }
            },
            {
              "flightNumber": "2501",
              "carrier": {
                "code": "US",
                "name": "US Airways",
                "imageUrl": "http://s1.apideeplink.com/images/airlines/US.png",
                "displayCode": "US"
              }
            }
          ]
        }
      },
      {
        "start": {
          "description": "Nashville",
          "location": {
            "latitude": 36.13118,
            "longitude": -86.66866
          }
        },
        "end": {
          "description": "Destination",
          "location": {
            "latitude": 35.51749,
            "longitude": -86.58044
          }
        },
        "departureTime": "",
        "arrivalTime": "",
        "duration": 88,
        "distance": 77.71,
        "path": "{zo{Ebn~oOl\\sTr}Bbp@tqAjf@pAr\\`c@f`APrTbg@bbCnC~l@|t@sRra@_d@~aBwTneDsGbh@{d@nfAgi@tbA_sA~`@w\\|e@oPltAkDz|DoeB`v@kQreA[pkBrp@bg@Cf`Bg^x|BsOzc@jBtnBr^jr@sVvyAnLr^[|zBglArxAga@fbAnWj|AjKtq@cD~fBgx@pvBgcBvX_YhxBkjAr|@cjAh}AkJxbE_K~VcLxz@{~@xq@oZxa@~\\faAjH`DfMpaBkSb{B_AdI_XrgCfSna@jUrQgR",
        "isMajor": 1,
        "type": 32,
        "price": {
          "amount": 160,
          "currency": "usd"
        }
      }
    ]
  };
}


function createMockTripResult() {
  return [
    {
      "key": "eyJ0cmlwSWQiOiJOa0RTZjE3cSIsInNlZ21lbnRQb2ludGVycyI6WzAsNCwwXX0=",
      "searchId": "NyAEfy7q",
      "origin": {
        "description": "Origin",
        "location": {
          "latitude": 31.9686,
          "longitude": -99.90181
        }
      },
      "destination": {
        "description": "Destination",
        "location": {
          "latitude": 35.51749,
          "longitude": -86.58044
        }
      },
      "departureTime": "2015-07-31T17:18:00",
      "arrivalTime": "2015-08-01T01:17:00",
      "distance": 1413.11,
      "duration": 479,
      "price": {
        "amount": 646.6,
        "currency": "usd",
        "estimate": true
      },
      "currency": "usd",
      "type": 2,
      "segments": [
        {
          "start": {
            "description": "Origin",
            "location": {
              "latitude": 31.9686,
              "longitude": -99.90181
            }
          },
          "end": {
            "description": "Abilene",
            "location": {
              "latitude": 32.41149,
              "longitude": -99.68021
            }
          },
          "departureTime": "",
          "arrivalTime": "",
          "duration": 65,
          "distance": 71.57,
          "path": "wzbbEfaw`RYzq@bS~_@aAviCkOvkAs@fpA}oA_@gxHgdAgiB_x@cgJsbI{uH{lJ_W_{@w{@{pAihDsh@sn@_^uq@{A{[c^eR_jBaa@g_BgQcB{iKJi_BoIk`F{|A{JcAqlFwAuIcFul@cuBwPcPwmAof@es@whAqgAsj@sf@cw@nGwFtqAwj@|o@vT",
          "isMajor": 1,
          "type": 32,
          "price": {
            "amount": 120,
            "currency": "usd"
          }
        },
        {
          "start": {
            "description": "Abilene",
            "location": {
              "latitude": 32.41149,
              "longitude": -99.68021
            },
            "code": "ABI"
          },
          "end": {
            "description": "Nashville",
            "location": {
              "latitude": 36.13118,
              "longitude": -86.66866
            },
            "code": "BNA"
          },
          "departureTime": "2015-07-31T18:23:00",
          "arrivalTime": "2015-07-31T23:49:00",
          "duration": 326,
          "distance": 1263.83,
          "path": "",
          "isMajor": 1,
          "type": 16,
          "bookingLink": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fUSD%2ffarm%2f1%2f9209.10037.2015-07-31%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-31719%7c3441%7c9209%7c2015-07-31T18%3a23%7c10968%7c2015-07-31T19%3a24%3bflight%7c-31719%7c2501%7c10968%7c2015-07-31T21%3a55%7c10037%7c2015-07-31T23%3a49%26carriers%3d-31719%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d366.60%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d6395d238-a128-460e-ab85-f3f3b22d2eb0%26deeplink_ids%3dcb31002824239ad97ea4aab78b7dee54%26q_datetime_utc%3d2015-07-30T09%3a43%3a57",
          "price": {
            "amount": 366.6,
            "currency": "usd"
          },
          "details": {
            "carriers": [
              {
                "code": "US",
                "name": "US Airways",
                "imageUrl": "http://s1.apideeplink.com/images/airlines/US.png",
                "displayCode": "US"
              }
            ],
            "operatingCarriers": [
              {
                "code": "AA",
                "name": "American Airlines",
                "imageUrl": "http://s1.apideeplink.com/images/airlines/AA.png",
                "displayCode": "AA"
              }
            ],
            "flightNumbers": [
              {
                "flightNumber": "3441",
                "carrier": {
                  "code": "US",
                  "name": "US Airways",
                  "imageUrl": "http://s1.apideeplink.com/images/airlines/US.png",
                  "displayCode": "US"
                }
              },
              {
                "flightNumber": "2501",
                "carrier": {
                  "code": "US",
                  "name": "US Airways",
                  "imageUrl": "http://s1.apideeplink.com/images/airlines/US.png",
                  "displayCode": "US"
                }
              }
            ]
          }
        },
        {
          "start": {
            "description": "Nashville",
            "location": {
              "latitude": 36.13118,
              "longitude": -86.66866
            }
          },
          "end": {
            "description": "Destination",
            "location": {
              "latitude": 35.51749,
              "longitude": -86.58044
            }
          },
          "departureTime": "",
          "arrivalTime": "",
          "duration": 88,
          "distance": 77.71,
          "path": "{zo{Ebn~oOl\\sTr}Bbp@tqAjf@pAr\\`c@f`APrTbg@bbCnC~l@|t@sRra@_d@~aBwTneDsGbh@{d@nfAgi@tbA_sA~`@w\\|e@oPltAkDz|DoeB`v@kQreA[pkBrp@bg@Cf`Bg^x|BsOzc@jBtnBr^jr@sVvyAnLr^[|zBglArxAga@fbAnWj|AjKtq@cD~fBgx@pvBgcBvX_YhxBkjAr|@cjAh}AkJxbE_K~VcLxz@{~@xq@oZxa@~\\faAjH`DfMpaBkSb{B_AdI_XrgCfSna@jUrQgR",
          "isMajor": 1,
          "type": 32,
          "price": {
            "amount": 160,
            "currency": "usd"
          }
        }
      ]
    },
    {
      "key": "eyJ0cmlwSWQiOiJFMWdEU0drNzkiLCJzZWdtZW50UG9pbnRlcnMiOlswLDIsMF19",
      "searchId": "NyAEfy7q",
      "origin": {
        "description": "Origin",
        "location": {
          "latitude": 31.9686,
          "longitude": -99.90181
        }
      },
      "destination": {
        "description": "Destination",
        "location": {
          "latitude": 35.51749,
          "longitude": -86.58044
        }
      },
      "departureTime": "2015-07-31T16:47:00",
      "arrivalTime": "2015-08-01T01:17:00",
      "distance": 1570.57,
      "duration": 510,
      "price": {
        "amount": 535.6,
        "currency": "usd",
        "estimate": true
      },
      "currency": "usd",
      "type": 2,
      "segments": [
        {
          "start": {
            "description": "Origin",
            "location": {
              "latitude": 31.9686,
              "longitude": -99.90181
            }
          },
          "end": {
            "description": "San Angelo",
            "location": {
              "latitude": 31.3581,
              "longitude": -100.5054
            }
          },
          "departureTime": "",
          "arrivalTime": "",
          "duration": 95,
          "distance": 109.54,
          "path": "wzbbEfaw`RYzq@bS~_@aAviCkOvkA`BfpA`pDClwDrDzhAwAjjAcVtyAwBbsJcwC~jAsC~iIbCtqAzvBnzCzjBjUr[jq@bfBpSvX~uCb_DhyEnpH``Jfn]dm@~bDrgEbmMdqBnsD~HzIfhFnoDpTjc@jNfjAzBnfDtdCb}G~UzzAvhBz`Bvi@sVpdAgqD~zAns@pe@jm@vx@jKflAoA~Lra@zo@vdA~[wP",
          "isMajor": 1,
          "type": 2,
          "price": {
            "amount": 9,
            "currency": "usd"
          }
        },
        {
          "start": {
            "description": "San Angelo",
            "location": {
              "latitude": 31.3581,
              "longitude": -100.5054
            },
            "code": "SJT"
          },
          "end": {
            "description": "Nashville",
            "location": {
              "latitude": 36.13118,
              "longitude": -86.66866
            },
            "code": "BNA"
          },
          "departureTime": "2015-07-31T18:22:00",
          "arrivalTime": "2015-07-31T23:49:00",
          "duration": 327,
          "distance": 1383.32,
          "path": "",
          "isMajor": 1,
          "type": 16,
          "bookingLink": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=W06B5AxQ%2bwn7UTcLLKSjGAzwAYmBTIeozIZceOBYygMIXR5AY2FkGAardN0KUahJ&url=http%3a%2f%2fwww.apideeplink.com%2ftransport_deeplink%2f4.0%2fUS%2fen-us%2fUSD%2ffarm%2f1%2f16324.10037.2015-07-31%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-31719%7c3159%7c16324%7c2015-07-31T18%3a22%7c10968%7c2015-07-31T19%3a30%3bflight%7c-31719%7c2501%7c10968%7c2015-07-31T21%3a55%7c10037%7c2015-07-31T23%3a49%26carriers%3d-31719%26passengers%3d1%2c0%2c0%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d366.60%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_website%26request_id%3d854a1754-f451-4330-90f6-125ad459af58%26deeplink_ids%3d768df84b06ac141394fa08e15526f2c3%26q_datetime_utc%3d2015-07-30T09%3a43%3a51",
          "price": {
            "amount": 366.6,
            "currency": "usd"
          },
          "details": {
            "carriers": [
              {
                "code": "US",
                "name": "US Airways",
                "imageUrl": "http://s1.apideeplink.com/images/airlines/US.png",
                "displayCode": "US"
              }
            ],
            "operatingCarriers": [
              {
                "code": "AA",
                "name": "American Airlines",
                "imageUrl": "http://s1.apideeplink.com/images/airlines/AA.png",
                "displayCode": "AA"
              }
            ],
            "flightNumbers": [
              {
                "flightNumber": "3159",
                "carrier": {
                  "code": "US",
                  "name": "US Airways",
                  "imageUrl": "http://s1.apideeplink.com/images/airlines/US.png",
                  "displayCode": "US"
                }
              },
              {
                "flightNumber": "2501",
                "carrier": {
                  "code": "US",
                  "name": "US Airways",
                  "imageUrl": "http://s1.apideeplink.com/images/airlines/US.png",
                  "displayCode": "US"
                }
              }
            ]
          }
        },
        {
          "start": {
            "description": "Nashville",
            "location": {
              "latitude": 36.13118,
              "longitude": -86.66866
            }
          },
          "end": {
            "description": "Destination",
            "location": {
              "latitude": 35.51749,
              "longitude": -86.58044
            }
          },
          "departureTime": "",
          "arrivalTime": "",
          "duration": 88,
          "distance": 77.71,
          "path": "{zo{Ebn~oOl\\sTr}Bbp@tqAjf@pAr\\`c@f`APrTbg@bbCnC~l@|t@sRra@_d@~aBwTneDsGbh@{d@nfAgi@tbA_sA~`@w\\|e@oPltAkDz|DoeB`v@kQreA[pkBrp@bg@Cf`Bg^x|BsOzc@jBtnBr^jr@sVvyAnLr^[|zBglArxAga@fbAnWj|AjKtq@cD~fBgx@pvBgcBvX_YhxBkjAr|@cjAh}AkJxbE_K~VcLxz@{~@xq@oZxa@~\\faAjH`DfMpaBkSb{B_AdI_XrgCfSna@jUrQgR",
          "isMajor": 1,
          "type": 32,
          "price": {
            "amount": 160,
            "currency": "usd"
          }
        }
      ]
    }
  ];
}
