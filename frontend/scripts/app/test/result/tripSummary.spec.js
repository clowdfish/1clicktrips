'use strict';

describe('tripSummary', function() {
  var element,
      compiledDirective,
      scope,
      $compile,
      isoScope,
      itinerary,
      tripService,
      $q;

  beforeEach(module('app.common'));
  beforeEach(module('app.index'));
  beforeEach(module('app.result'));
  beforeEach(module('app.auth'));
  beforeEach(module('app-templates'));


  beforeEach(inject(function(_$compile_, _$rootScope_, _$q_, mockItinerary, _tripService_) {
    itinerary = mockItinerary;
    scope = _$rootScope_.$new();
    $compile = _$compile_;

    $q = _$q_;
    tripService = _tripService_;

    spyOn(tripService, 'callSearchItineraryApi').and.callFake(function() {
      return $q(function(resolve) {
        resolve(itinerary);
      });
    })

    var searchObject = {};
    tripService
      .findItinerary(searchObject)
      .then(function(itinerary) {
        scope.itinerary = itinerary[0];
      });

    scope.$digest();

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
    expect(compiledDirective.html()).toContain('<div class="trip-summary-item-title">Total Travel Time</div>');
    expect(compiledDirective.html()).toContain('<div class="trip-summary-item-title">Total Cost</div>');
    expect(compiledDirective.html()).toContain('<div class="trip-summary-item-value ng-binding">€360.00</div>');
  });

});
