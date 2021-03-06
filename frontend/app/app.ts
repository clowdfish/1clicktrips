/// <reference path="scripts/_all.ts" />

module app {

  'use strict';

  angular
    .module('app', [
      'app.common',
      'app.print',
      'app.search',
      'app.result',
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
        isOldBrowser: isOldBrowser,
        isMobileBrowser: isMobileBrowser
      }
    });
  }

  /**
   *
   *
   * @param compatibilityChecker
   * @param $q
   * @returns {any}
   */
  function isOldBrowser(compatibilityChecker: Common.CompatibilityChecker, $q) {
    return $q((resolve) => {
      return compatibilityChecker.isOldBrowser().then((result) => {
        resolve(result);
      }, () => {
        resolve(true);
      });
    });
  }

  /**
   *
   *
   * @param browser
   * @param $q
   * @returns {any}
   */
  function isMobileBrowser(browser: Common.Browser, $q) {
    return $q((resolve) => {
      resolve(browser.isMobileDevice());
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

  /**
   *
   *
   * @param object
   * @param prefix
   * @returns {{}}
   */
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

  /**
   *
   *
   * @param $localStorage
   * @returns {boolean}
   */
  function setActiveLanguage($localStorage) {
    // the locale property of window already set by gulp (based on url) has top priority
    if (window['locale']) {
      return;
    }

    // if no specific language url was requested, check a recent language selection
    var localeMapping = {
      de: ['de-de', 'de-at', 'de-li', 'de-lu', 'de-ch'],
      en: ['en-au', 'en-bz', 'en-ca', 'en-cb', 'en-gb', 'en-in', 'en-ie', 'en-jm', 'en-nz', 'en-ph', 'en-za', 'en-tt', 'en-us']
    };

    if (!_.isEmpty($localStorage['selected_language']) && localeMapping[$localStorage['selected_language']]) {
      location.href = '/' + $localStorage['selected_language'] + '/#/';
      return;
    }

    // if no language was selected recently, use the browser language
    var browserLocale = navigator.language.toLowerCase();

    var found = false;
    for (var localeKey in localeMapping) {
      if(localeMapping.hasOwnProperty(localeKey)) {
        var localeList = localeMapping[localeKey];

        if (localeList.indexOf(browserLocale) >= 0 || browserLocale === localeKey) {
          location.href = '/' + localeKey + '/#/';
          found = true;
          break;
        }
      }
    }

    if (found) return;

    // use English as fallback language
    location.href = '/en';
  }

  function run($localStorage) {
    setActiveLanguage($localStorage);

    console.log("App started...");
  }
}