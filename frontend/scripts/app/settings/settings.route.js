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
      parent:'root',
      resolve: {
        checkAuthenticaton: checkAuthenticaton
      }
    });

    $stateProvider.state('settings.profile', {
      url: '/profile',
      templateUrl: 'scripts/app/templates/settings/profile.html',
      controller: 'profileCtrl',
      resolve: {
        userProfile: getUserProfile,
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

    $stateProvider.state('settings.booking', {
      url: '/booking',
      templateUrl: 'scripts/app/templates/settings/booking-table.html',
      controller: 'bookingCtrl',
      resolve: {
        bookingList: getBookingList
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
  }
  
  function checkAuthenticaton($state, session, authHelper, $q) {    
    var deferred = $q.defer();
    if (!session.isLogin()) {      
      authHelper.openLoginDialog('settings.profile');
      deferred.reject();      
    }    
    deferred.resolve();
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

  function getBookingList(session, bookingApi) {
    if (!session.isLogin()) {
      return [];
    }
    return bookingApi.getBookedTrips();
  }

})();
