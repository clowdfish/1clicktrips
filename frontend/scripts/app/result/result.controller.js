(function() {
  'use strict';

  angular.module('app.result')
    .controller('resultCtrl', resultCtrl);

  function resultCtrl($rootScope,
                      $scope,
                      $stateParams,
                      $state,
                      $modal,
                      $timeout,
                      tripApi,
                      TRIP_TYPE,
                      browser,
                      appConfig,
                      session,
                      AUTH_EVENTS,
                      favoriteApi,
                      searchObject,
                      bookingApi) {

    $rootScope.windowHeight = browser.getViewport().height + "px";

    $(window).on("resize.doResize", function () {
      $scope.$apply(function() {
        $rootScope.windowHeight = browser.getViewport().height + "px";
      });
    });

    $scope.$on("$destroy",function () {
      // remove the handler added earlier to avoid memory leaks
      $(window).off("resize.doResize");

      destroyController();
    });

    $scope.appConfig = appConfig;
    $scope.showAddToFavorite = true;
    $scope.itinerary = null;
    $scope.isMobile = browser.isMobileDevice();

    findAllItineraries();

    $scope.showSelectionPanel = true;
    /**
     * On the mobile we have three steps:
     * Selection Panel --> Segments List --> Map
     *
     * The Segments List will be hidden initially.
     */
    $scope.showList = false;

    /**
    * Functions: find trip by budget, time and confort
    */
    $scope.findTripByBudget = findTripByBudget;
    $scope.findTripByTime = findTripByTime;
    $scope.findTripByComfort = findTripByComfort;

    /**
    * Back to search form
    */
    $scope.refineSearch = refineSearch;

    $scope.toggleSelectionPanel = toggleSelectionPanel;
    $scope.toggleSegmentList = toggleSegmentList;

    $scope.addToFavorites = addToFavorites;

    /**
    * Store itinerary data and go to booking page
    */
    $scope.bookTrip = bookTrip;

    function findAllItineraries() {
      var additionData = {
        startDate: $stateParams.startDate,
        endDate: $stateParams.endDate,
        origin: $stateParams.origin,
        destination: $stateParams.destination,

      };

      tripApi
        .findItinerary(searchObject, additionData)
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

      if($scope.itineraries.length<2)
        return;

      $scope.itinerary = filterItineraryByType(TRIP_TYPE.timeSaving);
      $scope.activeTrip = 1;
    }

    function findTripByComfort() {

      if($scope.itineraries.length<3)
        return;

      $scope.itinerary = filterItineraryByType(TRIP_TYPE.comfortTrip);
      $scope.activeTrip = 2;
    }

    /**
     * Refining the search leads back to the search form with the
     * search data pre-populated.
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
        destination: $stateParams.destination,
        roundTrip: $stateParams.roundTrip
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
     $rootScope.windowHeight = "100%";
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

    function bookTrip() {
      bookingApi.setShareTripData($scope.itinerary, createSearchParameters());
      console.log($scope.itinerary);
      $state.go('booking');
    }

    /**
    * Create map view data from $state parameters
    */
    function createSearchParameters() {
      return {
        originLatitude: $stateParams.originLatitude,
        originLongitude: $stateParams.originLongitude,
        origin: $stateParams.origin,
        destinationLatitude: $stateParams.destinationLatitude,
        destinationLongitude: $stateParams.destinationLongitude,
        destination: $stateParams.destination,
        startDate: $stateParams.startDate,
        endDate: $stateParams.endDate,
        roundTrip: $stateParams.roundTrip
      };
    }

    /**
     * Show/Hide the selection panel.
     */
    function toggleSelectionPanel() {
      $scope.showSelectionPanel = !$scope.showSelectionPanel;
      $timeout(function() {
        $scope.$broadcast('redrawMap');
      }, 1000);
    }

    function toggleSegmentList() {
      $scope.showList = !$scope.showList;
    }
  }
})();
