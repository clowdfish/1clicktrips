(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('preferencesCtrl', preferencesCtrl);

  function preferencesCtrl($scope,
                          settings,
                          userPreferences
                          ) {
    $scope.userPreferences = userPreferences;

    $scope.saveSetting = function(key, value) {
      return settings
              .setUserSettings(key, value);
    }

  }

})();
