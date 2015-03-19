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
    };

    /**
    * Auth fail, remove token
    */
    this.authFailed = function() {
      _this.removeAuthToken();
    };

    /**
     * Get authentication token
     */
    this.getAuthToken = function() {
      return localStorageService.get(tokenLocalStorageKey);
    };

    /**
     * Remove authentication token from localstorage
     */
    this.removeAuthToken = function() {
      localStorageService.remove(tokenLocalStorageKey);
    };

    //Save user profile to localStorage
    this.setUserProfile = function(userProfile) {
      localStorageService.set(userProfileKey, userProfile);
    };

    //Remove user profile data
    this.removeUserProfile = function() {
      localStorageService.remove(userProfileKey);
    };

    //Get user profile
    this.getUserProfile = function() {
      return localStorageService.get(userProfileKey);
    };

    this.isLogin = function() {
      return _this.getAuthToken() != null;
    };
  }
})();
