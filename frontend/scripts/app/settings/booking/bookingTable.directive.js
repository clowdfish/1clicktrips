(function() {

  'use strict';

  angular
    .module('app.settings.booking')
    .directive('bookingTable', bookingTable);

  function bookingTable(bookingApi) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/settings/booking-table.html',
      scope: {
        bookingList: '='
      },
      link: link
    };

    function link(scope, element, attrs) {

    }
  }

})();
