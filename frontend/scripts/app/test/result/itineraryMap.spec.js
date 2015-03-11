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
      $rootScope,
      controller,
      mockItinerary,
      $q,
      tripService;

  beforeEach(module('app.result'));
  beforeEach(module('app.common'));
  beforeEach(module('app-templates'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _mockItinerary_, _tripService_, _$q_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    mockItinerary = _mockItinerary_;

    $q = _$q_;
    tripService = _tripService_;

    spyOn(tripService, 'callSearchItineraryApi').and.callFake(function() {
      return $q(function(resolve) {
        resolve(mockItinerary);
      });
    });

    var searchObject = {};
    var itinerary = null;
    tripService
      .findItinerary(searchObject)
      .then(function(data) {
        itinerary = data;
      });

    scope.$digest();
    scope.itinerary = itinerary[0];
    scope.showMap = false; //show map will cause error
    scope.showList = false;

    element = angular.element('<itinerary-map itinerary="itinerary" show-map="showMap" show-list="showList"></itinerary-map>');
    compiledDirective = $compile(element)(scope);
    scope.$digest();
    directiveScope = element.isolateScope();
  }));

  it('isolated scope has valid data', function() {
    expect(directiveScope.itinerary.currency).toEqual('EUR');
    expect(directiveScope.itinerary.cost).toEqual(360);
  });

  describe('segmentAlternativeList directive', function() {
    it('has valid alternative list', function() {
      /**
       * Hotel list is not showing, it is showed after we call showAlternativesPanel() function
       */
      expect(compiledDirective.html()).not.toContain('<img class="hotels-list-item-image" ng-src="http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg" src="http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg">');
      expect(directiveScope.isShowAlternativesPanel).toEqual(false);
      //simulate click on "View alternatives"
      directiveScope.showAlternativesPanel(scope.itinerary.outbound.segments[3]);
      scope.$digest();
      expect(directiveScope.isShowAlternativesPanel).toEqual(true);
      expect(compiledDirective.html()).toContain('<img class="hotels-list-item-image" ng-src="http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg" src="http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg">');
    });
  });


  describe('tripSegments', function() {
    var tripSegmentElement, tripSegmentScope, tripSegmentIsolateScope;
    beforeEach(function() {
      tripSegmentElement = element.find('trip-segments');
      tripSegmentIsolateScope = tripSegmentElement.isolateScope();
    });

    it('tripSegments output valid html', function() {
      expect(compiledDirective.html()).toContain('Trip Details');
      expect(compiledDirective.html()).toContain('Walk to bus station');
      expect(compiledDirective.html()).toContain('Take bus E23 to K20');
      expect(compiledDirective.html()).toContain('Stay one night at your destination hotel');
    });

    it('tripSegments response correctly when change tab', function() {
      /**
       * We have 4 segments in day 1 and 1 segment in day 2
       * At first, we select tab 1, so we should have 4 segments
       * After that, we change tab with showTab() function.
       * Tab 2 only have 1 segment
       */
      expect(tripSegmentIsolateScope.activeSegments.length).toEqual(4);
      //change in tripSegmentIsolateScope.activeSegments will change in parent activeSegmentsOnMap too
      expect(directiveScope.activeSegmentsOnMap.length).toEqual(4);
      tripSegmentIsolateScope.showTab(2);
      scope.$digest();
      expect(tripSegmentIsolateScope.activeSegments.length).toEqual(1);
      expect(directiveScope.activeSegmentsOnMap.length).toEqual(1);
    });
  });

});
