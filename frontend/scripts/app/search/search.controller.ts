/// <reference path="../../_all.ts" />
module Search {

  'use strict';

  export class SearchCtrl {
    constructor(private $scope,
                private $state,
                private searchFormData) {
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
      $scope.startSearch = this.startSearch;
  
      $scope.resetTabIndex = function() {
        $('#origin').focus();
      };
    }

    

    /**
     *
     *
     * @returns {boolean}
     */
    validateFormInput = () => {

      // check if all fields are filled
      if (this.$scope.schedule.origin == null || this.$scope.schedule.destination == null) {
        alert("All location fields must be filled.");
        return false;
      }

      if(this.$scope.startDateString == null || this.$scope.startTimeString == null) {
        alert("Date and time fields must be filled.");
        return false;
      }

      // check if date and time format is correct
      if(dateIsValid(this.$scope.startDateString) && timeIsValid(this.$scope.startTimeString)) {

        var timeString = this.$scope.startTimeString;

        if(timeString.indexOf(":") == 1)
          timeString = "0".concat(timeString);

        var dateTimeString = this.$scope.startDateString + " " + timeString;

        this.$scope.schedule.time = moment(dateTimeString, "DD.MM.YYYY HH:mm");
      }
      else {
        alert("Date or time is not valid (must be DD.MM.YYYY and HH:mm).");
        return false;
      }

      // check if date is in the future
      if (this.$scope.schedule.time.isBefore(moment(new Date()))) {
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
    startSearch = () => {

      var formValid = this.validateFormInput();

      if(formValid) {
        var startDate = this.formatDate(this.$scope.schedule.time);

        var requestParameters = {
          originLatitude: this.$scope.schedule.origin.latitude,
          originLongitude: this.$scope.schedule.origin.longitude,
          origin: this.$scope.schedule.originAddress,
          destinationLatitude: this.$scope.schedule.destination.latitude,
          destinationLongitude: this.$scope.schedule.destination.longitude,
          destination: this.$scope.schedule.destinationAddress,
          startDate: startDate,
          targetDate: this.$scope.targetDate
        };

        this.$state.go('result.list', requestParameters);
      }
      else
        console.log("Search form is not valid!");
    }

    formatDate = (date) => {
      return moment(date).format('YYYY-MM-DDTHH:mm:ss');
    }
  }
};
