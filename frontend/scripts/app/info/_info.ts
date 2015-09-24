/// <reference path="../../_all.ts" />
module Info {

  'use strict';

  angular
    .module('app.info', [
      'app.core',
      'app.common'
    ])
    .controller('infoCtrl', InfoCtrl)
    .config(routerConfig);
}
