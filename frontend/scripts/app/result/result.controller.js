(function() {
  'use strict';

  angular.module('app.result')
    .controller('resultCtrl', resultCtrl);

  function resultCtrl($scope,
                      $rootScope,
                      $q,
                      $stateParams,
                      $state,
                      $modal,
                      tripApi,
                      TRIP_TYPE,
                      browser,
                      appConfig,
                      date,
                      session,
                      AUTH_EVENTS,
                      favoriteApi,
                      searchObject) {
    $scope.appConfig = appConfig;
    $scope.showAddToFavorite = true;
    findAllItineraries();

    $scope.itinerary = null;
    $scope.notifications = [
      {
        "message" : "test",
        "action" : null
      }];

    $scope.isMobile = browser.isMobileDevice();

    $scope.showMap = true;
    $scope.showList = $scope.isMobile ? false : true;
    /**
    * Functions: find trip by budget, time and confort
    */
    $scope.findTripByBudget = findTripByBudget;
    $scope.findTripByTime = findTripByTime;
    $scope.findTripByComfort =  findTripByComfort;

    /**
    * Back to search form
    */
    $scope.refineSearch = refineSearch;

    $scope.deleteNotification = deleteNotification;
    $scope.acceptNotification = acceptNotification;

    $scope.addToFavorites = addToFavorites;

    $scope.$on('$destroy', function() {
      destroyController();
    });

    /**
    * Call this method to show map and hide list. For mobile only.
    */
    $scope.showMapFn = showMapFn;

    /**
    * Call this method to show list and hide map. For mobile only.
    */
    $scope.showListFn = showListFn;

    function findAllItineraries() {

      tripApi
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
      $state.go('refineSearch', {
        originLatitude: $stateParams.originLatitude,
        originLongitude: $stateParams.originLongitude,
        destinationLatitude: $stateParams.destinationLatitude,
        destinationLongitude: $stateParams.destinationLongitude,
        startDate: $stateParams.startDate,
        endDate: $stateParams.endDate,
        origin: $stateParams.origin,
        destination: $stateParams.destination
      });
    }

    function filterItineraryByType(type) {
      for (var i = 0; i < $scope.itineraries.length; i++) {
        if ($scope.itineraries[i].type == type) {
          return $scope.itineraries[i];
        }
      }
      return null;
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

    function addToFavorites() {
      if (session.isLogin()) {
        addFavorite();
      } else {
        //create modal instance
        var modalInstance = $modal.open({
          templateUrl: 'scripts/app/templates/auth/login-modal.html',
          controller: 'loginCtrl',
          size: 'lg'
        });

        $scope.$on(AUTH_EVENTS.loginSuccess, function() {
          //save favorite
          addFavorite();
        });
        $scope.$on(AUTH_EVENTS.signupSuccess, function() {
          //save favorite
          addFavorite();
        });
      }
    }

    /**
    * Destroy controller and listeners
    */
    function destroyController() {
      console.log('Destroy resultCtrl');
      destroyAuthenticationListener();
    }

    function destroyAuthenticationListener() {
      $scope.$on(AUTH_EVENTS.loginSuccess, null);
      $scope.$on(AUTH_EVENTS.signupSuccess, null);
    }

    function addFavorite() {
      var favorite = {
        origin: {
          description: $stateParams.origin,
          location: {
            latitude: $stateParams.originLatitude,
            longitude: $stateParams.originLongitude
          }
        },
        destination: {
          description: $stateParams.destination,
          location: {
            latitude: $stateParams.destinationLatitude,
            longitude: $stateParams.destinationLongitude
          }
        }
      };
      favoriteApi
        .addFavorite(favorite)
        .then(function() {
          $scope.showAddToFavorite = false;
          alert('Add favorite successful');
        }, function() {
          alert('Error while add result to favorite');
        });

      destroyAuthenticationListener();
    }

    function showMapFn() {
      $scope.showMap = true;
      $scope.showList = false;
    }

    function showListFn() {
      $scope.showMap = false;
      $scope.showList = true;
    }

  }
})();