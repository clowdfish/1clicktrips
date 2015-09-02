(function() {

  'use strict';

  angular
    .module('app.index')
    .config(routerConfig);

  function routerConfig($stateProvider) {

    $stateProvider.state('index', {
      abstract: true,
      parent: 'root',
      templateUrl: 'scripts/app/templates/index/index.html'
    });

    $stateProvider.state('index.form', {
      url: 'search',
      template: '<div></div>',
      controller: 'indexCtrl',
      resolve: {

      }
    });

    $stateProvider.state('index.file', {
      url: '/',
      template: '<div class="index-dropzone"><dropzone></dropzone></div>',
      controller: 'indexCtrl',
      resolve: {

      }
    });
  }
})();
