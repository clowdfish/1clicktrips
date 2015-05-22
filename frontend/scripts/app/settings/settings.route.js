(function() {

  'use strict';

  angular
    .module('app.settings')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider.state('settings', {
      url:'/settings',
      templateUrl: 'scripts/app/templates/settings/settings.html',
      controller: 'settingsCtrl',
      resolve: {
        checkAuthenticaton: checkAuthenticaton,
        userProfile: getUserProfile
      }
    });

    $stateProvider.state('settings.profile', {
      url: '/profile',
      templateUrl: 'scripts/app/templates/settings/profile.html',
      controller: 'profileCtrl',
      resolve: {
        countryList: getCountryList
      }
    });

    $stateProvider.state('settings.preferences', {
      url: '/preferences',
      templateUrl: 'scripts/app/templates/settings/preferences.html',
      controller: 'preferencesCtrl',
      resolve: {
        userPreferences: getUserPreferences
      }
    });

    $stateProvider.state('settings.favorite', {
      url: '/favorite',
      templateUrl: 'scripts/app/templates/settings/favorite-table.html',
      controller: 'favoriteCtrl',
      resolve: {
        favorites: getFavorites
      }
    });

    $stateProvider.state('settings.payment', {
      url: '/payment',
      templateUrl: 'scripts/app/templates/settings/payment.html',
      controller: 'paymentCtrl'
    });

    $stateProvider.state('settings.privacy', {
      url: '/privacy',
      templateUrl: 'scripts/app/templates/settings/privacy.html',
      controller: 'privacyCtrl'
    });
  }

  function checkAuthenticaton($state, session, authHelper, $q) {
    var deferred = $q.defer();
    if (!session.isLogin()) {
      authHelper.openLoginDialog('settings.profile');
      deferred.reject();
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }

  function getUserProfile(userApi) {
    return userApi.getUserProfile();
  }

  function getUserPreferences(settings) {
    return settings.getUserSettings();
  }

  function getCountryList(userApi) {
    return userApi.getCountryList();
  }

  function getFavorites(session, favoriteApi) {
    if (!session.isLogin()) {
      return [];
    }
    return favoriteApi.getFavoriteList();
  }

})();
