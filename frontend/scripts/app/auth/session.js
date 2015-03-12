  (function() {

  'use strict';

  angular
    .module('app.auth')
    .service('session', session);

  /**
  * Store, update, get and delete user data
  */
  function session(localStorageService) {

    var _this = this;
    var tokenLocalStorageKey = 'session_token';
    var userProfileKey = 'session_user_profile';
    /**
    * Auth success, store token to localstorage
    * @param {string} token
    */
    this.authSuccess = function(token) {
      localStorageService.set(tokenLocalStorageKey, token);
    }

    /**
    * Auth fail, remove token
    */
    this.authFailed = function() {
      _this.removeAuthToken();
    }

    this.getAuthToken = function() {
      return localStorageService.get(tokenLocalStorageKey);
    }

    this.removeAuthToken = function() {
      localStorageService.remove(tokenLocalStorageKey);
    }

    this.setUserProfile = function(userProfile) {
      localStorageService.set(userProfileKey, userProfile);
    }

    this.removeUserProfile = function() {
      localStorageService.remove(userProfileKey);
    }

    this.getUserProfile = function() {
      return localStorageService.get(userProfileKey);
    }

    this.isLogin = function() {
      return _this.getAuthToken() != null;
    }

  }
})();
