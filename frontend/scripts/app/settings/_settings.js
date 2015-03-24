(function() {

  'use strict';

  angular
    .module('app.settings', [
      'app.core'
    ])
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider.state('settings', {
      url:'/settings',
      templateUrl: 'scripts/app/templates/settings/settings.html',
      controller: 'settingsCtrl'
    });

    $stateProvider.state('settings.profile', {
      url: '/profile',
      templateUrl: 'scripts/app/templates/settings/profile.html',
      controller: 'profileCtrl',
      resolve: {
        userProfile: getUserProfile
      }
    });

    $stateProvider.state('settings.preferences', {
      url: '/preferences',
      templateUrl: 'scripts/app/templates/settings/preferences.html',
      controller: 'preferencesCtrl',
      resolve: {
        userPreferences: getUserPreferences
      }
    })

    function getUserProfile(userService) {
      return userService.getUserProfile();
    }

    function getUserPreferences(settingsService) {
      return settingsService.getUserSettings('preferences');
    }

  }

})();
