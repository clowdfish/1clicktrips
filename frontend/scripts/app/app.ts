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
      template: '<div ui-view></div>',
      resolve: {
        isOldBrowser: isOldBrowser
      }
    });
  }

  function isOldBrowser(compatibilityChecker: Common.CompatibilityChecker, $q) {
    return $q((resolve, reject) => {
      return compatibilityChecker.isOldBrowser().then((result) => {
        resolve(result);
      }, () => {
        resolve(true);
      });
    });

  }

  /**
   * Setup language data for angular-translate
   */
  function i18nConfig($translateProvider) {
    if (_.isEmpty(window['Locales']) ||
        _.isEmpty(window['AppData']) ||
        _.isEmpty(window['AppData']['languages'])) {
      return false;
    }

    var Locales = window['Locales'];
    var languages = window['AppData']['languages'];
    var hasSetDefault = false;

    /**
     * Load any language available from language.js
     */
    for (var languageIndex = 0; languageIndex < languages.length; languageIndex++) {

      var language = languages[languageIndex];

      if (Locales[language.code]) {

        var formattedLocale = formatLanguageObject(Locales[language.code]);
        $translateProvider.translations(language.code,formattedLocale);

        if (language.isDefault) {
          hasSetDefault = true;
          $translateProvider.preferredLanguage(language.code);
        }
      }
    }

    /**
     * If there is no default language, use first language as default
     */
    if (!hasSetDefault) {
      $translateProvider.preferredLanguage(languages[0].code);
    }
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