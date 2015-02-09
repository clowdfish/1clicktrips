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
      mockItinerary;

  beforeEach(module('app.result'));
  beforeEach(module('app.common'));
  beforeEach(module('scripts/app/templates/result/itinerary-map.html'));
  beforeEach(module('scripts/app/templates/result/trip-segments.html'));
  beforeEach(module('scripts/app/templates/result/segment-alternative-list.html'));
  beforeEach(module('scripts/app/templates/result/map.html'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _mockItinerary_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    mockItinerary = _mockItinerary_;
    scope.itinerary = mockItinerary;
    scope.showMap = false; //show map will cause error
    element = angular.element('<itinerary-map itinerary="itinerary" show-map="showMap"></itinerary-map>');
    compiledDirective = _$compile_(element)(scope);
    scope.$digest();
    directiveScope = element.isolateScope();

  }));

  //Scope has valid data
  it('has valid data in directiveScope', function() {
    expect(directiveScope.itinerary.id).toEqual(1);
    expect(directiveScope.itinerary.destination).toEqual('DoubleTree by Hilton Metropolitan, New York, USA');
    expect(directiveScope.itinerary.price).toEqual(450);
  });

  //alternative list should have valid data
  describe('segmentAlternativeList directive', function() {
    it('has valid alternative list', function() {
      //when not click on "View alternatives"
      expect(compiledDirective.html()).not.toContain('<img class="hotels-list-item-image" ng-src="http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg" src="http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg">');

      //simulate click on "View alternatives"
      directiveScope.showAlternativesPanel(scope.itinerary.outbound.segments[2]);
      scope.$digest();
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

    it('tripSegments as valid initial data', function() {
      expect(tripSegmentIsolateScope.activeSegments.length).toEqual(3);
      expect(tripSegmentIsolateScope.activeSegmentNumber).toEqual(1);
      expect(tripSegmentIsolateScope.segments['1'].length).toEqual(3);
      expect(tripSegmentIsolateScope.segments['2'].length).toEqual(4);
    });

    it('change segments when click on tab', function() {
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
