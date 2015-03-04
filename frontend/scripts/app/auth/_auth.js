(function() {

  'use strict';

  angular
    .module('app.auth', [
      'ui.router'
    ])
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'scripts/app/templates/auth/login.html',
      controller: 'loginCtrl'
    });
  }

})();
