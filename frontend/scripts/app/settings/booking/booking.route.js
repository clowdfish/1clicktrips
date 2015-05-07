(function() {

  'use strict';

  angular
    .module('app.settings.booking')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider.state('settings.booking', {
      url: '/booking',
      templateUrl: 'scripts/app/templates/settings/booking/booking-table.html',
      controller: 'bookingCtrl',
      resolve: {
        bookingList: getBookingList
      }
    });

    $stateProvider.state('settings.bookingDetail', {
      url: '/booking/:id',
      templateUrl: 'scripts/app/templates/settings/booking/booking-detail.html',
      controller: 'bookingDetailCtrl',
      resolve: {
        booking: getBookingById
      }
    })
  };

  function getBookingList(session, bookingApi) {
    if (!session.isLogin()) {
      return [];
    }
    return bookingApi.getBookedTrips();
  }

  function getBookingById(session, bookingApi, $stateParams) {
    if (!session.isLogin()) {
      return null;
    }
    return bookingApi.getBookingById($stateParams.id);
  }

})();
