(function() {
  'use strict';
  angular
    .module('app.result', [
      'app.mockdata',
      'ngMockE2E'
    ])
    .run(run)
    .config(config);

  /**
  * Because we don't have any server, we use $httpBackend to create fake data
  */
  function run($httpBackend, mockItinerary, mockAlternativeSegment) {

    var itinerary = mockItinerary;
    var alternatives = mockAlternativeSegment;
    $httpBackend.whenGET(/^scripts\/app\/templates\//).passThrough();
    $httpBackend.whenGET('/search/trips').respond(itinerary);
    $httpBackend.whenGET('/search/alternatives').respond(alternatives);
  }

  function config($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }
})();
