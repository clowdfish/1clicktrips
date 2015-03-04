(function() {
  angular
    .module('app.search')
    .value('mockEvents', [
      {
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
      },
      {
        "id": 2,
        "title": "World Event Las Vegas",
        "description": "Another bigger meetings space",
        "location": {
            "latitude": 10.801672,
            "longitude": 106.651012
        },
        "tags": [
            "test", "another tag", "cool"
        ],
        "dates": [{
            "start": "2015-02-09T02:54:51+00:0",
            "end": "2015-02-15T09:54:51+00:0"
        }],
        "open": true,
        "url": "http://whatever.com",
        "image": "http://whatever.com/image.jpg"
      },
      {
        "id": 3,
        "title": "World Event Las Vegas",
        "description": "World meeting space",
        "location": {
            "latitude": 10.802305,
            "longitude": 106.641142
        },
        "tags": [
            "test", "another tag", "cool"
        ],
        "dates": [{
            "start": "2015-02-09T02:54:51+00:0",
            "end": "2015-02-15T09:54:51+00:0"
        }],
        "open": true,
        "url": "http://whatever.com",
        "image": "http://whatever.com/image.jpg"
      }
    ])
})();
