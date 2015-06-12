(function() {

  'use strict';

  angular
    .module('app.result')
    .config(routerConfig);

  function routerConfig($stateProvider) {

    $stateProvider.state('search_result', {
      url: '/result?:originLatitude,:originLongitude,:destinationLatitude,:destinationLongitude,' +
           ':startDate,:endDate,:destination,:origin,:roundTrip,:fromCache',
      templateUrl: 'scripts/app/templates/result/result.html',
      parent: 'root',
      controller: 'resultCtrl',
      resolve: {
        cachedSearchResult: getCachedSearchResult,
        searchObject: getSearchObject
      }
    });
  }

  function getCachedSearchResult($stateParams, bookingApi) {
    var shareTripData = bookingApi.getShareTripData();
    if (_.has($stateParams, 'fromCache') && parseInt($stateParams.fromCache) === 1 && shareTripData !== null) {
      return shareTripData.itineraries;
    }
    return null;
  }

  function getSearchObject($stateParams, appConfig, languageApi) {
    var activeLanguage = appConfig.activeLanguageKey;
    var languageData = languageApi.getLanguageDataByCode(activeLanguage);
    var locale = !_.isEmpty(languageData) ? languageData.locale : 'en-US';
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
      locale: locale,
      roundTrip: $stateParams.roundTrip,
      currency: appConfig.activeCurrency
    };
  }

})();
