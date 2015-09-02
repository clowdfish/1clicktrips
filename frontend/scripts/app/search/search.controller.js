(function() {

  'use strict';

  angular
    .module('app.search')
    .controller('searchCtrl', searchCtrl);

  function searchCtrl($scope,
                      $state,
                      searchFormData) {

    // trip origin
    $scope.origin = null;

    // trip destination
    $scope.destination = null;

    $scope.originLocation = searchFormData.originLocation;
    $scope.destinationLocation = searchFormData.destinationLocation;

    $scope.origin = searchFormData.origin;
    $scope.destination = searchFormData.destination;

    $scope.startDate = searchFormData.startDate; // moment object
    $scope.targetDate = searchFormData.targetDate;

    $scope.startDateString = searchFormData.startDate.format("DD.MM.YYYY");
    $scope.startTimeString = searchFormData.startTimeString;

    /**
     * scope functions
     */
    $scope.startSearch = startSearch;

    $scope.setOrigin = setOrigin;
    $scope.setDestination = setDestination;

    $scope.resetTabIndex = function() {
      $('#origin').focus();
    };

    /**
     *
     *
     * @returns {boolean}
     */
    function validateFormInput() {

      // check if all fields are filled
      if ($scope.origin == null || $scope.destination == null) {
        alert("All location fields must be filled.");
        return false;
      }

      if($scope.startDateString == null || $scope.startTimeString == null) {
        alert("Date and time fields must be filled.");
        return false;
      }

      // check if date and time format is correct
      if(dateIsValid($scope.startDateString) && timeIsValid($scope.startTimeString)) {

        var timeString = $scope.startTimeString;

        if(timeString.indexOf(":") == 1)
          timeString = "0".concat(timeString);

        var dateTimeString = $scope.startDateString + " " + timeString;

        $scope.startDate = moment(dateTimeString, "DD.MM.YYYY HH:mm");
      }
      else {
        alert("Date or time is not valid (must be DD.MM.YYYY and HH:mm).");
        return false;
      }

      // check if date is in the future
      if($scope.startDate.isBefore(moment(new Date()))) {
        alert("Date must be in the future.");
        return false;
      }

      return true;

      /**
       *
       *
       * @param time
       * @returns {boolean}
       */
      function timeIsValid(time) {
        return new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")
          .test(time);
      }

      /**
       *
       *
       * @param date
       * @returns {boolean}
       */
      function dateIsValid(date) {
        return new RegExp("^[0-9]{2}.[0-9]{2}.[0-9]{4}$")
          .test(date);
      }
    }
    /**
     * Send search parameter to result page
     */
    function startSearch() {

      var formValid = validateFormInput();

      if(formValid) {
        var startDate = formatDate($scope.startDate);

        var requestParameters = {
          originLatitude: $scope.originLocation.latitude,
          originLongitude: $scope.originLocation.longitude,
          origin: $scope.origin,
          destinationLatitude: $scope.destinationLocation.latitude,
          destinationLongitude: $scope.destinationLocation.longitude,
          destination: $scope.destination,
          startDate: startDate,
          targetDate: $scope.targetDate
        };

        $state.go('result.list', requestParameters);
      }
      else
        console.log("Search form is not valid!");
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
    }

    /**
     *
     *
     * @param options
     */
    function setDestination(options) {
      if (options == null || (options.description == null || options.location == null)) {
        $scope.destination = null;
        $scope.destinationLocation = null;
        return;
      }

      $scope.destination = options.description;
      $scope.destinationLocation = options.location;
    }
  }
})();
