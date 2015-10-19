/// <reference path="../../_all.ts" />

module Search {

  'use strict';

  export class SearchCtrl {

    constructor(public $scope,
                public $state,
                public searchFormData,
                public suggestionAdapter: SuggestionAdapter,
                public googleMap: Common.GoogleMap,
                public $q) {

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

      $scope.getAddressSuggestion = this.getAddressSuggestion;
      $scope.selectOriginSuggestion = this.selectOriginSuggestion;
      $scope.selectDestinationSuggestion = this.selectDestinationSuggestion;

      /**
      * Date time picker open status
      */
      $scope.isOpenStartDatePicker = false;
      $scope.isOpenStartTimePicker = false;

      // configure date picker
      $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 0
      };

      //$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = 'dd-MM-yyyy';

      $scope.now = new Date();
      $scope.toggleStartDatePicker = this.toggleStartDatePicker;
      $scope.toggleStartTimePicker = this.toggleStartTimePicker;
      $scope.startDate = searchFormData.startDate.toDate();

      $scope.$watch('startDate', () => {
        console.log($scope.startDate);
      })
    }

    toggleStartDatePicker = () => {
      if (this.$scope.isOpenStartDatePicker) {
        this.$scope.isOpenStartDatePicker = false;
      } else {
        this.$scope.isOpenStartDatePicker = true;
        this.$scope.isOpenStartTimePicker = false;
      }
      this.$scope.isOpenStartDatePicker = true;
    }

    toggleStartTimePicker = () => {
      if (this.$scope.isOpenStartTimePicker) {
        this.$scope.isOpenStartTimePicker = false;
        this.$scope.isOpenStartDatePicker = false;
      } else {
        this.$scope.isOpenStartTimePicker = true;
      }
    }

    /**
     *
     *
     * @returns {boolean}
     */
    public validateFormInput = () => {

      // check if all fields are filled
      if (this.$scope.schedule.origin == null || this.$scope.schedule.destination == null) {
        alert("All location fields must be filled.");
        return false;
      }

      if(this.$scope.startDate == null) {
        alert("Date and time fields must be filled.");
        return false;
      }

      // check if date and time format is correct
      var startDate = moment(this.$scope.startDate);
      if (!startDate.isValid()) {
        alert("Date or time is not valid (must be DD.MM.YYYY and HH:mm).");
        return false;
      }

      // check if date is in the future
      if (startDate.isBefore(moment(new Date()))) {
        alert("Date must be in the future.");
        return false;
      }

      return true;
    };

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
    };

    /**
     *
     */
    formatDate = (date) => {
      return moment(date).format('YYYY-MM-DDTHH:mm:ss');
    };

    /**
      * Get suggestion for address
      * @param {string} val - input
      * @return {promise} - return a promise for typeahead
    */
    getAddressSuggestion = (val) => {
      return this.suggestionAdapter.getAddressSuggestion(val);
    };

    selectOriginSuggestion = ($item) => {
      return this.selectSuggestion($item)
        .then((location) => {
          this.$scope.schedule.origin = location;
        }, () => {
          this.$scope.schedule.origin = null;
          this.$scope.schedule.originAddress = null;
        });
    };

    selectDestinationSuggestion = ($item) => {
      return this.selectSuggestion($item)
        .then((location) => {
          this.$scope.schedule.destination = location;
        }, () => {
          this.$scope.schedule.destination = null;
          this.$scope.schedule.destinationAddress = null;
        });
    }

    /**
     * Select suggestion and display on map.
     *
     * @param {object|string} $item - Suggestion object
     */
    selectSuggestion = ($item) => {

      var deferred = this.$q.defer();

      this
        .googleMap
        .geocode($item.description)
        .then((location) => {
          deferred.resolve(location);
        });

      return deferred.promise;
    };
  }
}
