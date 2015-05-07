(function() {

  'use strict';

  angular
    .module('app.settings.booking')
    .directive('bookingTable', bookingTable);

  function bookingTable() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/settings/booking-table.html',
      scope: {
        bookingList: '='
      },
      controller: controller
    };

    function controller($scope) {

    }
  }

})();
