(function() {

  'use strict';

  angular
    .module('app.booking')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider.state('booking', {
      url: '/booking',
      controller: 'bookingCtrl',
      templateUrl: 'scripts/app/templates/booking/booking.html',
      resolve: {
        bookingData: getTrip,
        userProfile: getUserProfile
      }
    });
  }

  function getTrip($stateParams, bookingApi) {
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

