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

    /**
     * Submit form
     */
    $scope.submit = function() {
      settingsService
        .setUserSettings($scope.userPreferences)
        .then(function() {
          alert('Update preference successful');
        }, function() {
          alert('Can not update preference');
        });
    }

  }

})();
