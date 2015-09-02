(function() {

  'use strict';

  angular
    .module('app.index', [
      'app.core'
    ])
    .constant('INDEX_STATE', {
      form: 0,
      file: 1
    })
    .config(config);

  function config() { }
})();