(function() {
  'use strict';

  angular
    .module('app.mockdata')
    .value('mockAlternativeSegment', [
      {
        id: 5,
        origin: {
          latitude: 10.801672,
          longitude: 106.651012
        },
        destination: {
          latitude: 10.802305,
          longitude: 106.641142
        },
        duration: 10,
        distance: 10,
        type: 8,
        price: 5,
        currency: 'USD',
        departureTime: '2015-02-01T00:00:00Z',
        arrivalTime: '2015-02-02T00:00:00Z',
        name: 'Alternative segments'
      },{
        id: 5,
        origin: {
          latitude: 10.801672,
          longitude: 106.651012
        },
        destination: {
          latitude: 10.802305,
          longitude: 106.641142
        },
        duration: 10,
        distance: 10,
        type: 8,
        price: 5,
        currency: 'USD',
        departureTime: '2015-02-01T00:00:00Z',
        arrivalTime: '2015-02-02T00:00:00Z',
        name: 'Other segments segments'
      },
      {
        id: 5,
        origin: {
          latitude: 10.801672,
          longitude: 106.651012
        },
        destination: {
          latitude: 10.802305,
          longitude: 106.641142
        },
        duration: 10,
        distance: 10,
        type: 8,
        price: 5,
        currency: 'USD',
        departureTime: '2015-02-01T00:00:00Z',
        arrivalTime: '2015-02-02T00:00:00Z',
        name: 'Special segments'
      }
    ]);
})();