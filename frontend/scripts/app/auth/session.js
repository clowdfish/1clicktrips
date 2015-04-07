  (function() {

  'use strict';

  angular
    .module('app.auth')
    .service('session', session);

  /**
  * Store, update, get and delete user data
  */
  function session($localStorage, $sessionStorage) {

    var _this = this;
    var tokenLocalStorageKey = 'session_token';
    var userProfileKey = 'session_user_profile';
    /**
    * Auth success, store token to localstorage
    * @param {string} token
    */
    this.authSuccess = function(token, rememberToken) {
      $sessionStorage.token = token;
      if (rememberToken) {
        $localStorage.token = token;
      }
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
      var token = $sessionStorage.token;
      if (!token) {
        token = $localStorage.token;
      }
      return token;
    };

    /**
     * Remove authentication token from localstorage
     */
    this.removeAuthToken = function() {
      delete $sessionStorage.token;
      delete $localStorage.token;
    };

    //Save user profile to localStorage
    this.setUserProfile = function(userProfile) {
      $sessionStorage.userProfile = userProfile;
    };

    //Remove user profile data
    this.removeUserProfile = function() {
      delete $sessionStorage.userProfile;
    };

    //Get user profile
    this.getUserProfile = function() {
      $sessionStorage.userProfile;
    };

    this.isLogin = function() {
      return _this.getAuthToken() != null;
    };
  }
})();
