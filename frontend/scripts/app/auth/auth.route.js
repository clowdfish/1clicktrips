(function() {

  'use strict';

  angular
    .module('app.auth')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider.state('forgotPassword', {
      url: '/forgot-password',
      templateUrl: 'scripts/app/templates/auth/forgot-password.html',
      controller: 'forgotPasswordCtrl'
    });

    $stateProvider.state('resetPassword', {
      url: '/reset-password/:resetPasswordToken',
      templateUrl: 'scripts/app/templates/auth/reset-password.html',
      controller: 'resetPasswordCtrl',
      resolve: {
        resetPasswordToken: function($stateParams) {
          return $stateParams.resetPasswordToken;
        },
        isValidToken: isValidToken
      }
    });
  }

  function isValidToken(authApi, resetPasswordToken) {
    return authApi.validateResetPasswordToken(resetPasswordToken);
  }

})();
