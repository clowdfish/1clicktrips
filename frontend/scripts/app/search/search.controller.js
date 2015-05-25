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

    /**
    * VARIABLES
    */
    $rootScope.windowHeight = null;
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
    $scope.isMobile = browser.isMobileDevice();

    $scope.originLocation = searchFormData.originLocation;
    $scope.destinationLocation = searchFormData.destinationLocation;

    $scope.origin = searchFormData.origin;
    $scope.destination = searchFormData.destination;
    $scope.roundTrip = searchFormData.roundTrip;

    $scope.startDate = searchFormData.startDate;
    $scope.startDate.setHours(10);
    $scope.startDate.setMinutes(0);

    $scope.endDate = searchFormData.endDate;
    $scope.endDate.setHours(14);
    $scope.endDate.setMinutes(0);

    $scope.startTimeString = "10:00";
    $scope.endTimeString = "14:00";

    $scope.isStepOriginReady = false;
    $scope.isStepDestinationReady = false;
    $scope.isStepAppointmentReady = false;

    /**
    * SCOPE FUNCTIONS
    */
    $scope.stepOrigin = stepOrigin;
    $scope.stepDestination = stepDestination;
    $scope.stepAppointment = stepAppointment;

    $scope.startSearch = startSearch;

    $scope.$on('selectFavorite', function(e, data) {
      selectFavorite(data);
    });

    $scope.setOrigin = setOrigin;
    $scope.setDestination = setDestination;
    $scope.setStartDate = setStartDate;
    $scope.setEndDate = setEndDate;
    /**
    * Select favorite
    */
    function selectFavorite(favorite) {
      $scope.origin = favorite.origin.description;
      $scope.originLocation = favorite.origin.location;
      $scope.isStepOriginReady = true;

      $scope.destination = favorite.destination.description;
      $scope.destinationLocation = favorite.destination.location;
      $scope.isStepDestinationReady = true;

      stepAppointment();
    }

    function stepOrigin() {
      $scope.step = SEARCH_STEPS.origin;
    }

    function stepDestination() {
      $scope.step = SEARCH_STEPS.destination;
    }

    function stepAppointment() {
      $scope.step = SEARCH_STEPS.appointment;
    }

    $scope.resetTabIndex = function() {
      $('#origin').focus();
    }

    $scope.$watch('startDate', function() {
      $scope.updateTimeForStartDate();
    });

    $scope.$watch('endDate', function() {
      $scope.updateTimeForEndDate();
    })

    $scope.updateTimeForEndDate = function() {
      var endTime = $scope.endTimeString;
      $scope.endDate.setHours(parseInt(endTime.substr(0, 2)));
      $scope.endDate.setMinutes(parseInt(endTime.substr(3, 2)));
      validateFormInput();
    }

    $scope.updateTimeForStartDate = function() {
      var startTime = $scope.startTimeString;
      $scope.startDate.setHours(parseInt(startTime.substr(0, 2)));
      $scope.startDate.setMinutes(parseInt(startTime.substr(3, 2)));
      validateFormInput();
    }

    /**
     * Watch input form data to check on completeness.
     */
    $scope.$watchGroup(['origin', 'destination', 'startDate', 'endDate'], function() {
      validateFormInput();
    });

    function validateFormInput() {
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
            return true;
          }
          else {
            $scope.reason = "search_form_error_past";
          }
        }
        else {
          $scope.reason = "search_form_error_timing";
        }
      }
      else {
        $scope.reason = "search_form_error_incomplete";
      }

      return false;
    }
    /**
     * Send search parameter to result page
     */
    function startSearch() {

      var formValid = validateFormInput();

      if(formValid) {
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

    function setOrigin(options) {
      if (options === null) {
        $scope.origin = null;
        $scope.originLocation = null;
        $scope.isStepOriginReady = false;
        return;
      }
      $scope.origin = options.description;
      $scope.originLocation = options.location;
      $scope.isStepOriginReady = true;
    }

    function setDestination(options) {
      if (options === null) {
        $scope.destination = null;
        $scope.destinationLocation = null;
        $scope.isStepDestinationReady = false;
        return;
      }
      $scope.destination = options.description;
      $scope.destinationLocation = options.location;
      $scope.isStepDestinationReady = true;
    }

    function setStartDate(options) {
      if (options === null) {
        $scope.startDate = null;
        $scope.isStepAppointmentReady = false;
        return;
      }
      $scope.startDate = options.startDate;
      $scope.startDate.setHours(parseInt(options.startTime.substr(0, 2)));
      $scope.startDate.setMinutes(parseInt(options.startTime.substr(3, 2)));
      $scope.isStepAppointmentReady = true;
    }

    function setEndDate(options) {
      if (options === null) {
        $scope.endDate = null;
        $scope.isStepAppointmentReady = false;
        return;
      }
      $scope.endDate = options.endDate;
      $scope.endDate.setHours(parseInt(options.endTime.substr(0, 2)));
      $scope.endDate.setMinutes(parseInt(options.endTime.substr(3, 2)));
      $scope.isStepAppointmentReady = true;
    }

  }

})();
