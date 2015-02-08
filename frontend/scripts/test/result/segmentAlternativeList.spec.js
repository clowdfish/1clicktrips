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
  beforeEach(module('scripts/templates/result/segment-alternative-list.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, mockItinerary, mockHotels) {

    scope = _$rootScope_.$new();
    scope.itinerary = mockItinerary;
    scope.hotels = mockItinerary.outbound.segments[2].hotels;
    scope.segment = mockItinerary.outbound.segments[2];

    element = angular.element([
      "<segment-alternative-list",
        "select='selectAlternativeSegment'",
        "segment='segment'",
        "alternatives='alternatives'",
        "close-panel='closeAlternativePanel'>"
      ].join(' '));
    compiledDirective = _$compile_(element)(scope);
    scope.$digest();
    isoScope = element.isolateScope();

  }));

  it('isolated scope has valid data', function() {
    expect(isoScope.segment.id).toEqual(3);
    expect(isoScope.segment.name).toEqual("Stay one night at your destination hotel");
  });

  it('has valid html', function() {
    expect(compiledDirective.html()).toContain('<img class="hotels-list-item-image" ng-src="http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg" />');
  });
});
