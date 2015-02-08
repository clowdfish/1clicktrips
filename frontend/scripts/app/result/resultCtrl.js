(function() {
  'use strict';

  angular.module('app.result')
    .controller('resultCtrl', resultCtrl);

  function resultCtrl($scope, tripService) {
    $scope.itinerary = null;
    $scope.findTripByBudget = findTripByBudget;
    $scope.findTripByTime = findTripByTime;
    $scope.findTripByComfort =  findTripByComfort;

    $scope.findTripByBudget();

    function findTripByBudget() {
      tripService.findItinerary().then(function(itinerary) {
        $scope.itinerary = itinerary;
      });
    }

    function findTripByTime() {
      tripService.findItinerary().then(function(itinerary) {
        $scope.itinerary = itinerary;
      });
    }

    function findTripByComfort() {
      tripService.findItinerary().then(function(itinerary) {
        $scope.itinerary = itinerary;
      });
    }

  }


})();