/// <reference path="../_all.ts" />

module Result {

  'use strict';

  export function routerConfig($stateProvider: angular.ui.IStateProvider) {

    $stateProvider.state('result', {
      abstract: true,
      parent: 'root',
      template: '<div ui-view></div>'
    });

    $stateProvider.state('result.list', {
      url: '/result?:originLatitude,:originLongitude,:destinationLatitude,:destinationLongitude,' +
           ':origin,:destination,:startDate,:targetDate,:selectedAlternatives',
      templateUrl: 'app/templates/result/result-list.html',
      controller: 'resultCtrl',
      resolve: {
        searchObject: getTripSearchObject,
        itineraries: getItineraries
      }
    });

    $stateProvider.state('result.details', {
      url: '/result/details?:tripKey,:sessionId,:originLatitude,:originLongitude,:destinationLatitude,' +
      ':destinationLongitude,:origin,:destination,:startDate,:targetDate,:selectedAlternatives',
      templateUrl: 'app/templates/result/result-details.html',
      controller: 'resultDetailsCtrl',
      resolve: {
        searchObject: getTripSearchObject,
        itinerary: getItineraryDetails
      }
    });
  }

  /**
   * Create a search object for the trips API.
   *
   * @param $stateParams
   * @param language
   * @param currency
   * @returns {*}
   */
  function getTripSearchObject($stateParams,
                               language: Common.Language,
                               currency:Common.Currency) {

    var searchObject = {
      origin: {
        latitude: parseFloat($stateParams.originLatitude),
        longitude: parseFloat($stateParams.originLongitude)
      },
      originDescription: $stateParams.origin,
      destination: {
        latitude: parseFloat($stateParams.destinationLatitude),
        longitude: parseFloat($stateParams.destinationLongitude)
      },
      destinationDescription: $stateParams.destination,
      timing: [ $stateParams.startDate ],
      locale: language.getActiveLanguage().locale,
      currency: currency.getSelectedCurrency().code,
      targetDate: $stateParams.targetDate
    };

    if($stateParams.tripKey)
      searchObject['tripKey'] = $stateParams.tripKey;

    if($stateParams.sessionId)
      searchObject['sessionId'] = $stateParams.sessionId;

    if($stateParams.selectedAlternatives)
      searchObject['selectedAlternatives'] = $stateParams.selectedAlternatives;

    return searchObject;
  }

  /**
   * Call the trip API to get all itinerary alternatives.
   *
   * @param $q
   * @param $stateParams
   * @param language
   * @param currency
   * @param tripCache
   * @param tripApi
   * @returns {IPromise<T>}
   */
  function getItineraries($q,
                          $stateParams,
                          language:Common.Language,
                          currency:Common.Currency,
                          tripCache: Result.TripCache,
                          tripApi: Result.TripApi) {

    var deferred = $q.defer();

    var searchObject = getTripSearchObject($stateParams, language, currency);

    var cacheKey = tripCache.getCacheKey($stateParams);
    var cachedSearchResult = tripCache.getCachedTrip(cacheKey);

    if(cachedSearchResult) {
      deferred.resolve(cachedSearchResult);
    }
    else {
      tripApi
        .getAvailableItineraries(searchObject)
        .then((itineraries) => {
          tripCache.storeTrip(itineraries, cacheKey);
          deferred.resolve(itineraries);
        }, (err) => {
          deferred.reject(err);
        });
    }

    return deferred.promise;
  }

  /**
   * Call the trip API to get all itinerary details.
   *
   * @param $q
   * @param $stateParams
   * @param language
   * @param currency
   * @param tripCache
   * @param tripApi
   * @returns {IPromise<T>}
   */
  function getItineraryDetails($q,
                               $stateParams,
                               language:Common.Language,
                               currency:Common.Currency,
                               tripCache: Result.TripCache,
                               tripApi: Result.TripApi) {

    var deferred = $q.defer();

    var searchObject = getTripSearchObject($stateParams, language, currency);
    var cachedTripDetails = tripCache.getCachedTrip(searchObject['tripKey'] + '||' + $stateParams.selectedAlternatives);

    if(cachedTripDetails) {
      deferred.resolve(cachedTripDetails);
    }
    else {
      tripApi
        .getTripDetails(searchObject)
        .then((itinerary) => {
          tripCache.storeTrip(itinerary, searchObject['tripKey'] + '||' + $stateParams.selectedAlternatives);
          deferred.resolve(itinerary);
        }, (err) => {
          deferred.reject(err);
        });
    }

    return deferred.promise;
  }
}
