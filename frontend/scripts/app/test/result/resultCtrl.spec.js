'use strict';

describe('resultCtrl', function() {

  beforeEach(module('app.common'));
  beforeEach(module('app.index'));
  beforeEach(module('app.result'));

  var $scope,
      $controller,
      tripService,
      $q,
      itinerary,
      TRIP_TYPE;
  beforeEach(inject(function(_$rootScope_,
                            _$controller_,
                            _tripService_,
                            _$q_,
                            mockItinerary,
                            _TRIP_TYPE_) {
    itinerary = mockItinerary;
    TRIP_TYPE = _TRIP_TYPE_;
    $controller = _$controller_;
    tripService = _tripService_;
    $q = _$q_;
    $scope = _$rootScope_.$new();

    var deferred = $q.defer();
    deferred.resolve(itinerary);
    spyOn(tripService, 'findItinerary').and.returnValue(deferred.promise);
    $controller('resultCtrl', {$scope: $scope, tripService: tripService});
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

});
