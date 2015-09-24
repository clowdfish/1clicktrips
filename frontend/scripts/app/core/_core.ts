/// <reference path="../../_all.ts" />
module Core {

  'use strict';

	angular
    .module('app.core', [
      'ui.router',
      'ngStorage',
      'ui.bootstrap',
      'ngSanitize',
      'ui.sortable'
    ]);
}
