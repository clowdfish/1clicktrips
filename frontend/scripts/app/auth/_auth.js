(function() {

  'use strict';

  angular
    .module('app.auth', [
      'ui.router'
    ])
    .config(httpConfig)
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
    $httpProvider.interceptors.push('tokenInjector');
  }

  function run($rootScope, session, AUTH_EVENTS) {
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
  }

})();
