/// <reference path="../_all.ts" />

module Result {

  'use strict';

  export class ResultDetailsCtrl {

    private _showMapHandler;

    constructor(public $scope,
                public $state,
                public $timeout,
                public TIMEOUT,
                public ngDialog,
                public tripCache: Result.TripCache,
                public tripApi: Result.TripApi,
                public searchObject,
                public language: Common.Language,
                public currency: Common.Currency) {

      $scope.timer = null;
      $scope.timeOut = false;
      $scope.errorState = null;

      $scope.itineraries = null;
      $scope.itinerary = null;
      $scope.hotels = null;

      $scope.goToOverview = this.goToOverview;
      $scope.getSegments = this.getStandardSegments;
      $scope.showHotels = this.showHotels;
      $scope.print = this.print;
      $scope.downloadIcsFile = this.downloadIcsFile;
      $scope.addToggleMapHandler = this.addToggleMapHandler;

      this.getItineraryDetails();
    }

    /**
     * Bind show/hide map handler to controller
     */
    addToggleMapHandler = (showMapHandler) => {
      this._showMapHandler = showMapHandler;
    };

    /**
     * Call the trip API to get all itinerary details.
     */
    getItineraryDetails = () => {

      //var cachedTripDetails;
      //if(this.$scope.timer !== null)
      var cachedTripDetails = this.tripCache.getCachedTrip();

      if(cachedTripDetails) {
        // store appointment timing data
        this.$scope.timing = cachedTripDetails['timing'];
        this.$scope.timing['targetDate'] = this.searchObject.targetDate;

        this.$scope.itinerary = cachedTripDetails;
      }
      else {
        this.tripApi
          .getTripDetails(this.searchObject)
          .then((itinerary) => {
            // store appointment timing data
            this.$scope.timing = itinerary['timing'];
            this.$scope.timing['targetDate'] = this.searchObject.targetDate;

            this.tripCache.storeTrip(itinerary);
            this.$scope.itinerary = itinerary;
          }, (err) => {
            this.$scope.errorState = { message: err }
          });
      }
    };

    /**
     * Call the trip API to get all available hotels.
     */
    getHotels = (searchObject) => {
      return this.tripApi
        .getAvailableHotels(searchObject)
        .then((hotels) => {
          this.$scope.hotels = hotels;
          return hotels;
        }, (err) => {
          this.$scope.errorState = { message: err };
          return [];
        });
    };

    /**
     *
     */
    showHotels = () => {
      var self = this;

      this.ngDialog.open({
        template: 'app/templates/modals/result-hotels.html',
        controller: function($scope, hotels) {
          $scope.hotels = hotels;
        },
        resolve: {
          hotels: function() {
            if(self.$scope.hotels)
              return self.$scope.hotels;

            // set duration to 1 for testing purposes
            var duration = 1;

            var hotelSearchObject = {
              tripKey: self.$scope.itinerary['tripKey'],
              sessionId: self.searchObject.sessionId,
              location: self.searchObject.destination,
              dateString: self.searchObject.timing[0],
              duration: duration,
              locale: self.language._activeLanguage.locale,
              currency: self.currency.getSelectedCurrency().code,
              userAgent: navigator.userAgent
            };

            return self.getHotels(hotelSearchObject);
          }
        }
      });
    };

    /**
     * Transition to the state that provides the overview of all itineraries.
     */
    goToOverview = () => {

      var requestParameters = {
        originLatitude: this.searchObject.origin.latitude,
        originLongitude: this.searchObject.origin.longitude,
        origin: this.searchObject.originDescription,
        destinationLatitude: this.searchObject.destination.latitude,
        destinationLongitude: this.searchObject.destination.longitude,
        destination: this.searchObject.destinationDescription,
        startDate: this.searchObject.timing[0],
        targetDate: this.searchObject.targetDate
      };

      this.$state.go("result.list", requestParameters);
    };

    /**
     * Returns the segments of the default alternative.
     *
     * @returns {Array}
     */
    getStandardSegments = () => {
      return this.$scope.itinerary.segmentsContainer.map(function(container) {
        return container.alternatives[0].map(function(segment) {
          return segment;
        });
      }).reduce(function(previousSegmentArray, newSegmentArray) {
        return previousSegmentArray.concat(newSegmentArray);
      });
    };

    /**
     *
     *
     * @param $event
     * @returns {void|angular.IPromise<any>|IPromise<any>}
     */
    print = ($event) => {

      alert("Not yet implemented.");

      //this.printApi.setPrintData(this.searchObject, this.$scope.selection, itinerary);
      //return this.$state.go('print');
    };

    /**
     *
     */
    downloadIcsFile = () => {
      alert("Not yet implemented.");
    };
  }
}
