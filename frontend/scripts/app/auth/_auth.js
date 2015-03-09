(function() {

  'use strict';

  angular
    .module('app.auth', [
      'ui.router'
    ])
   // .config(routerConfig)
    .config(httpConfig)
    .constant('AUTH_EVENTS', {
      loginSuccess: 'Login success',
      loginFailed: 'Login failed',
      signupSuccess: 'Signup successful',
      signupFailed: 'Signup failed',
      invalidToken: 'Invalid token',
      expireToken: 'Expire token'
    });


  function routerConfig($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'scripts/app/templates/auth/login.html',
      controller: 'loginCtrl'
    });
  }

  function httpConfig($httpProvider) {
    $httpProvider.interceptors.push('tokenInjector');
  }

})();
