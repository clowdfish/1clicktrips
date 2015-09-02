(function() {

  'use strict';

  angular
    .module('app.info')
    .config(routerConfig);

  function routerConfig($stateProvider) {

    $stateProvider.state('info', {
      url: '/info',
      abstract: true,
      parent: 'root',
      template: '<div ui-view></div>'
    });

    $stateProvider.state('info.about', {
      url: '/about',
      templateUrl: 'scripts/app/templates/info/about.html',
      controller: 'infoCtrl'
    });

    $stateProvider.state('info.contact', {
      url: '/contact',
      templateUrl: 'scripts/app/templates/info/contact.html',
      controller: 'infoCtrl'
    });
  }
})();
