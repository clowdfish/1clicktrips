(function() {

  'use strict';

  angular
    .module('app.settings', [
      'ui.router'
    ])
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider.state('settings', {
      url:'/settings',
      templateUrl: 'scripts/app/templates/settings/settings.html'
    });
  }

})();