/// <reference path="../_all.ts" />

module Result {

  'use strict';

  export class ResultCtrl {

    private _showMapHandler;

    constructor(public $scope,
                public $state,
                public $stateParams,
                public $timeout,
                public TIMEOUT,
                public $q: ng.IQService,
                public tripCache: Result.TripCache,
                public tripApi: Result.TripApi,
                public searchObject,
                public itineraries,
                public language: Common.Language,
                public currency: Common.Currency) {

      $scope.timer = null;
      $scope.timeOut = false;
      $scope.errorState = null;

      $scope.itineraries = itineraries;

      // timing is required for the trip segment container's formatting
      $scope.timing = itineraries[0]['timing'];
      $scope.timing['targetDate'] = searchObject.targetDate;

      $scope.activeItinerary = 0;

      $scope.goToItinerary = this.goToItinerary;
      $scope.activateItinerary = this.activateItinerary;
      $scope.updateItinerary = this.updateItinerary;

      $scope.onShowMap = this.onShowMap;
      $scope.addToggleMapHandler = this.addToggleMapHandler;

      // the selection object is a (itinerary-container-segment => timing) mapping
      // with a string key (eg. "1-2-1") and a timing alternative index (eg. 2).
      $scope.selection = { };
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
            var cacheKey = this.tripCache.getCacheKey(this.$stateParams);
            this.tripCache.storeTrip(this.$scope.itineraries, cacheKey);
            //this.activateTimer(this.$scope.TIMEOUT);

            resolve();
          }, (err) => {
            reject(err);
          });
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
