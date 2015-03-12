(function() {

  'use strict';

  angular
    .module('app.auth')
    .service('userService', userService);

  /**
  * This service get and set user profile data
  */
  function userService($http, $q, session) {
    var _this = this;
    this.getUserProfile = function() {
      return $q(function(resolve, reject) {

        if (session.getAuthToken() == null) {
          reject("Token is not available");
        }

        $http
          .get('/api/account/profile')
          .success(function(response) {
            resolve(response);
          })
          .error(function(data, status) {
            reject({
              message: data,
              status: status
            });
          });
      });
    }

  }
})();
