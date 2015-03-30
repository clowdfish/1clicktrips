(function() {

  'use strict';

  angular
    .module('app.settings')
    .service('settingsService', settingsService);

  function settingsService($q, $http, session, settingsTemplate) {

    var _this = this;

    this.getUserSettings = function() {
      return $q(function(resolve, reject) {

        if (session.getAuthToken() === null) {
          reject("Token is not available");
        }

        $http
          .get('/api/account/settings')
          .success(function(response) {
            var settings = mergeWithDefaultSettings(response);
            resolve(settings);
          })
          .error(function() {
            reject();
          });
      });
    }

    this.setUserSettings = function(key, value) {
      return $q(function(resolve, reject) {
        if (session.getAuthToken() == null) {
          reject("Token is not available");
        }

        $http
          .post('/api/account/settings', {
            key: key,
            value: value
          })
          .success(function(response) {
            resolve(response);
          })
          .error(function() {
            reject();
          });
      });
    }

    function mergeWithDefaultSettings(userSettings) {
      var mergedSettings = [];
      for (var settingIndex = 0; settingIndex < settingsTemplate.length; settingIndex++) {
        var setting = settingsTemplate[settingIndex];
        var userSetting = _.find(userSettings, function(item) {
          return item.key === settingsTemplate[settingIndex].key;
        });
        setting['value'] = userSetting !== undefined ? userSetting['value'] : setting['default'];
        if (setting.options) {
          for (var optionKey in setting.options) {
            if (parseInt(optionKey) === setting['value']) {
              setting.options[optionKey]['selected'] = true;
            } else {
              setting.options[optionKey]['selected'] = false;
            }
          }
        }
        mergedSettings.push(setting);
      }
      return mergedSettings;
    }

    return this;

  }

})();
