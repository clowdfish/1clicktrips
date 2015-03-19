(function() {

  'use strict';

  angular
    .module('app.auth', [
      'app.core',
      'ui.bootstrap',
      'ui.bootstrap.tpls'
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
    //Inject x-auth-token header into request if token available;
    $httpProvider.interceptors.push('tokenInjector');

    //Stop certains request if user is not authenticated
    $httpProvider.interceptors.push('requestChecker');
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
