(function() {

  'use strict';

  angular
    .module('app.search')
    .service('defaultOriginApi', defaultOriginApi);

  function defaultOriginApi($q, $sessionStorage, session, settings) {
    /**
    * Available api
    */
    this.getDefaultOrigin = getDefaultOrigin;
    this.setDefaultOrigin = setDefaultOrigin;

    var storageKey = 'default_origin';

    function getDefaultOrigin() {
      return $q(function(resolve, reject) {
        if (false === session.isLogin()) {
          return resolve($sessionStorage[storageKey]);
        }
        settings
          .getSettingByKey(storageKey)
          .then(function(value) {
            try {
              resolve(JSON.parse(value));
            } catch(e) {
              resolve(null);
            }

          }, function() {
            reject();
          });
      });
    }

    function setDefaultOrigin(description, location) {
      return $q(function(resolve, reject) {

        var origin = {
          description: description,
          location: location
        }
        if (description === null || location === null) {
          origin = null;
        }

        if (false === session.isLogin()) {
          $sessionStorage[storageKey] = origin;
          return resolve();
        }

        settings
          .setUserSettings(storageKey, JSON.stringify(origin))
          .then(function() {
            resolve();
          }, function() {
            reject();
          });
      });
    }
  }

})();

