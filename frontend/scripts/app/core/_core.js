/**
 * This module declares all third-party dependencies
 */
(function() {

  'use strict';

  angular
    .module('app.core', [
      'ui.router',
      'ngStorage',
      'ui.bootstrap',
      'ngSanitize',
      'ui.sortable'
    ]);
})();

