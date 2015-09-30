/// <reference path="../../_all.ts" />

module Booking {

  'use strict';

  export function routeConfig($stateProvider) {
    $stateProvider.state('booking', {
      url: '/booking',
      parent: 'root',
      controller: 'bookingCtrl',
      templateUrl: 'scripts/app/templates/booking/booking.html'
    });
  }

  /**
  * Get booking data from session storage, include: itineraries, previous search params,
  */
  function getBookingData(bookingApi: BookingApi) {
    var bookingData = bookingApi.getBookingData()
    console.log(bookingData);
    return bookingData;
  }

};
