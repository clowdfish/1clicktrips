'use strict';

describe('itinerarySummary', function() {
  var element,
      compiledDirective,
      scope,
      $compile,
      isoScope,
      itinerary;

  beforeEach(module('app.common'));
  beforeEach(module('app.result'));
  beforeEach(module('js/templates/result/itinerary-summary.html'));


  beforeEach(inject(function(_$compile_, _$rootScope_, mockItinerary) {
    itinerary = mockItinerary;
    scope = _$rootScope_.$new();
    scope.itinerary = itinerary;
    $compile = _$compile_;

    element = angular.element('<itinerary-summary itinerary="itinerary"></itinerary-summary>');
    compiledDirective = _$compile_(element)(scope);
    scope.$digest();
    isoScope = element.isolateScope();

  }));

  it('isolated scope has valid data', function() {
    expect(isoScope.itinerary.id).toEqual(1);
    expect(isoScope.itinerary.destination).toEqual('DoubleTree by Hilton Metropolitan, New York, USA');
    expect(isoScope.itinerary.price).toEqual(450);
  });

  it('has valid html', function() {
    expect(compiledDirective.html()).toContain('<div class="trip-summary-item-title">Total Travel Time</div>');
    expect(compiledDirective.html()).toContain('<div class="trip-summary-item-title">Total Cost</div>');
    expect(compiledDirective.html()).toContain('<div class="trip-summary-item-value ng-binding">450</div>');
  });

});