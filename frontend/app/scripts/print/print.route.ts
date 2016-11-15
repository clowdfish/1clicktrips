/// <reference path="../_all.ts" />

module Print {

  'use strict';

  export function routeConfig($stateProvider) {
    $stateProvider.state('print', {
      url: '/print',
      parent: 'root',
      controller: 'printCtrl',
      templateUrl: 'app/templates/print/print.html'
    });
  }

}
