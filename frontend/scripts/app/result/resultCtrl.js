(function() {
  'use strict';

  angular.module('app.result')
    .controller('resultCtrl', resultCtrl);

  function resultCtrl($scope, $q, tripService, TRIP_TYPE) {
    var itineraries = null;
    $scope.itinerary = null;
    $scope.notifications = [
      {
        "message" : "test",
        "action" : null
      }];


    // non-mobile setup (uncomment to activate)
    $scope.showMap = true;
    $scope.showList = true;
    $scope.isMobile = false;

    /*
    // mobile setup (uncomment to activate)
    $scope.showMap = false;
    $scope.showList = true;
    $scope.isMobile = true;
    */

    $scope.findTrip = findTrip;
    $scope.findTripByBudget = findTripByBudget;
    $scope.findTripByTime = findTripByTime;
    $scope.findTripByComfort =  findTripByComfort;

    $scope.refineSearch = refineSearch;

    $scope.deleteNotification = deleteNotification;
    $scope.acceptNotification = acceptNotification;

    $scope.showListView = showList;
    $scope.showMapView = showMap;

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
      };

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

    /**
     * @todo implement
     */
    function refineSearch() {

      // temporary hack
      window.location = "./";
    }

    function filterItinerary(type) {
      for (var i = 0; i < $scope.itineraries.length; i++) {
        if ($scope.itineraries[i].type == type) {
          return $scope.itineraries[i];
        }
      }
      return null;
    }

    function showList() {
      $scope.showMap = false;
      $scope.showList = true;
    }

    function showMap() {
      $scope.showMap = true;
      $scope.showList = false;
    }


    // notification functionality

    /**
     * Delete the currently presented notification.
     *
     * @param {integer} item - position of notification in notification array
     */
    function deleteNotification(item) {
      item = typeof item !== 'undefined' ? item : 0;

      $scope.notifications.splice(item, 1);
    }

    /**
     * Accept the currently presented notification and execute action that is
     * defined in the the notification object.
     *
     * @param {integer} item - position of notification in notification array
     */
    function acceptNotification(item) {
      item = typeof item !== 'undefined' ? item : 0;

      // TODO execute action ...

      $scope.notifications.splice(item, 1);
    }
  }
})();