(function() {

  'use strict';

  angular
    .module('app.settings', [
      'app.core'
    ])
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider.state('settings', {
      url:'/settings',
      templateUrl: 'scripts/app/templates/settings/settings.html'
    });
  }

})();
