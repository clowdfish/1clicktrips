/*
* This module contain global configuration like authentication, languages
*/
(function() {

  'use strict';

  angular
    .module('app.index', [
      'app.core'
    ])
    .config(interpolateConfig)
    .config(languageConfig);

  function languageConfig($translateProvider) {
    var en = formatLanguageObject(Locales.en.en);
    var de = formatLanguageObject(Locales.de.de);

    $translateProvider.translations('en', en);
    $translateProvider.translations('de', de);

    $translateProvider.preferredLanguage('en');
  }

  function interpolateConfig($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
  }

  function formatLanguageObject(object, prefix) {
    prefix = prefix || "";
    var result = {};
    var keys = _.keys(object);
    if (keys.length > 0) {
      for (var i = 0; i < keys.length; i++ ) {
        var key = keys[i];
        var stringKey = prefix != "" ? prefix + '_' + key : key;
        if (_.isObject(object[key])) {
          result = _.extend(result, formatLanguageObject(object[key], stringKey));
        } else {
          result[stringKey] = object[key];
        }
      }
    }
    return result;
  }
})();
