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
  }));
});
