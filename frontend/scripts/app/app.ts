/// <reference path="../_all.ts" />

module app {

  'use strict';

  angular
    .module('app', [
      'app.common',
      'app.booking',
      'app.index',
      'app.search',
      'app.result',
      'app.info',
      'app.templates'
    ])
    .config(routeConfig)
    .config(i18nConfig)
    .value('googleApiKey', 'AIzaSyC9-ZIG4bma6FIUumqPyYwWTlU-Gc5QnMY')
    .run(run);

  function routeConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state('root', {
      abstract: true,
      template: '<div ui-view></div>'
    });
  }

  function i18nConfig($translateProvider) {
    var Locales = window['Locales'];
    var en = formatLanguageObject(Locales.en);
    var de = formatLanguageObject(Locales.de);

    $translateProvider.translations('en', en);
    $translateProvider.translations('de', de);

    $translateProvider.preferredLanguage('en');
  }

  function formatLanguageObject(object, prefix?) {
    prefix = prefix || "";
    var result = {};
    var keys = _.keys(object);
    if (keys.length > 0) {
      for (var i = 0; i < keys.length; i++ ) {
        var key = keys[i];
        var stringKey = prefix != "" ? prefix + '.' + key : key;
        if (_.isObject(object[key])) {
          result = _.extend(result, formatLanguageObject(object[key], stringKey));
        } else {
          result[stringKey] = object[key];
        }
      }
    }
    return result;
  }

  function run() {
    console.log("App started...");
  }
}

