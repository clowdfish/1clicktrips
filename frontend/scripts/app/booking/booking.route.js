(function() {

  'use strict';

  angular
    .module('app.booking')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider.state('booking', {
      url: '/booking',
      parent: 'root',
      controller: 'bookingCtrl',
      templateUrl: 'scripts/app/templates/booking/booking.html',
      resolve: {
        bookingData: getBookingData,
        userProfile: getUserProfile
      }
    });
  }

  /**
  * Get booking data from session storage, include: itineraries, previous search params,
  */
  function getBookingData($stateParams, bookingApi) {
    var bookingData = bookingApi.getShareTripData();
    if (bookingData === null) return null;
    return bookingData;
  }

  function getUserProfile(session, userApi) {
    if (session.isLogin()) {
      return userApi.getUserProfile();
    }
    return null;
  }

})();

