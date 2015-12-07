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
        searchObject: getTripSearchObject
      }
    });

    $stateProvider.state('result.details', {
      url: '/result/details?:tripKey,:sessionId,:originLatitude,:originLongitude,:destinationLatitude,' +
      ':destinationLongitude,:origin,:destination,:startDate,:targetDate,:selectedAlternatives',
      templateUrl: 'app/templates/result/result-details.html',
      controller: 'resultDetailsCtrl',
      resolve: {
        searchObject: getTripSearchObject
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
  function getTripSearchObject($stateParams, language: Common.Language, currency:Common.Currency) {

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
}
