'use strict';

describe('tripSummary', function() {
  var element,
      compiledDirective,
      scope,
      $compile,
      isoScope,
      itinerary;

  beforeEach(module('app.common'));
  beforeEach(module('app.result'));
  beforeEach(module('scripts/app/templates/result/trip-summary.html'));


  beforeEach(inject(function(_$compile_, _$rootScope_, mockItinerary) {
    itinerary = mockItinerary;
    scope = _$rootScope_.$new();
    scope.itinerary = itinerary[0];
    $compile = _$compile_;

    element = angular.element('<trip-summary itinerary="itinerary"></trip-summary>');
    compiledDirective = _$compile_(element)(scope);
    scope.$digest();
    isoScope = element.isolateScope();

  }));

  it('isolated scope has valid data', function() {
    expect(isoScope.itinerary.currency).toEqual('EUR');
    expect(isoScope.itinerary.destination).toEqual('Customer in Hanover');
    expect(isoScope.itinerary.price).toEqual(355.88915290549545);
  });

  it('has valid html', function() {
    expect(compiledDirective.html()).toContain('<div class="trip-summary-item-title">Total Travel Time</div>');
    expect(compiledDirective.html()).toContain('<div class="trip-summary-item-title">Total Cost</div>');
    expect(compiledDirective.html()).toContain('<div class="trip-summary-item-value ng-binding">75</div>');
  });

});
