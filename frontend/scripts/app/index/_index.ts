/// <reference path="../../_all.ts" />

module Index {

  'use strict';

  angular
    .module('app.index', [
      'app.common',
      'app.core'
    ])
    .controller('indexCtrl', IndexCtrl)
    .config(routerConfig);
}