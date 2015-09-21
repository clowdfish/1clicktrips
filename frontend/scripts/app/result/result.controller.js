(function() {
  'use strict';

  angular.module('app.result')
    .controller('resultCtrl', resultCtrl);

  function resultCtrl($scope,
                      $state,
                      $stateParams,
                      $window,
                      resultState,
                      RESULT_STATE,
                      tripCache,
                      tripApi,
                      searchObject,
                      language,
                      currency) {

    $scope.searchData = {
      originDescription: searchObject['originDescription'],
      destinationDescription: searchObject['destinationDescription'],
      timing: searchObject['timing'][0]
    };

    $scope.itineraries = null;
    $scope.itinerary = null;
    $scope.hotels = null;

    $scope.errorState = null;

    $scope.goToOverview = goToOverview;
    $scope.goToItinerary = goToItinerary;
    $scope.goToHotels = goToHotels;
    $scope.goBack = goBack;

    $scope.activeItinerary = 0;
    $scope.activateItinerary = activateItinerary;
    $scope.updateItinerary = updateItinerary;

    // timing is required for the trip segment container
    $scope.timing = {
      value: searchObject.timing[0],
      targetDate: searchObject.targetDate
    };

    // the selection object is a (itinerary-container-segment => timing) mapping
    // with a string key (eg. "1-2-1") and a timing alternative index (eg. 2).
    $scope.selection = { };

    if(resultState == RESULT_STATE.overview) {
      getItineraries();
    }
    else if(resultState == RESULT_STATE.details) {
      getItineraryDetails();
    }
    else if(resultState == RESULT_STATE.hotels) {
      getHotels();
    }

    /**
     * Call the trip API to get all itinerary alternatives.
     */
    function getItineraries() {

      var cachedSearchResult = tripCache.getCachedTrip();

      if(cachedSearchResult) {
        $scope.itineraries = cachedSearchResult;
      }
      else {
        tripApi
          .getAvailableItineraries(searchObject)
          .then(function (itineraries) {
            tripCache.storeTrip(itineraries);
            $scope.itineraries = itineraries;
          }, function (err) {
            $scope.errorState = { message: err }
          });
      }
    }

    /**
     * Sends a request to the back end to get new itinerary data.
     *
     * @param itineraryIndex
     * @returns {*}
     */
    function updateItinerary(itineraryIndex) {

      return new Promise(function(resolve, reject) {

        var searchObject = {
          tripKey: $scope.itineraries[itineraryIndex]['tripKey'],
          timing: [ $stateParams.startDate ],
          targetDate: $stateParams.targetDate,
          selectedAlternatives: createAlternativeKeys(itineraryIndex),
          locale: language.get().locale,
          currency: currency.get().code
        };

        if($stateParams.sessionId)
          searchObject.sessionId = $stateParams.sessionId;

        tripApi.getTripUpdate(searchObject)
          .then(function(trip) {
            $scope.itineraries[itineraryIndex] = trip;
            resolve();
          }, function(err) {
            reject(err);
          });
      });
    }

    /**
     * Call the trip API to get all itinerary details.
     */
    function getItineraryDetails() {

      var cachedTripDetails = tripCache.getCachedTrip();

      if(cachedTripDetails) {
        $scope.itinerary = cachedTripDetails;
      }
      else {
        tripApi
          .getTripDetails(searchObject)
          .then(function (itinerary) {
            tripCache.storeTrip(itinerary);
            $scope.itinerary = itinerary;
          }, function (err) {
            $scope.errorState = { message: err }
          });
      }
    }

    /**
     * Call the trip API to get all available hotels.
     */
    function getHotels() {

      tripApi
        .getAvailableHotels(searchObject)
        .then(function(hotels) {
          $scope.hotels = hotels;
        }, function(err) {
          $scope.errorState = { message: err }
        });
    }

    /**
     * Set the itinerary with the given index to active.
     *
     * @param index
     */
    function activateItinerary(index) {
      $scope.activeItinerary = index;
    }

    /**
     * Transition to the state that provides the overview of all itineraries.
     */
    function goToOverview() {

      var requestParameters = {
        originLatitude: searchObject.origin.latitude,
        originLongitude: searchObject.origin.longitude,
        origin: searchObject.originDescription,
        destinationLatitude: searchObject.destination.latitude,
        destinationLongitude: searchObject.destination.longitude,
        destination: searchObject.destinationDescription,
        startDate: searchObject.timing[0],
        targetDate: searchObject.targetDate
      };

      $state.go("result.list", requestParameters);
    }

    /**
     * Transition to the state that provides the details of ine itinerary.
     *
     * @param index
     */
    function goToItinerary(index) {

      var requestParameters = {
        tripKey: $scope.itineraries[index]['tripKey'],
        sessionId: $scope.itineraries[index]['sessionId'],
        originLatitude: searchObject.origin.latitude,
        originLongitude: searchObject.origin.longitude,
        origin: searchObject.originDescription,
        destinationLatitude: searchObject.destination.latitude,
        destinationLongitude: searchObject.destination.longitude,
        destination: searchObject.destinationDescription,
        startDate: searchObject.timing[0],
        targetDate: searchObject.targetDate,
        selectedAlternatives: createAlternativeKeys(index)
      };

      $state.go("result.details", requestParameters);
    }

    /**
     * Transition to the state that provides the overview of all hotels.
     */
    function goToHotels() {

      if($scope.itinerary == null) {
        alert("There was no itinerary selected. Please try a");
        return;
      }

      // set duration to 1 for testing purposes
      var duration = 1;

      var requestParameters = {
        tripKey: $scope.itinerary['tripKey'],
        sessionId: searchObject.sessionId,
        latitude: searchObject.destination.latitude,
        longitude: searchObject.destination.longitude,
        date: searchObject.timing[0],
        duration: duration
      };

      $state.go("result.hotels", requestParameters);
    }

    function goBack() {
      $window.history.back();
    }

    /**
     * Creates a string representing the alternatives keys.
     * The format is k-1-2-3 (container-segment-timing) and is concatenated
     * with the % sign.
     *
     * @returns {string}
     */
    function createAlternativeKeys(itineraryIndex) {

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

      for(var key in $scope.selection) {
        if($scope.selection.hasOwnProperty(key) && key.indexOf('' + itineraryIndex + '-') == 0) {
          resultArray.push(key.substr(key.indexOf('-')) + "-" + $scope.selection[key]['timingIndex']);
        }
      }

      return resultArray.join('%');
    }
  }
})();
