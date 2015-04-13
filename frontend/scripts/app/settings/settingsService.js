(function() {

  'use strict';

  angular
    .module('app.settings')
    .service('settingsService', settingsService);

  function settingsService($q, $http, session, settingsTemplate) {

    var _this = this;

    this.getUserSettings = getUserSettings;
    this.setUserSettings = setUserSettings;
    this.mergeUserSettingWithTemplate = mergeUserSettingWithTemplate;

    function getUserSettings() {
      return $q(function(resolve, reject) {

        if (session.getAuthToken() === null) {
          reject("Token is not available");
        }

        $http
          .get('/api/account/settings')
          .success(function(response) {
            var settings = mergeUserSettingWithTemplate(response);
            resolve(settings);
          })
          .error(function() {
            reject();
          });
      });
    }

    function setUserSettings(key, value) {
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

    function mergeUserSettingWithTemplate(userSettings) {
      var mergedSettings = [];
      for (var settingIndex = 0; settingIndex < settingsTemplate.length; settingIndex++) {
        var setting = settingsTemplate[settingIndex];
        var userSetting = _.find(userSettings, function(item) {
          return item.key === settingsTemplate[settingIndex].key;
        });
        setting.value = userSetting !== undefined ? userSetting.value : setting.defaultValue;
        setting.value = parseInt(setting.value);
        if (setting.options) {

          for (var optionIndex = 0; optionIndex < setting.options.length; optionIndex++) {
            setting.options[optionIndex]['selected'] = false;
            if (setting.options[optionIndex].value == setting.value) {
              setting.options[optionIndex]['selected'] = true;
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
