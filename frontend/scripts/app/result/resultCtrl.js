(function() {
  'use strict';

  angular.module('app.result')
    .controller('resultCtrl', resultCtrl);

  function resultCtrl($scope, $q, tripService, TRIP_TYPE) {
    var itineraries = null;
    $scope.itinerary = null;
    $scope.showMap = true;

    $scope.findTrip = findTrip;
    $scope.findTripByBudget = findTripByBudget;
    $scope.findTripByTime = findTripByTime;
    $scope.findTripByComfort =  findTripByComfort;

    $scope.findTrip().then(function(){
      $scope.findTripByBudget();
    });


    function findTrip() {
      var deferred = $q.defer();
      var searchObject = {
        origin: {
          latitude: 1,
          longitude: 1
        },
        appointments: [
          {
            location: {
              latitude: 1,
              longitude: 1
            },
            start: '2015-12-31T00:00:00',
            end: '2015-12-31T00:00:00'
          }
        ],
        locale: 1,
        roundTrip: false,
        currency: 1
      }
      tripService.findItinerary(searchObject).then(function(itineraries) {
        $scope.itineraries = itineraries;
        deferred.resolve();
      });
      return deferred.promise;
    }

    function findTripByBudget() {
      $scope.itinerary = filterItinerary(TRIP_TYPE.lowBudget);
    }

    function findTripByTime() {
      $scope.itinerary = filterItinerary(TRIP_TYPE.timeSaving);
    }

    function findTripByComfort() {
      $scope.itinerary = filterItinerary(TRIP_TYPE.comfortTrip);
    }

    function filterItinerary(type) {
      for (var i = 0; i < $scope.itineraries.length; i++) {
        if ($scope.itineraries[i].type == type) {
          return $scope.itineraries[i];
        }
      }
      return null;
    }

  }


})();