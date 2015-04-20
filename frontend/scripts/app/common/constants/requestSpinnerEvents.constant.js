(function() {

  'use strict';

  angular
    .module('app.common')
    .constant('requestSpinnerEvents', {
      show: 'showRequestSpinner',
      hide: 'hideRequestSpinner'
    });

})();
