(function() {
  'use strict';
  angular
    .module('app.result', [
      'app.mockdata',
      'ngMockE2E'
    ])
    .run(run)
    .config(config)
    .constant('TRIP_TYPE', {
      lowBudget: 0,
      timeSaving: 1,
      comfortTrip: 2
    });

  /**
  * Because we don't have any server, we use $httpBackend to create fake data
  */
  function run($httpBackend, mockItinerary, mockAlternativeSegment) {

    var itinerary = mockItinerary;
    var alternatives = mockAlternativeSegment;
    $httpBackend.whenGET(/^scripts\/app\/templates\//).passThrough();
    $httpBackend.whenPOST('/api/search/trips').passThrough();
    $httpBackend.whenGET('/api/search/alternatives').passThrough();
  }

  function config($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }
})();
