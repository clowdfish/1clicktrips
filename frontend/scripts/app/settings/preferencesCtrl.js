(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('preferencesCtrl', preferencesCtrl);

  function preferencesCtrl($scope,
                          settingsService,
                          userPreferences
                          ) {
    $scope.userPreferences = userPreferences;

    $scope.saveSetting = function(key, value) {
      return settingsService
              .setUserSettings(key, value);
    }

  }

})();
