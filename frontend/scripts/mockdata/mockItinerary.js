(function() {
  angular
    .module('mockdata')
    .value('mockItinerary',
      [
        [
          createItinerary(0),
          createItinerary(1)
        ]
      ]
    );

  function createItinerary(type) {
    return {
      "outbound": {
        "origin": {
            "description": "Origin",
            "location": {
                "latitude": 48.70901,
                "longitude": 9.45728
            }
        },
        "destination": {
            "description": "Destination",
            "location": {
                "latitude": 52.4191,
                "longitude": 9.82575
            }
        },
        "departureTime": 0,
        "arrivalTime": 0,
        "distance": 536.01,
        "duration": 351,
        "segments": [
        {
          "id": 1,
          "start": {
              "description": "Origin",
              "location": {
                  "latitude": 48.70901,
                  "longitude": 9.45728
              }
          },
          "end": {
              "description": "Destination",
              "location": {
                  "latitude": 52.4191,
                  "longitude": 9.82575
              }
          },
          "departureTime": 0,
          "arrivalTime": 0,
          "duration": 50,
          "distance": 50,
          "type": 2,
          "description": "Deutsche Bahn, Regional train",
          "instruction": "Walk somewhere",
          "isMajor": 0,
          "bookable": 1,
          "isBooked": false,
          "price": {
              "amount": 90,
              "currency": "EUR"
          }
        },
        {
          "id": 2,
          "start": {
            "location": {
              "latitude": 10.814803,
              "longitude": 106.665592
            }
          },
          "end": {
            "location": {
              "latitude": 10.800914,
              "longitude": 106.666762
            }
          },
          "departureTime": '2015-01-01T00:00:00Z',
          "arrivalTime": '2015-01-02T00:00:00Z',
          "duration": 50,
          "distance": 50,
          "type": 2,
          "description": "Walking, 580m",
          "instruction": "Walk to bus station",
          "isMajor": 0,
          "bookable": 1,
          "isBooked": false,
          "price": {
              "amount": 90,
              "currency": "EUR"
          }
        },
        {
          "id": 3,
          "start": {
            "location": {
              "latitude": 10.800914,
              "longitude": 106.666762
            }
          },
          "end": {
            "location": {
              "latitude": 10.801672,
              "longitude": 106.651012
            }
          },
          "departureTime": '2015-01-01T00:00:00Z',
          "arrivalTime": '2015-01-02T00:00:00Z',
          "duration": 50,
          "distance": 50,
          "type": 8,
          "description": "Grey Bus Corp, Regional bus",
          "instruction": "Take bus E23 to K20",
          "isMajor": 0,
          "bookable": 1,
          "isBooked": false,
          "price": {
              "amount": 90,
              "currency": "EUR"
          }
        },
        {
          "id": 4,
          "start": {
            "location": {
              "latitude": 10.801672,
              "longitude": 106.651012
            }
          },
          "end": {
            "location": {
              "latitude": 10.802305,
              "longitude": 106.641142
            }
          },
          "departureTime": '2015-01-01T00:00:00Z',
          "arrivalTime": '2015-01-02T00:00:00Z',
          "duration": 50,
          "distance": 50,
          "type": 0,
          "description": "Motel One, Single Bed Room",
          "instruction": "Stay one night at your destination hotel",
          "price": {
              "amount": 90,
              "currency": "EUR"
          },
          "alternatives": [
            {
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
            }
          ]
        },
        {
          "id": 5,
          "start": {
            "location": {
              "latitude": 10.800914,
              "longitude": 106.666762
            }
          },
          "end": {
            "location": {
              "latitude": 10.801672,
              "longitude": 106.651012
            }
          },
          "departureTime": '2015-01-01T00:00:00Z',
          "arrivalTime": '2015-01-02T00:00:00Z',
          "duration": 50,
          "distance": 50,
          "type": 8,
          "description": "My Bus, Line 761",
          "instruction": "Take bus E23 to K20",
          "price": {
              "amount": 0,
              "currency": "EUR"
          }
        }
      ]
      },
      "price": 90,
      "currency": "EUR",
      "type": type
    }
  }
})();
