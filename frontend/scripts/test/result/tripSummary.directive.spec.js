'use strict';

describe('tripSummary', function() {
  var element,
      compiledDirective,
      scope,
      $compile,
      isoScope,
      itinerary,
      tripApi,
      $q,
      $httpBackend;

  beforeEach(function() {
    module('app.common');
    module('app.index');
    module('app.result');
    module('app.auth');
    module('app.templates');
    module('mockdata');
  });


  beforeEach(inject(function(_$compile_,
                              _$rootScope_,
                              _$q_,
                              mockItinerary,
                              _tripApi_,
                              _$httpBackend_) {
    itinerary = mockItinerary;
    $httpBackend = _$httpBackend_;
    scope = _$rootScope_.$new();
    $compile = _$compile_;

    $q = _$q_;
    tripApi = _tripApi_;

    $httpBackend.whenPOST(/\/api\/search\/trips/).respond(mockItinerary);

    var searchObject = {};
    var additionData = {
      startDate: new Date(),
      endDate: new Date(),
      origin: 'Ha Noi',
      destination: 'Ho Chi Minh'
    }

    tripApi
      .findItinerary(searchObject, additionData)
      .then(function(itinerary) {
        scope.itinerary = itinerary[0];
      });

    scope.$digest();
    $httpBackend.flush();
    element = angular.element('<trip-summary itinerary="itinerary"></trip-summary>');
    compiledDirective = _$compile_(element)(scope);
    scope.$digest();
    isoScope = element.isolateScope();
  }));

  it('isolated scope has valid data', function() {
    expect(isoScope.itinerary.currency).toEqual('EUR');
    expect(isoScope.itinerary.cost).toEqual(360);
  });

  it('has valid html', function() {
    expect(compiledDirective.html()).toContain('Total Travel Time');
    expect(compiledDirective.html()).toContain('4 hrs 10 mins');
  });

});
