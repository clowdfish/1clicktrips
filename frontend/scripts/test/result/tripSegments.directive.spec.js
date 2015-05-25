'use strict';

describe('directive: tripSegments', function() {
  var $q,
      $httpBackend,
      $scope,
      tripApi,
      mockItinerary,
      itinerary,
      directive,
      directiveScope;

  beforeEach(function() {
    module('app.result');
    module('app.common');
    module('app.index');
    module('app.auth');
    module('app.templates');
    module('mockdata');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$q_,
                            _$httpBackend_,
                            _$compile_,
                            _tripApi_,
                            _mockItinerary_) {
    $scope = _$rootScope_.$new();
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    tripApi = _tripApi_;
    mockItinerary = _mockItinerary_;

    $httpBackend.whenPOST(/\/api\/search\/trips/).respond(mockItinerary);
    var additionData = {
      startDate: new Date(),
      endDate: new Date(),
      origin: 'Ha Noi',
      destination: 'Ho Chi Minh'
    };
    var returnValue;
    tripApi
      .findItinerary({}, additionData)
      .then(function(data) {
        returnValue = data;
      });
    $scope.$digest();
    $httpBackend.flush();
    itinerary = returnValue[0]; // get the first itinerary

    //prepare data
    $scope.itinerary = itinerary;

    var html = [
      '<trip-result-wrapper',
        'itinerary="itinerary"',
        'show-alternative-vehicles-panel="showAlternativeVehiclesPanel"',
        'show-alternative-hotels-panel="showAlternativeHotelsPanel"',
        'alternative-vehicles="alternativeVehicles"',
        'alternative-hotels="alternativeHotels"',
        'alternative-left="alternativeLeft"',
        'alternative-top="alternativeTop" >',
        '<div class="trip-segments-container" ng-show="showList">',
          '<trip-segments',
            'itinerary="itinerary"',
            'active-segments="activeSegments"',
            'selected-segment="selectedSegment"',
            'active-segments-number="activeSegmentsNumber">',
          '</trip-segments>',
        '</div>',
      '</trip-result-wrapper>'
    ].join(' ');
    var element = angular.element(html);
    directive = _$compile_(element)($scope);
    $scope.$digest();
    directiveScope = element.isolateScope();
  }));

  it('', function() {

  });
});
