(function() {

  'use strict';

  angular
    .module('app.common')
    .service('language', language);

  function language() {

    return {
      get: function() {
        return {
          "code": "en",
          "name": "English",
          "locale": "en-US",
          "defaultCurrency": "usd"
        }
      }
    }
  }
})();