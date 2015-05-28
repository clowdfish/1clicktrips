(function() {

  'use strict';

  angular
    .module('app.auth')
    .service('authApi', authApi);

  function authApi($http, $q, $rootScope, AUTH_EVENTS, session) {

    this.signup = function(signupData) {
      return $q(function(resolve, reject) {

        $http
          .post('/api/auth/register', signupData, {
            waitingMessage: 'Checking your credentials'
          })
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

    this.login = function(loginData, remember) {
      return $q(function(resolve, reject) {

        if (!validateLoginData(loginData)) {
          reject('invalid.login.data');
        }

        $http
          .post('/api/auth/local', loginData, {
            waitingMessage: 'Checking your credentials'
          })
          .success(function(data) {
            session.authSuccess(data.token, remember);
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

    this.forgotPassword = function(email) {
      return $q(function(resolve, reject) {
        if (!email) {
          return reject(new Error("Email address empty"));
        }

        $http
          .post('/api/auth/forgot', {
            email: email
          })
          .success(function() {
            resolve();
          })
          .error(function(data, status) {
            reject({
              data: data,
              status: status
            });
          });
      });
    };

    this.resetPassword = function(resetPasswordToken, newPassword) {
      return $q(function(resolve, reject) {
        $http
          .post('/api/auth/reset', {
            resetPasswordToken: resetPasswordToken,
            newPassword: newPassword
          })
          .success(function() {
            resolve();
          })
          .error(function(data, status) {
            reject({
              data: data,
              status: status
            });
          })
      });
    };

    this.validateResetPasswordToken = function(resetPasswordToken) {
      return $q(function(resolve, reject) {
        $http
          .get('/api/auth/validate-password-reset-token/' + resetPasswordToken)
          .success(function() {
            resolve(true);
          })
          .error(function(data, status) {
            resolve(false);
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
        .post('/api/auth/logout');
    };

    function validateLoginData(loginData) {
      return (loginData && loginData.email && loginData.password);
    }
  }
})();
