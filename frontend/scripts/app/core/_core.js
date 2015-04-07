/**
 * This module declares all third-party dependencies
 */
(function() {

  'use strict';

  angular
    .module('app.core', [
      'ui.router',
      'ngAnimate',
      'pascalprecht.translate',
      'ngStorage',
      'ui.bootstrap',
      'ui.bootstrap.tpls',
      'ngSanitize',
      'angularFileUpload',
      'ui.sortable'
    ]);
})();

