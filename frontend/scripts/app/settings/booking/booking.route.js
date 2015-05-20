(function() {

  'use strict';

  angular
    .module('app.settings.booking')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider.state('settings.booking', {
      url: '/booking',
      abstract: true,
      templateUrl: 'scripts/app/templates/settings/booking/booking.html'
    });

    $stateProvider.state('settings.booking.list', {
      url: '/list',
      templateUrl: 'scripts/app/templates/settings/booking/booking-list.html',
      controller: 'bookingListCtrl',
      resolve: {
        bookingList: getBookingList
      }
    });

    $stateProvider.state('settings.booking.detail', {
      url: '/:id',
      templateUrl: 'scripts/app/templates/settings/booking/booking-detail.html',
      controller: 'bookingDetailCtrl',
      resolve: {
        booking: getBookingById
      }
    });
  }

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
