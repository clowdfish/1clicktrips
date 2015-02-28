(function() {
  'use strict';

  angular.module('app.result')
    .controller('resultCtrl', resultCtrl);

  function resultCtrl($scope, $rootScope, $q, $stateParams, tripService, TRIP_TYPE, browser, appConfig) {
    $scope.appConfig = appConfig;

    findAllItineraries();

    $scope.itinerary = null;
    $scope.notifications = [
      {
        "message" : "test",
        "action" : null
      }];

    // check for device type and configure accordingly
    $scope.isMobile = browser.isMobileDevice();
    $scope.showMap = true;
    $scope.showList = $scope.isMobile ? false : true;

    $scope.findTripByBudget = findTripByBudget;
    $scope.findTripByTime = findTripByTime;
    $scope.findTripByComfort =  findTripByComfort;

    $scope.refineSearch = refineSearch;

    $scope.deleteNotification = deleteNotification;
    $scope.acceptNotification = acceptNotification;

    $scope.showListView = showList;
    $scope.showMapView = showMap;

    function findAllItineraries() {
      var searchObject = {
        origin: {
          latitude: $stateParams.originLatitude,
          longitude: $stateParams.originLongitude
        },
        appointments: [
          {
            location: {
              latitude: $stateParams.destinationLatitude,
              longitude: $stateParams.destinationLongitude
            },
            start: $stateParams.startDate,
            end: $stateParams.endDate
          }
        ],
        locale: 'en',
        roundTrip: false,
        currency: 'usd'
      };
      tripService
        .findItinerary(searchObject)
        .then(function(itineraries) {
          $scope.itineraries = itineraries;
          if ($scope.itinerary == null) {
            $scope.findTripByBudget();
          }
        });
    }

    function findTripByBudget() {
      $scope.itinerary = filterItineraryByType(TRIP_TYPE.lowBudget);
      $scope.activeTrip = 0;
    }

    function findTripByTime() {
      $scope.itinerary = filterItineraryByType(TRIP_TYPE.timeSaving);
      $scope.activeTrip = 1;
    }

    function findTripByComfort() {
      $scope.itinerary = filterItineraryByType(TRIP_TYPE.comfortTrip);
      $scope.activeTrip = 2;
    }

    /**
     * @todo implement
     */
    function refineSearch() {

      // temporary hack
      window.location = "./";
    }

    function filterItineraryByType(type) {
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
