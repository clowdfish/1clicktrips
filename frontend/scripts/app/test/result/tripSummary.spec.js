'use strict';

describe('tripSummary', function() {
  var element,
      compiledDirective,
      scope,
      $compile,
      isoScope,
      itinerary,
      tripService,
      $q,
      $httpBackend;

  beforeEach(module('app.common'));
  beforeEach(module('app.index'));
  beforeEach(module('app.result'));
  beforeEach(module('app.auth'));
  beforeEach(module('app.templates'));


  beforeEach(inject(function(_$compile_,
                              _$rootScope_,
                              _$q_,
                              mockItinerary,
                              _tripService_,
                              _$httpBackend_) {
    itinerary = mockItinerary;
    $httpBackend = _$httpBackend_;
    scope = _$rootScope_.$new();
    $compile = _$compile_;

    $q = _$q_;
    tripService = _tripService_;

    $httpBackend.whenPOST(/\/api\/search\/trips/).respond(mockItinerary);

    var searchObject = {};
    tripService
      .findItinerary(searchObject)
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
    expect(compiledDirective.html()).toContain('Total Cost');
    expect(compiledDirective.html()).toContain('360');
  });

});
