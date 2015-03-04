'use strict';

describe('resultCtrl', function() {

  beforeEach(module('app.common'));
  beforeEach(module('app.index'));
  beforeEach(module('app.result'));
  beforeEach(module('scripts/app/templates/result/result.html'));
  var $scope,
      $controller,
      tripService,
      $q,
      itinerary,
      TRIP_TYPE,
      $state,
      $stateParams;
  beforeEach(inject(function(_$rootScope_,
                            _$controller_,
                            _tripService_,
                            _$q_,
                            mockItinerary,
                            _TRIP_TYPE_,
                            _browser_,
                            _$state_,
                            _$stateParams_) {
    itinerary = mockItinerary;
    TRIP_TYPE = _TRIP_TYPE_;
    $controller = _$controller_;
    tripService = _tripService_;
    $q = _$q_;
    $scope = _$rootScope_.$new();
    $state = _$state_;
    $stateParams = _$stateParams_;
    var deferred = $q.defer();
    deferred.resolve(itinerary);
    spyOn(tripService, 'findItinerary').and.returnValue(deferred.promise);
    $controller('resultCtrl', {
      $scope: $scope,
      tripService: tripService,
      browser: _browser_
    });
    $scope.$digest();
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
