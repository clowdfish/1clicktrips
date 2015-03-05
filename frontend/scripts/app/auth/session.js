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
      localStorageService.remove(tokenLocalStorageKey);
    }

    this.getAuthToken = function() {
      return localStorageService.get(tokenLocalStorageKey);
    }

  }
})();
