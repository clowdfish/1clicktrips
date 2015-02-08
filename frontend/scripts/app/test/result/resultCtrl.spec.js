'use strict';

describe('resultCtrl', function() {
  beforeEach(module('app.result'));

  var $scope, $controller, tripService, $q, itinerary;
  beforeEach(inject(function(_$rootScope_, _$controller_, _tripService_, _$q_, mockItinerary) {
    itinerary = mockItinerary;
    $controller = _$controller_;
    tripService = _tripService_;
    $q = _$q_;
    $scope = _$rootScope_.$new();

    var deferred = $q.defer();
    deferred.resolve(itinerary);
    spyOn(tripService, 'findItinerary').andReturn(deferred.promise);
  }));

  describe('$scope.itinerary', function() {
    var controller;

    beforeEach(function(){
      controller = $controller('resultCtrl', {$scope: $scope, tripService: tripService});
    });

    it('itinerary is null when start', function() {
      expect($scope.itinerary).toEqual(null);
    });

    it('findTripByBudget', function() {
      $scope.findTripByBudget();
      expect(tripService.findItinerary).toHaveBeenCalled();
      $scope.$digest();
      expect($scope.itinerary).not.toBeNull();
    });

    it('findTripByTime', function() {
      $scope.findTripByTime();
      expect(tripService.findItinerary).toHaveBeenCalled();
      $scope.$digest();
      expect($scope.itinerary).not.toBeNull();
    });

    it('findTripByComfort', function() {
      $scope.findTripByComfort();
      expect(tripService.findItinerary).toHaveBeenCalled();
      $scope.$digest();
      expect($scope.itinerary).not.toBeNull();
    });
  });
});
