(function() {

  'use strict';

  angular
    .module('app.auth', [
      'app.core',
      'ui.bootstrap',
      'ui.bootstrap.tpls'
    ])
    .config(httpConfig)
    .config(routerConfig)
    .constant('AUTH_EVENTS', {
      loginSuccess: 'Login success',
      loginFailed: 'Login failed',
      signupSuccess: 'Signup successful',
      signupFailed: 'Signup failed',
      invalidToken: 'Invalid token',
      expireToken: 'Expire token',
      logout: 'Logout'
    })
    .run(run);


  function httpConfig($httpProvider) {
    //Inject x-auth-token header into request if token available;
    $httpProvider.interceptors.push('httpInterceptor');

    //Stop certains request if user is not authenticated
    $httpProvider.interceptors.push('requestChecker');
  }

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

  function isValidToken(authService, resetPasswordToken) {
    return authService.validateResetPasswordToken(resetPasswordToken);
  }


  function run($rootScope, session, authService, AUTH_EVENTS) {
    //set isLogin when app start
    $rootScope.isLogin = session.isLogin();

    //Listen to signup and signin event to change isLogin
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
      $rootScope.isLogin = true;
    });

    $rootScope.$on(AUTH_EVENTS.signupSuccess, function() {
      $rootScope.isLogin = true;
    });

    $rootScope.$on(AUTH_EVENTS.logout, function() {
      $rootScope.isLogin = false;
    });

    $rootScope.$on(AUTH_EVENTS.invalidToken, function() {
      authService.logout();
    });
  }

})();
