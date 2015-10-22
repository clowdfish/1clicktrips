/// <reference path="../../_all.ts" />

module Search {

  'use strict';

  export class SearchCtrl {
    constructor(public $scope,
                public $state,
                public searchFormData,
                public suggestionAdapter: SuggestionAdapter,
                public googleMap: Common.GoogleMap,
                public language: Common.Language,
                public $q) {

      // optimize forward or backward
      $scope.targetDate = searchFormData.targetDate;

      $scope.schedule = {
        title: "",
        origin: searchFormData.originLocation,
        originAddress: searchFormData.origin,
        destination: searchFormData.destinationLocation,
        destinationAddress: searchFormData.destination,
        time: searchFormData.startDate // datetime object
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
      $scope.isOpenDatePicker = false;
      $scope.isOpenTimePicker = false;

      // configure date picker
      $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 0
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date < new Date() ) );
      };

      //$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = 'dd-MM-yyyy';

      $scope.toggleDatePicker = this.toggleDatePicker;
      $scope.toggleTimePicker = this.toggleTimePicker;

      $scope.timeString = moment($scope.schedule.time).format('HH:mm');
      $scope.isValidTimeString = true;

      $scope.$watch(language._activeLanguage, () => {
        $scope.startingDay = language.getActiveLanguage().startingDay;
      });

      $scope.$watch('timeString', () => {
        this.validateTimeString((result, values) => {

          if (result) {
            $scope.isValidTimeString = true;
            var date = _.clone(this.$scope.schedule.time);
            date.setHours(values.hours);
            date.setMinutes(values.minutes);
            this.$scope.schedule.time = date;
          } else {
            $scope.isValidTimeString = false;
          }
        });
      });
    }

    validateTimeString = (callback) => {
      var timePattern = /([01]?[0-9]|2[0-3])(:?)[0-5][0-9]$/;
      var matches = this.$scope.timeString.match(timePattern);

      if (matches === null) {
        return callback(false);
      }

      if (this.$scope.timeString.length > 5) {
        return callback(false);
      }

      var hours: number,
          minutes: number;

      if (matches[0].length === 5) {
        var timeArray = matches[0].split(':');
        hours = parseInt(timeArray[0]);
        minutes = parseInt(timeArray[1]);
      } else if (matches[0].length === 4 || matches[0].length === 3) {
        hours = parseInt(matches[0].substr(0,2));
        minutes = parseInt(matches[0].substr(2,2));
      } else {
        return callback(false);
      }

      if (_.isNaN(hours) || _.isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
         return callback(false);
      }

      return callback(true, {
        hours: hours,
        minutes: minutes
      });
    };

    toggleDatePicker = (event) => {
      event.stopPropagation();

      if (!this.$scope.isOpenDatePicker) {
        this.$scope.isOpenTimePicker = false;
      }

      this.$scope.isOpenDatePicker = !this.$scope.isOpenDatePicker;
    };

    toggleTimePicker = () => {

      if (this.$scope.isOpenTimePicker) {
        this.$scope.isOpenDatePicker = false;
      }

      this.$scope.isOpenTimePicker = !this.$scope.isOpenTimePicker;
    };

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

      if (false === this.$scope.isValidTimeString) {
        alert('Time format is not valid');
      }

      if(this.$scope.schedule.time == null) {
        alert("Date and time fields must be filled.");
        return false;
      }

      // check if date and time format is correct
      var time = moment(this.$scope.schedule.time);
      if (!time.isValid()) {
        alert("Date or time is not valid (must be DD.MM.YYYY and HH:mm).");
        return false;
      }

      // check if date is in the future
      if (time.isBefore(moment(new Date()))) {
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
    };

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
