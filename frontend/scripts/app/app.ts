/// <reference path="../_all.ts" />

module app {

  'use strict';

  angular
    .module('app', [
      'app.common',
      'app.booking',
      'app.search',
      'app.result',
      'app.templates'
    ])
    .config(routeConfig)
    .config(i18nConfig)
    //.config(bracketConfig)
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

  function setActiveLanguage() {
    if (window['locale']) {
      return true;
    }

    var localeMapping = {
      de: ['de-de', 'de-at', 'de-li', 'de-lu', 'de-ch'],
      en: ['en-au', 'en-bz', 'en-ca', 'en-cb', 'en-gb', 'en-in', 'en-ie', 'en-jm', 'en-nz', 'en-ph', 'en-za', 'en-tt', 'en-us']
    }

    var browserLocale = navigator.language.toLowerCase();

    angular.forEach(localeMapping, function(localeList, localeKey) {
      if (localeList.indexOf(browserLocale) >= 0 || browserLocale === localeKey) {
        var newHref = '/' + localeKey + '/#/';
        location.href = newHref;
      }
    });

    //Use English if doesn't match anything
    location.href = '/en';
  }

  function run() {
    setActiveLanguage();
    console.log("App started...");
  }
}