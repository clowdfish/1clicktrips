(function() {

  'use strict';

  angular
    .module('app.auth')
    .service('userService', userService);

  /**
  * This service get and set user profile data
  */
  function userService($http, $q, $upload, session) {

    var _this = this;

    /**
     * Fetch user profile
     * @return {Object} Promise
     */
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

    /**
     * Update user profile
     */
    this.setUserProfile = function(userProfile) {
      return $q(function(resolve, reject) {

        if (session.getAuthToken() == null) {
          reject("Token is not available");
        }

        $http
          .post('/api/account/profile', userProfile)
          .success(function(response) {
            resolve(response);
          })
          .error(function(data, status) {
            reject({
              data: data,
              status: status
            });
          });
      });
    }

    this.uploadProfilePicture = function(file) {
      return $upload.upload({
        url: '/api/account/upload',
        file: file
      });
    }

  }
})();
