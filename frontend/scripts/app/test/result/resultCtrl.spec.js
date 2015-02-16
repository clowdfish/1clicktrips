'use strict';

describe('resultCtrl', function() {
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
  }));

  it('itinerary is null when start', function() {
    expect($scope.itinerary).toEqual(null);
  });

  it('findTripByBudget', function() {
    $scope.findTrip().then(function(){
      $scope.findTripByBudget();
    });
    expect(tripService.findItinerary).toHaveBeenCalled();
    $scope.$digest();
    expect($scope.itinerary.type).toEqual(TRIP_TYPE.lowBudget);
  });

  it('findTripByTime', function() {
    $scope.findTrip().then(function(){
      $scope.findTripByTime();
    });
    expect(tripService.findItinerary).toHaveBeenCalled();
    $scope.$digest();
    expect($scope.itinerary.type).toEqual(TRIP_TYPE.timeSaving);
  });

  it('findTripByComfort', function() {
    $scope.findTrip().then(function(){
      $scope.findTripByComfort();
    });
    expect(tripService.findItinerary).toHaveBeenCalled();
    $scope.$digest();
    expect($scope.itinerary).toEqual(null);
  });

});
