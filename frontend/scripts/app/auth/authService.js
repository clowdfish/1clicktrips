(function() {

  'use strict';

  angular
    .module('app.auth')
    .service('authService', authService);

  function authService($http, $q, $rootScope, AUTH_EVENTS, session) {

    this.signup = function(signupData) {
      return $q(function(resolve, reject) {

        $http
          .post('/api/auth/register', signupData)
          .success(function(data) {
            session.authSuccess(data.token);
            resolve(data);
          })
          .error(function(data, status) {
            reject({
              message: data,
              status: status
            });
          });
      });
    };

    this.login = function(loginData) {
      return $q(function(resolve, reject) {

        if (!validateLoginData(loginData)) {
          reject('invalid.login.data');
        }
        $http
          .post('/api/auth/local', loginData)
          .success(function(data) {
            session.authSuccess(data.token);
            resolve(data);
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
     * Remove user data and logout
     */
    this.logout = function() {
      session.removeAuthToken();
      session.removeUserProfile();
      $rootScope.$broadcast(AUTH_EVENTS.logout);
      $http
        .get('/api/auth/logout');
    };

    function validateLoginData(loginData) {
      return (loginData && loginData.email && loginData.password);
    }
  }
})();
