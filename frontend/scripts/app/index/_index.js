(function() {

  'use strict';

  angular
    .module('app.index', [
      'app.common',
      'app.core'
    ])
    .constant('INDEX_STATE', {
      form: 0,
      file: 1
    });
})();