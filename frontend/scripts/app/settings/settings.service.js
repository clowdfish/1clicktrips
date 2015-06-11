(function() {

  'use strict';

  angular
    .module('app.settings')
    .service('settings', settings);

  function settings($timeout, $q, $http, session, settingsTemplate) {

    var _this = this;

    this.getUserSettings = getUserSettings;
    this.setUserSettings = setUserSettings;
    this.mergeUserSettingWithTemplate = mergeUserSettingWithTemplate;
    this.getSettingByKey = getSettingByKey;
    this.findValueFromSettings = findValueFromSettings;

    function getUserSettings() {
      return $q(function(resolve, reject) {

        if (session.getAuthToken() === null) {
          reject(new Error("Token is not available"));
        }

        $http
          .get('/api/account/settings')
          .success(function(response) {
            var settings = mergeUserSettingWithTemplate(response);
            settings = addSettingValidation(settings);
            resolve(settings);
          })
          .error(function() {
            reject();
          });
      });
    }

    function findValueFromSettings(settings, key) {
      var item = _.find(settings, function(setting) {
        return setting.key == key;
      });

      if (item) {
        return item.value;
      }
      return null;
    }

    function getSettingByKey(key) {
      return $q(function(resolve, reject) {

        if (session.getAuthToken() === null) {
          reject(new Error("Token is not available"));
        }

        $http
          .get('/api/account/settings/' + key)
          .success(function(response) {
            resolve(response);
          })
          .error(function() {
            reject();
          });
      });
    }

    function setUserSettings(key, value) {
      return $q(function(resolve, reject) {
        if (session.getAuthToken() == null) {
          reject(new Error("Token is not available"));
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

        if (setting.options) {
          setting.value = parseInt(setting.value);
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

    function addSettingValidation(settings) {
      var validations = {
        start_time: {
          test: validateTimeString,
          errorMessage: "Invalid time format"
        },
        end_time: {
          test: validateTimeString,
          errorMessage: "Invalid time format"
        }
      };

      _.each(settings, function(setting) {
        if (typeof(validations[setting.key]) !== 'undefined') {
          setting['validator'] = validations[setting.key];
        }
      });

      return settings;
    }

    function validateTimeString(value) {
      return new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$").test(value);
    }

    return this;

  }

})();
