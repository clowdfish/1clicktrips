(function() {

  'use strict';

  angular
    .module('app.search')
    .controller('searchCtrl', searchCtrl);

  function searchCtrl($scope,
                      $rootScope,
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
    $scope.endDate = searchFormData.endDate;

    $scope.startTimeString = searchFormData.startTimeString;
    $scope.endTimeString = searchFormData.endTimeString;

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
    };

    function updateTime(dateObject, timeString) {

      if(new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
          .test(timeString)) {

        if(timeString.indexOf(":") === 1)
          timeString = "0".concat(timeString);

        dateObject.setHours(parseInt(timeString.substr(0, 2)));
        dateObject.setMinutes(parseInt(timeString.substr(3, 2)));

        validateFormInput();
      }
    }

    function validateFormInput() {
      $scope.isStepAppointmentReady = false;
      $scope.searchDataComplete = false;
      $scope.reason = "";

      if ($scope.origin == null || $scope.destination == null ||
        $scope.startDate == null || $scope.endDate == null) {
        $scope.reason = "search_form_error_incomplete";
        return false;
      }

      if ($scope.startDate > $scope.endDate) {
        $scope.reason = "search_form_error_timing";
        return false;
      }

      var now = new Date();
      if($scope.startDate < now || $scope.endDate < now) {
        $scope.reason = "search_form_error_past";
        return false;
      }

      // appointment date is in the future
      $scope.isStepAppointmentReady = true;
      $scope.searchDataComplete = true;
      return true;
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


    /**
     * Functions to set the content of the search form.
     */

    function setOrigin(options) {
      if (options == null || (options.description == null || options.location == null)) {
        $scope.origin = null;
        $scope.originLocation = null;
        $scope.isStepOriginReady = false;
        return;
      }

      $scope.origin = options.description;
      $scope.originLocation = options.location;
      $scope.isStepOriginReady = true;

      validateFormInput();
    }

    function setDestination(options) {
      if (options == null || (options.description == null || options.location == null)) {
        $scope.destination = null;
        $scope.destinationLocation = null;
        $scope.isStepDestinationReady = false;
        return;
      }

      $scope.destination = options.description;
      $scope.destinationLocation = options.location;
      $scope.isStepDestinationReady = true;

      validateFormInput();
    }

    function setStartDate(options) {
      if (options == null) {
        $scope.startDate = null;
        $scope.isStepAppointmentReady = false;
        return;
      }

      $scope.startDate = options.startDate;
      $scope.startTimeString = options.startTime;

      updateTime($scope.startDate, $scope.startTimeString);
    }

    function setEndDate(options) {
      if (options == null) {
        $scope.endDate = null;
        $scope.isStepAppointmentReady = false;
        return;
      }

      $scope.endDate = options.endDate;
      $scope.endTimeString = options.endTime;

      updateTime($scope.endDate, $scope.endTimeString);
    }

  }
})();
