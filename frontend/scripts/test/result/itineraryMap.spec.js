/**
* Google SDK requires that DOM element must be visisble on browser
* Karma never insert DOM to its browser so we can't test Google Map with Jasmine at this time
*/
'use strict';

describe('itineraryMap directive', function() {
  var element,
      compiledDirective,
      scope,
      isolateScope,
      $compile;

  beforeEach(module('app.result'));
  beforeEach(module('app.common'));
  beforeEach(module('scripts/templates/result/itinerary-map.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, mockItinerary) {
    scope = _$rootScope_.$new();
    scope.itinerary = mockItinerary;
    angular.element('body').append('  Low Budget Trip');
    document.write('aaa');
    // element = angular.element('<itinerary-map itinerary="itinerary"></itinerary-map>');
    // compiledDirective = _$compile_(element)(scope);
    // scope.$digest();
    // isolateScope = element.isolateScope();
  }));

  // it('isolate scope has valid data', function() {
  //   expect(isolateScope.itinerary.id).toEqual(1);
  //   expect(isolateScope.itinerary.destination).toEqual('DoubleTree by Hilton Metropolitan, New York, USA');
  //   expect(isolateScope.itinerary.price).toEqual(450);
  // });
});
