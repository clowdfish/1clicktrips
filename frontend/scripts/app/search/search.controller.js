(function() {

  'use strict';

  angular
    .module('app.search')
    .controller('searchCtrl', searchCtrl);

  function searchCtrl($scope,
                      $state,
                      searchFormData) {

    // optimize forward or backward
    $scope.targetDate = searchFormData.targetDate;

    $scope.startDateString = searchFormData.startDate.format("DD.MM.YYYY");
    $scope.startTimeString = searchFormData.startTimeString;

    $scope.schedule = {
      title: "",
      origin: searchFormData.originLocation,
      originAddress: searchFormData.origin,
      destination: searchFormData.destinationLocation,
      destinationAddress: searchFormData.destination,
      time: searchFormData.startDate // moment object
    };

    /**
     * scope functions
     */
    $scope.startSearch = startSearch;

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
      if ($scope.schedule.origin == null || $scope.schedule.destination == null) {
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

        $scope.schedule.time = moment(dateTimeString, "DD.MM.YYYY HH:mm");
      }
      else {
        alert("Date or time is not valid (must be DD.MM.YYYY and HH:mm).");
        return false;
      }

      // check if date is in the future
      if($scope.schedule.time.isBefore(moment(new Date()))) {
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
        var startDate = formatDate($scope.schedule.time);

        var requestParameters = {
          originLatitude: $scope.schedule.origin.latitude,
          originLongitude: $scope.schedule.origin.longitude,
          origin: $scope.schedule.originAddress,
          destinationLatitude: $scope.schedule.destination.latitude,
          destinationLongitude: $scope.schedule.destination.longitude,
          destination: $scope.schedule.destinationAddress,
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
  }
})();
