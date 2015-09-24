/// <reference path="../../_all.ts" />

module Index {

  'use strict';

  angular
    .module('app.index', [
      'app.common',
      'app.core'
    ])
    .constant('INDEX_STATE', {
      form: 0,
      file: 1
    })
    //.controller('indexCtrl', IndexCtrl)
    .config(routerConfig);
}