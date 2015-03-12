(function() {

  'use strict';

  angular
    .module('app.auth')
    .service('authService', authService);

  function authService($http, $q, $rootScope, AUTH_EVENTS, session) {
    var _this = this;

    this.signup = function(signupData) {
      return $q(function(resolve, reject) {
        _this.callSignupApi(signupData)
          .then(function(data) {
            session.authSuccess(data.token);
            resolve(data)
          }, function(reason) {
            reject(reason);
          });
      });
    }

    this.callSignupApi = function(signupData) {
      return $q(function(resolve, reject) {
        $http
          .post('/api/auth/register', signupData)
          .success(function(data) {
            resolve(data);
          })
          .error(function(data, status) {
            reject({
              message: data,
              status: status
            });
          });
      });
    }

    this.login = function(loginData) {
      return $q(function(resolve, reject) {
        _this
          .callLoginApi(loginData)
          .then(function(data) {
            session.authSuccess(data.token);
            resolve(data)
          }, function(data, status) {
            console.log(data);
            reject(data, status);
          });
      });
    }

    this.callLoginApi = function(loginData) {
      return $q(function(resolve, reject) {
        $http
          .post('/api/auth/local', loginData)
          .success(function(data) {
            resolve(data);
          })
          .error(function(data, status) {
            reject({
              message: data,
              status: status
            });
          })
      })
    }

    /**
     * Remove user data and logout
     */
    this.logout = function() {
      session.removeAuthToken();
      session.removeUserProfile();
      $rootScope.$broadcast(AUTH_EVENTS.logout);
      $http
        .get('/api/auth/logout');
    }
  }
})();
