/**
* Google SDK requires that DOM element must be visisble on browser
* Karma never insert DOM to its browser so we can't test Google Map with Jasmine at this time
*/
'use strict';

describe('itineraryMap directive', function() {
  var element,
      compiledDirective,
      scope,
      directiveScope,
      controlerScope,
      $compile,
      controller;

  beforeEach(module('app.result'));
  beforeEach(module('app.common'));
  beforeEach(module('scripts/app/templates/result/itinerary-map.html'));
  beforeEach(module('scripts/app/templates/result/trip-segments.html'));
  beforeEach(module('scripts/app/templates/result/segment-alternative-list.html'));
  beforeEach(module('scripts/app/templates/result/map.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, mockItinerary) {
    scope = _$rootScope_.$new();
    scope.itinerary = mockItinerary;
    scope.showMap = false;
    element = angular.element('<itinerary-map itinerary="itinerary" show-map="showMap"></itinerary-map>');
    compiledDirective = _$compile_(element)(scope);
    scope.$digest();
    directiveScope = element.isolateScope();
  }));

  it('has valid data in directiveScope', function() {
    expect(directiveScope.itinerary.id).toEqual(1);
    expect(directiveScope.itinerary.destination).toEqual('DoubleTree by Hilton Metropolitan, New York, USA');
    expect(directiveScope.itinerary.price).toEqual(450);
  });

});
