(function() {

  'use strict';

  angular
    .module('app.result')
    .config(routerConfig);

  function routerConfig($stateProvider) {

    $stateProvider.state('search_result', {
      url: '/result?:originLatitude,:originLongitude,:destinationLatitude,:destinationLongitude,:startDate,:endDate,:destination,:origin,:roundTrip',
      templateUrl: 'scripts/app/templates/result/result.html',
      controller: 'resultCtrl',
      resolve: {
        searchObject: getSearchObject
      }
    });

  }

  function getSearchObject($stateParams, appConfig) {
    return {
      origin: {
        latitude: parseFloat($stateParams.originLatitude),
        longitude: parseFloat($stateParams.originLongitude)
      },
      appointments: [
        {
          location: {
            latitude: parseFloat($stateParams.destinationLatitude),
            longitude: parseFloat($stateParams.destinationLongitude)
          },
          start: $stateParams.startDate,
          end: $stateParams.endDate
        }
      ],
      locale: appConfig.activeLanguageKey,
      roundTrip: $stateParams.roundTrip,
      currency: appConfig.activeCurrency
    };
  }

})();
