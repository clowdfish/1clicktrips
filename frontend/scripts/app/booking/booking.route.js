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
    return bookingApi.getShareTripData();
  }

  function getUserProfile(session, userApi) {
    if (session.isLogin()) {
      return userApi.getUserProfile();
    }
    return null;
  }

})();
