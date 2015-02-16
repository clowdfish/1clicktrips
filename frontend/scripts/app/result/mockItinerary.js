(function() {
  angular
    .module('app.result')
    .value('mockItinerary', [
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
            "id": 1,
            "origin": {
              "latitude": 10.814803,
              "longitude": 106.665592
            },
            "destination": {
              "latitude": 10.800914,
              "longitude": 106.666762
            },
            "duration": 10,
            "distance": 10,
            "type": 8,
            "price": 25,
            "currency": 'USD',
            "departureTime": '2015-01-01T00:00:00Z',
            "arrivalTime": '2015-01-02T00:00:00Z',
            "name": "Walk to bus station"
          },

          {
            "id": 2,
            "origin": {
              "latitude": 10.800914,
              "longitude": 106.666762
            },
            "destination": {
              "latitude": 10.801672,
              "longitude": 106.651012
            },
            "duration": 10,
            "distance": 10,
            "type": 8,
            "price": 15,
            "currency": 'USD',
            "departureTime": '2015-01-01T00:00:00Z',
            "arrivalTime": '2015-01-02T00:00:00Z',
            "name": "Take bus E23 to K20"
          },
          {
            "id": 3,
            "origin": {
              "latitude": 10.801672,
              "longitude": 106.651012
            },
            "destination": {
              "latitude": 10.802305,
              "longitude": 106.641142
            },
            "duration": 10,
            "distance": 10,
            "type": 0,
            "price": 15,
            "currency": 'USD',
            "departureTime": '2015-01-01T00:00:00Z',
            "arrivalTime": '2015-01-02T00:00:00Z',
            "name": "Stay one night at your destination hotel",
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
              },
            ]
          }
        ]
      },
      "destination": "Customer in Hanover",
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
            "id": 4,
            "origin": {
              "latitude": 10.802305,
              "longitude": 106.641142
            },
            "destination": {
              "latitude": 10.797112,
              "longitude": 106.645452
            },
            "duration": 10,
            "distance": 10,
            "type": 8,
            "price": 5,
            "currency": 'USD',
            "departureTime": '2015-02-01T00:00:00Z',
            "arrivalTime": '2015-02-02T00:00:00Z',
            "name": "Take taxi to the meetup"
          },
          {
            "id": 5,
            "origin": {
              "latitude": 10.797112,
              "longitude": 106.645452
            },
            "destination": {
              "latitude": 10.795721,
              "longitude": 106.648026
            },
            "duration": 10,
            "distance": 10,
            "type": 8,
            "price": 5,
            "currency": 'USD',
            "departureTime": '2015-02-01T00:00:00Z',
            "arrivalTime": '2015-02-02T00:00:00Z',
            "name": "Take taxi to airport"
          },
          {
            "id": 6,
            "origin": {
              "latitude": 10.795721,
              "longitude": 106.648026
            },
            "destination": {
              "latitude": 10.800484,
              "longitude": 106.664678
            },
            "duration": 10,
            "distance": 10,
            "type": 8,
            "price": 5,
            "currency": 'USD',
            "departureTime": '2015-02-01T00:00:00Z',
            "arrivalTime": '2015-02-02T00:00:00Z',
            "name": "Flight from airport to your destination airport"
          },
          {
            "id": 6,
            "origin": {
              "latitude": 10.800484,
              "longitude": 106.664678
            },
            "destination": {
              "latitude": 10.817304,
              "longitude": 106.672531
            },
            "duration": 10,
            "distance": 10,
            "type": 0,
            "price": 5,
            "currency": 'USD',
            "departureTime": '2015-02-01T00:00:00Z',
            "arrivalTime": '2015-02-02T00:00:00Z',
            "name": "Take a rest at your home"
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
            "id": 1,
            "origin": {
              "latitude": 10.814803,
              "longitude": 106.665592
            },
            "destination": {
              "latitude": 10.800914,
              "longitude": 106.666762
            },
            "duration": 10,
            "distance": 10,
            "type": 8,
            "price": 5,
            "currency": 'USD',
            "departureTime": '2015-01-01T00:00:00Z',
            "arrivalTime": '2015-01-02T00:00:00Z',
            "name": "Walk to bus station"
          },

          {
            "id": 2,
            "origin": {
              "latitude": 10.800914,
              "longitude": 106.666762
            },
            "destination": {
              "latitude": 10.801672,
              "longitude": 106.651012
            },
            "duration": 10,
            "distance": 10,
            "type": 8,
            "price": 5,
            "currency": 'USD',
            "departureTime": '2015-01-01T00:00:00Z',
            "arrivalTime": '2015-01-02T00:00:00Z',
            "name": "Take bus E23 to K20"
          },
          {
            "id": 3,
            "origin": {
              "latitude": 10.801672,
              "longitude": 106.651012
            },
            "destination": {
              "latitude": 10.802305,
              "longitude": 106.641142
            },
            "duration": 10,
            "distance": 10,
            "type": 0,
            "price": 5,
            "currency": 'USD',
            "departureTime": '2015-01-01T00:00:00Z',
            "arrivalTime": '2015-01-02T00:00:00Z',
            "name": "Stay one night at your destination hotel",
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
              },
            ]
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
            "id": 4,
            "origin": {
              "latitude": 10.802305,
              "longitude": 106.641142
            },
            "destination": {
              "latitude": 10.797112,
              "longitude": 106.645452
            },
            "duration": 10,
            "distance": 10,
            "type": 8,
            "price": 5,
            "currency": 'USD',
            "departureTime": '2015-02-01T00:00:00Z',
            "arrivalTime": '2015-02-02T00:00:00Z',
            "name": "Take taxi to the meetup"
          },
          {
            "id": 5,
            "origin": {
              "latitude": 10.797112,
              "longitude": 106.645452
            },
            "destination": {
              "latitude": 10.795721,
              "longitude": 106.648026
            },
            "duration": 10,
            "distance": 10,
            "type": 8,
            "price": 5,
            "currency": 'USD',
            "departureTime": '2015-02-01T00:00:00Z',
            "arrivalTime": '2015-02-02T00:00:00Z',
            "name": "Take taxi to airport"
          },
          {
            "id": 6,
            "origin": {
              "latitude": 10.795721,
              "longitude": 106.648026
            },
            "destination": {
              "latitude": 10.800484,
              "longitude": 106.664678
            },
            "duration": 10,
            "distance": 10,
            "type": 8,
            "price": 5,
            "currency": 'USD',
            "departureTime": '2015-02-01T00:00:00Z',
            "arrivalTime": '2015-02-02T00:00:00Z',
            "name": "Flight from airport to your destination airport"
          },
          {
            "id": 6,
            "origin": {
              "latitude": 10.800484,
              "longitude": 106.664678
            },
            "destination": {
              "latitude": 10.817304,
              "longitude": 106.672531
            },
            "duration": 10,
            "distance": 10,
            "type": 0,
            "price": 5,
            "currency": 'USD',
            "departureTime": '2015-02-01T00:00:00Z',
            "arrivalTime": '2015-02-02T00:00:00Z',
            "name": "Take a rest at your home"
          }
        ]
      }
    }
  ]);
})();