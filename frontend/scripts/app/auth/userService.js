(function() {

  'use strict';

  angular
    .module('app.auth')
    .service('userService', userService);

  function userService($http, $q, session) {
    var _this = this;
    this.getUserProfile = function() {
      return $q(function(resolve, reject) {

        if (session.getAuthToken() == null) {
          reject("Token is not available");
        }

        _this
          .callUserApi()
          .then(function(data) {
            resolve(data);
          }, function(reason) {
            reject(reason);
          });

      })
    }

    this.callUserApi = function() {
      return $q(function(resolve, reject) {
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
          })
      });
    }

  }
})();
