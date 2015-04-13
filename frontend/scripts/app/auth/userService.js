(function() {

  'use strict';

  angular
    .module('app.auth')
    .service('userService', userService);

  /**
  * This service get and set user profile data
  */
  function userService($http, $q, $upload, session) {

    /**
     * Fetch user profile
     * @return {Object} Promise
     */
    this.getUserProfile = function() {
      return $q(function(resolve, reject) {

        if (session.getAuthToken() == null) {
          reject(new Error("Token is not available"));
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
    };

    /**
     * Update user profile
     */
    this.setUserProfile = function(key, value) {
      return $q(function(resolve, reject) {

        if (session.getAuthToken() == null) {
          reject(new Error("Token is not available"));
        }

        $http
          .post('/api/account/profile', {
            key: key,
            value: value
          })
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
    };

    this.getCountryList = function() {
      return $q(function(resolve, reject) {
        $http
          .get('/api/countries')
          .success(function(countryList){

            countryList.sort(function compare(a,b) {
              if (a.description < b.description)
                return -1;
              if (a.description > b.description)
                return 1;
              return 0;
            });

            resolve(countryList);
          })
          .error(function() {
            reject();
          });
      });
    };

    this.uploadProfilePicture = function(file) {
      return $upload.upload({
        url: '/api/account/upload',
        file: file
      });
    }

  }
})();
