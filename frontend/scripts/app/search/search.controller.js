(function() {

  'use strict';

  angular
    .module('app.search')
    .controller('searchCtrl', searchCtrl);

  function searchCtrl($scope,
                      $rootScope,
                      $timeout,
                      $state,
                      browser,
                      searchFormData,
                      SEARCH_STEPS) {

    $rootScope.windowHeight = null;

    var favoriteOriginLocation = null;

    $scope.isMobile = browser.isMobileDevice();
    $scope.isLogin = true;
    $scope.searchDataComplete = false;

    // the message for the user why he cannot start the search
    $scope.reason = "search_form_error_incomplete";

    // trip destination
    $scope.destination = null;

    // trip origin
    $scope.origin = null;

    // active step
    $scope.step = SEARCH_STEPS.none;

    // select step functions
    $scope.stepOrigin = stepOrigin;
    $scope.stepDestination = stepDestination;
    $scope.stepAppointment = stepAppointment;

    $scope.startSearch = startSearch;

    // search data
    $scope.destinationLocation = searchFormData.destinationLocation;
    $scope.originLocation = searchFormData.originLocation;

    favoriteOriginLocation = searchFormData.originLocation ? searchFormData.originLocation : null;
    $scope.destination = searchFormData.destination;
    $scope.roundTrip = searchFormData.roundTrip;
    $scope.origin = searchFormData.origin;

    $scope.startDate = searchFormData.startDate;
    $scope.startDate.setHours(10);
    $scope.startDate.setMinutes(0);

    $scope.endDate = searchFormData.endDate;
    $scope.endDate.setHours(14);
    $scope.endDate.setMinutes(0);

    $scope.startTimeString = "10:00";
    $scope.endTimeString = "14:00";

    $scope.$on('selectFavorite', function(e, data) {
      selectFavorite(data);
    });

    /**
    * Select favorite
    */
    function selectFavorite(favorite) {
      $scope.origin = favorite.origin.description;
      favoriteOriginLocation = favorite.origin.location;
      $scope.isStepOriginReady = true;

      $scope.destination = favorite.destination.description;
      $scope.destinationLocation = favorite.destination.location;
      $scope.isStepDestinationReady = true;

      stepAppointment();
    }

    function stepOrigin() {
      $scope.step = SEARCH_STEPS.origin;

      $timeout(function() {
        if ($scope.origin && favoriteOriginLocation) {
          $scope.originLocation = favoriteOriginLocation;
        }
      }, 50);
    }

    function stepDestination() {
      $scope.step = SEARCH_STEPS.destination;
    }

    function stepAppointment() {
      $scope.step = SEARCH_STEPS.appointment;
    }

    /**
     * Set start time on startDate change.
     */
    $scope.$watch('startDate', function() {
      var startTime = $scope.startTimeString;

      $scope.startDate.setHours(parseInt(startTime.substr(0, 2)));
      $scope.startDate.setMinutes(parseInt(startTime.substr(3, 2)));
    });

    /**
     * Set end time on endDate change.
     */
    $scope.$watch('endDate', function() {
      // set end time
      var endTime = $scope.endTimeString;

      $scope.endDate.setHours(parseInt(endTime.substr(0, 2)));
      $scope.endDate.setMinutes(parseInt(endTime.substr(3, 2)));
    });

    /**
     * Watch input form data to check on completeness.
     */
    $scope.$watchGroup(['origin', 'destination', 'startDate', 'endDate'], function() {

      $scope.isStepAppointmentReady = false;
      $scope.searchDataComplete = false;

      if ($scope.origin != null && $scope.destination != null &&
        $scope.startDate != null && $scope.endDate != null) {
        // all data is given

        if ($scope.startDate < $scope.endDate) {
          // start date is before end date

          var now = new Date();
          if($scope.startDate > now && $scope.endDate > now) {
            // appointment date is in the future
            $scope.reason = "";
            $scope.isStepAppointmentReady = true;
            $scope.searchDataComplete = true;
          }
          else
            $scope.reason = "search_form_error_past";
        }
        else
          $scope.reason = "search_form_error_timing";
      }
      else
        $scope.reason = "search_form_error_incomplete";
    });

    /**
     * Send search parameter to result page
     */
    function startSearch() {

      if ($scope.origin == null || $scope.destination == null)
        return;

      if ($scope.startDate > $scope.endDate)
        $scope.searchDataComplete = false;

      var now = new Date();
      if ($scope.startDate < now || $scope.endDate < now)
        $scope.searchDataComplete = false;

      if($scope.searchDataComplete) {
        var startDate = formatDate($scope.startDate);
        var endDate = formatDate($scope.endDate);

        var requestParameters = {
          originLatitude: $scope.originLocation.latitude,
          originLongitude: $scope.originLocation.longitude,
          origin: $scope.origin,
          destinationLatitude: $scope.destinationLocation.latitude,
          destinationLongitude: $scope.destinationLocation.longitude,
          destination: $scope.destination,
          startDate: startDate,
          endDate: endDate,
          roundTrip: $scope.roundTrip
        };

        $state.go('search_result', requestParameters);
      }
    }

    function formatDate(date) {
      return moment(date).format('YYYY-MM-DDTHH:mm:ss');
    }
  }
})();
