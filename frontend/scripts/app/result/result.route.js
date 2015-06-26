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
        searchObject: getSearchObject,
        isValidSearchParams: checkIsValidSearchParams
      }
    });
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

  function checkIsValidSearchParams($stateParams) {
    if (moment($stateParams.startDate).isValid() === false || moment($stateParams.endDate).isValid() === false) {
      return {
        isValid: false,
        message: 'search_form_error_timing'
      };
    }

    var startDate = moment($stateParams.startDate).toDate();
    var endDate = moment($stateParams.endDate).toDate();
    var now = new Date();

    if (startDate > endDate) {
      return {
        isValid: false,
        message: 'search_form_error_timing'
      };
    }

    if (startDate < now || endDate < now) {
      return {
        isValid: false,
        message: 'search_form_error_past'
      };
    }

    return {
      isValid: true
    }
  }

})();
