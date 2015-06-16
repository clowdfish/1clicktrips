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
            resolve(value);

          }, function() {
            reject();
          });

      });
    }

    function setDefaultOrigin(description, location) {
      return $q(function(resolve, reject) {

        var origin = null;
        if (description != null && location != null) {
          origin = {
            description: description,
            location: location
          };
        }


        if (false === session.isLogin()) {
          $sessionStorage[storageKey] = origin;
          return resolve();
        }
        else {

          var settingValue = origin !== null ? JSON.stringify(origin) : null;
          settings
            .setUserSettings(storageKey, settingValue)
            .then(function() {
              resolve();
            }, function() {
              reject();
            });
        }
      });
    }
  }

})();

