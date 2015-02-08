'use strict';

describe('itineraryMap directive', function() {
  var element,
      compiledDirective,
      scope,
      directiveScope,
      $compile;

  beforeEach(module('app.result'));
  beforeEach(module('app.common'));
  beforeEach(module('scripts/app/templates/result/itinerary-map.html'));
  beforeEach(module('scripts/app/templates/result/trip-segments.html'));
  beforeEach(module('scripts/app/templates/result/segment-alternative-list.html'));
  beforeEach(module('scripts/app/templates/result/map.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, mockItinerary) {
    scope = _$rootScope_.$new();
    scope.itinerary = mockItinerary;
    element = angular.element('<itinerary-map itinerary="itinerary" show-map="showMap"></itinerary-map>');
    compiledDirective = _$compile_(element)(scope);
    scope.$digest();
    element.scope().$digest();
    directiveScope = element.isolateScope();

  }));

  it('has valid data in isolate scope', function() {
    expect(directiveScope.itinerary.id).toEqual(1);
    expect(directiveScope.itinerary.destination).toEqual('DoubleTree by Hilton Metropolitan, New York, USA');
    expect(directiveScope.itinerary.price).toEqual(450);

    console.log(directiveScope.activeSegments);
  });

  it('output valid html', function() {
    expect(compiledDirective.html()).toContain('Trip Details');
    expect(compiledDirective.html()).toContain('Walk to bus station');
    expect(compiledDirective.html()).toContain('Take bus E23 to K20');
    expect(compiledDirective.html()).toContain('Stay one night at your destination hotel');
  });
});
