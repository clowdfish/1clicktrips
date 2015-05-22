'use strict';

describe('resultCtrl', function() {

  beforeEach(function() {
    module('app.common');
    module('app.index');
    module('app.result');
    module('app.auth');
    module('app.dashboard');
    module('app.templates');
    module('mockdata');
  });

  var $scope,
      $controller,
      tripApi,
      $q,
      itinerary,
      TRIP_TYPE,
      $state,
      $stateParams,
      $httpBackend;
  beforeEach(inject(function(_$rootScope_,
                            _$controller_,
                            _tripApi_,
                            _$q_,
                            mockItinerary,
                            _TRIP_TYPE_,
                            _browser_,
                            _$state_,
                            _$stateParams_,
                            _$httpBackend_,
                            _favoriteApi_,
                            _bookingApi_) {
    itinerary = mockItinerary;
    TRIP_TYPE = _TRIP_TYPE_;
    $controller = _$controller_;
    tripApi = _tripApi_;
    $q = _$q_;
    $scope = _$rootScope_.$new();
    $state = _$state_;
    $stateParams = _$stateParams_;
    $httpBackend = _$httpBackend_;
    $controller('resultCtrl', {
      $scope: $scope,
      tripApi: tripApi,
      browser: _browser_,
      favoriteApi: _favoriteApi_,
      searchObject: {},
      bookingApi: _bookingApi_
    });

    $httpBackend.whenPOST(/\/api\/search\/trips/).respond(mockItinerary);

    $scope.$digest();
    $httpBackend.flush();
  }));


  it('findTripByBudget', function() {
    $scope.findTripByBudget();
    $scope.$digest();
    expect($scope.activeTrip).toEqual(0);
    expect($scope.itinerary.type).toEqual(TRIP_TYPE.lowBudget);
  });

  it('findTripByTime', function() {
    $scope.findTripByTime();
    $scope.$digest();
    expect($scope.activeTrip).toEqual(1);
    expect($scope.itinerary.type).toEqual(TRIP_TYPE.timeSaving);
  });

  it('findTripByComfort', function() {
    /**
     * Our mockup doesn't have data for comfort trip type
     */
    $scope.findTripByComfort();
    $scope.$digest();
    expect($scope.activeTrip).toEqual(2);
    expect($scope.itinerary).toEqual(null);
  });

  it('router change route correctly', function() {
    $state.go('search_result', {
      originLatitude: 1,
      originLongitude: 2,
      destinationLatitude: 3,
      destinationLongitude: 4,
      startDate: 5,
      endDate: 6
    });
    $scope.$digest();

    expect(parseInt($stateParams.originLatitude)).toEqual(1);
    expect(parseInt($stateParams.originLongitude)).toEqual(2);
    expect(parseInt($stateParams.destinationLatitude)).toEqual(3);
    expect(parseInt($stateParams.destinationLongitude)).toEqual(4);
    expect(parseInt($stateParams.startDate)).toEqual(5);
    expect(parseInt($stateParams.endDate)).toEqual(6);
  });



});
