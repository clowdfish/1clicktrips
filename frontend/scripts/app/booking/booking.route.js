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
    return resetBookingData(bookingData);
  }

  function getUserProfile(session, userApi) {
    if (session.isLogin()) {
      return userApi.getUserProfile();
    }
    return null;
  }

  /**
  * Remove booking data and some user data from session
  */
  function resetBookingData(bookingData) {
    _.each(bookingData.trip.groupSegment, function(groupSegment) {
      _.each(groupSegment, function(segment) {
        segment['isBooked'] = false;
      });
    });
    return bookingData;
  }

})();
