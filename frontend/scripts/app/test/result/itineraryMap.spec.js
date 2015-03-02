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
  beforeEach(module('scripts/app/templates/result/itinerary-map.html'));
  beforeEach(module('scripts/app/templates/result/trip-segments.html'));
  beforeEach(module('scripts/app/templates/result/segment-alternative-list.html'));
  beforeEach(module('scripts/app/templates/result/map.html'));

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
    })

    var searchObject = {};
    var itinerary = null;
    tripService
      .findItinerary(searchObject)
      .then(function(data) {
        itinerary = data;
      });
    scope.showMap = false; //show map will cause error
    scope.showList = false;
    scope.$digest();
    scope.itinerary = itinerary[0];
    element = angular.element('<itinerary-map itinerary="itinerary" show-map="showMap" show-list="showList"></itinerary-map>');
    compiledDirective = $compile(element)(scope);
    scope.$digest();
    directiveScope = element.isolateScope();
  }));

  it('isolated scope has valid data', function() {
    expect(directiveScope.itinerary.currency).toEqual('EUR');
    expect(directiveScope.itinerary.destination).toEqual('Customer in Hanover');
    expect(directiveScope.itinerary.price).toEqual(355.88915290549545);
  });

  describe('segmentAlternativeList directive', function() {
    it('has valid alternative list', function() {
      //when not click on "View alternatives"
      expect(compiledDirective.html()).not.toContain('<img class="hotels-list-item-image" ng-src="http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg" src="http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg">');
      expect(directiveScope.isShowAlternativesPanel).toEqual(false);
      //simulate click on "View alternatives"
      directiveScope.showAlternativesPanel(scope.itinerary.outbound.segments[2]);
      scope.$digest();
      expect(directiveScope.isShowAlternativesPanel).toEqual(true);
      expect(compiledDirective.html()).toContain('<img class="hotels-list-item-image" ng-src="http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg" src="http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg">');
    });
  });


  describe('tripSegments', function() {
    var tripSegmentElement, tripSegmentScope, tripSegmentIsolateScope;
    beforeEach(function() {
      tripSegmentElement = element.find('trip-segments');
      scope.$digest();
      tripSegmentIsolateScope = tripSegmentElement.isolateScope();
    });

    it('tripSegments as valid isolate scope data', function() {
      expect(tripSegmentIsolateScope.activeSegments.length).toEqual(3);
      expect(tripSegmentIsolateScope.activeSegmentNumber).toEqual(1);
      expect(tripSegmentIsolateScope.segments['1'].length).toEqual(3);
      expect(tripSegmentIsolateScope.segments['2'].length).toEqual(4);
    });

    it('tripSegments output valid html', function() {
      expect(compiledDirective.html()).toContain('Trip Details');
      expect(compiledDirective.html()).toContain('Walk to bus station');
      expect(compiledDirective.html()).toContain('Take bus E23 to K20');
      expect(compiledDirective.html()).toContain('Stay one night at your destination hotel');
    });

    it('tripSegments response correctly when change tab', function() {
      expect(tripSegmentIsolateScope.activeSegments.length).toEqual(3);
      //change in tripSegmentIsolateScope.activeSegments will change in parent activeSegmentsOnMap too
      expect(directiveScope.activeSegmentsOnMap.length).toEqual(3);
      tripSegmentIsolateScope.showTab(2);
      scope.$digest();
      expect(tripSegmentIsolateScope.activeSegments.length).toEqual(4);
      expect(directiveScope.activeSegmentsOnMap.length).toEqual(4);
    });
  });

});
