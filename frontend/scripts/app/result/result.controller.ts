/// <reference path="../../_all.ts" />

module Result {

  'use strict';

  export class ResultCtrl {

    private _showMapHandler;

    constructor(public $scope,
                public $state,
                public $stateParams,
                public $window,
                public $timeout,
                public TIMEOUT,
                public $q: ng.IQService,
                public resultState,
                public RESULT_STATE,
                public tripCache: Result.TripCache,
                public tripApi: Result.TripApi,
                public searchObject,
                public language: Common.Language,
                public currency: Common.Currency,
                public bookingApi: Booking.BookingApi) {

      $scope.timer = null;
      $scope.timeOut = false;

      $scope.itineraries = null;
      $scope.itinerary = null;
      $scope.hotels = null;

      $scope.searchObject = searchObject;

      $scope.errorState = null;

      $scope.goToOverview = this.goToOverview;
      $scope.goToItinerary = this.goToItinerary;
      $scope.goToHotels = this.goToHotels;
      $scope.goBack = this.goBack;

      $scope.activeItinerary = 0;
      $scope.activateItinerary = this.activateItinerary;
      $scope.updateItinerary = this.updateItinerary;

      $scope.booking = this.booking;


      // timing is required for the trip segment container's formatting
      $scope.timing = { };

      // the selection object is a (itinerary-container-segment => timing) mapping
      // with a string key (eg. "1-2-1") and a timing alternative index (eg. 2).
      $scope.selection = { };

      if(resultState == RESULT_STATE.overview) {
        this.getItineraries();
      }
      else if(resultState == RESULT_STATE.details) {
        this.getItineraryDetails();
      }
      else if(resultState == RESULT_STATE.hotels) {
        this.getHotels();
      }

      $scope.onShowMap = this.onShowMap;
      $scope.addToggleMapHandler = this.addToggleMapHandler;
    }

    /**
     * Tell result map directive to show itinerary
     */
    onShowMap = (itinerary) => {
      this._showMapHandler(itinerary);
    };

    /**
     * Bind show/hide map handler to controller
     */
    addToggleMapHandler = (showMapHandler) => {
      this._showMapHandler = showMapHandler;
    };

    /**
     * Call the trip API to get all itinerary alternatives.
     */
    getItineraries = () => {

      //var cachedSearchResult;
      //if(this.$scope.timer !== null)

      var cachedSearchResult = this.tripCache.getCachedTrip();

      if(cachedSearchResult) {
        // store appointment timing data
        this.$scope.timing = cachedSearchResult[0]['timing'];
        this.$scope.timing['targetDate'] = this.searchObject.targetDate;

        this.$scope.itineraries = cachedSearchResult;
      }
      else {
        this.tripApi
          .getAvailableItineraries(this.searchObject)
          .then((itineraries) =>{
            this.tripCache.storeTrip(itineraries);

            // store appointment timing data
            this.$scope.timing = itineraries[0]['timing'];
            this.$scope.timing['targetDate'] = this.searchObject.targetDate;

            this.$scope.itineraries = itineraries;
            //this.activateTimer(this.$scope.TIMEOUT); // TODO fix error
          }, (err) => {
            this.$scope.errorState = { message: err }
          });
      }
    };

    /**
     * Sends a request to the back end to get new itinerary data.
     *
     * @param itineraryIndex
     * @returns {*}
     */
    updateItinerary = (itineraryIndex) => {

      return new this.$q((resolve, reject) => {

        var searchObject = {
          tripKey: this.$scope.itineraries[itineraryIndex]['tripKey'],
          origin: this.searchObject.origin,
          originDescription: this.searchObject.originDescription,
          destination: this.searchObject.destination,
          destinationDescription: this.searchObject.destinationDescription,
          timing: this.searchObject.timing,
          targetDate: this.searchObject.targetDate,
          selectedAlternatives: this.createAlternativeKeys(itineraryIndex),
          locale: this.language.getActiveLanguage().locale,
          currency: this.currency.getSelectedCurrency().code
        };

        if (this.$scope.itineraries[itineraryIndex].sessionId)
          searchObject['sessionId'] = this.$scope.itineraries[itineraryIndex].sessionId;

        this.tripApi.getTripUpdate(searchObject)
          .then((trip) => {
            // store appointment timing data
            this.$scope.timing = trip['timing'];
            this.$scope.timing['targetDate'] =  this.searchObject.targetDate;

            this.$scope.itineraries[itineraryIndex] = trip;
            this.tripCache.storeTrip(this.$scope.itineraries);
            //this.activateTimer(this.$scope.TIMEOUT);

            resolve();
          }, (err) => {
            reject(err);
          });
      });
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
    getHotels = () => {
      this.tripApi
        .getAvailableHotels(this.searchObject)
        .then((hotels) => {
          this.$scope.hotels = hotels;
        }, (err) => {
          this.$scope.errorState = { message: err }
        });
    };

    /**
     * Set the itinerary with the given index to active.
     *
     * @param index
     */
    activateItinerary = (index) => {
      this.$scope.activeItinerary = index;
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
     * Transition to the state that provides the details of ine itinerary.
     *
     * @param index
     */
    goToItinerary = (index) => {

      var requestParameters = {
        tripKey: this.$scope.itineraries[index]['tripKey'],
        sessionId: this.$scope.itineraries[index]['sessionId'],
        originLatitude: this.searchObject.origin.latitude,
        originLongitude: this.searchObject.origin.longitude,
        origin: this.searchObject.originDescription,
        destinationLatitude: this.searchObject.destination.latitude,
        destinationLongitude: this.searchObject.destination.longitude,
        destination: this.searchObject.destinationDescription,
        startDate: this.searchObject.timing[0],
        targetDate: this.searchObject.targetDate,
        selectedAlternatives: this.createAlternativeKeys(index)
      };

      this.$state.go("result.details", requestParameters);
    };

    /**
     * Transition to the state that provides the overview of all hotels.
     */
    goToHotels = () =>{

      if (this.$scope.itinerary == null) {
        alert("There was no itinerary selected. Please try a");
        return;
      }

      // set duration to 1 for testing purposes
      var duration = 1;

      var requestParameters = {
        tripKey: this.$scope.itinerary['tripKey'],
        sessionId: this.searchObject.sessionId,
        latitude: this.searchObject.destination.latitude,
        longitude: this.searchObject.destination.longitude,
        date: this.searchObject.timing[0],
        duration: duration
      };

      this.$state.go("result.hotels", requestParameters);
    };

    goBack = () => {
      this.$window.history.back();
    };

    /**
     * Creates a string representing the alternatives keys.
     * The format is k-1-2-3 (container-segment-timing) and is concatenated
     * with the % sign.
     *
     * @returns {string}
     */
    createAlternativeKeys = (itineraryIndex) => {

      // In the selection object we store the alternative selection in the
      // format
      // {
      //    "1-2-3": {
      //      alternativeIndex: alternativeIndex,
      //      timingIndex: timingIndex
      //    }
      // }
      // The object key follows the format:
      // itineraryIndex-containerIndex-segmentIndex

      var resultArray = [];

      for (var key in this.$scope.selection) {
        if (this.$scope.selection.hasOwnProperty(key) && key.indexOf('' + itineraryIndex + '-') == 0) {
          resultArray.push(key.substr(key.indexOf('-') + 1) + "-" + this.$scope.selection[key]['timingIndex']);
        }
      }

      return resultArray.join('%');
    };

    /**
     *
     *
     * @param searchData
     * @param itinerary
     * @returns {void|angular.IPromise<any>|IPromise<any>}
     */
    booking = (itinerary) => {
      this.bookingApi.setBookingData(this.searchObject, this.$scope.selection, itinerary);
      return this.$state.go('booking');
    };

    /**
     * TODO This one is not working yet
     *
     * @param time
     */
    activateTimer = (time) => {
      if(this.$scope.timer !== null)
        this.$timeout.cancel(this.$scope.timer);

      this.$scope.timer = this.$timeout(() => {
        console.log('Your session has been expired, please refresh website.');

        this.$scope.timer = null;
        this.$scope.timeOut = true;
        this.tripCache.clearCache();
      }, time);
    };


  }
}
