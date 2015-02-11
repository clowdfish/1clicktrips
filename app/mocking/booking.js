// mocking/booking.js
var Promise = require('es6-promise').Promise;

module.exports = {

  getBookings: function(userId, limit) {

    return new Promise(function(resolve, reject) {

      var bookingOne = createBookingMock();
      var bookingTwo = createBookingMock();
      var bookingThree = createBookingMock();

      if(userId > 0) {
        resolve([
          bookingOne,
          bookingTwo,
          bookingThree
        ]);
      }
      else {
        reject(new Error('Could not retrieve user profile.'));
      }
    });
  },

  setBooking: function(userId, bookingObject) {

    console.log('Booking Details: '); // DEBUG
    console.log(bookingObject); // DEBUG

    return new Promise(function(resolve, reject) {

      if(userId > 0)
        resolve();
      else
        reject(new Error('There was an error.'));
    });
  },

  getById: function(bookingId) {

    return new Promise(function(resolve, reject) {

      if(bookingId > 0)
        resolve(createBookingMock());
      else
        resolve(null);
    });
  }
};

// ==========================================================================
// MOCKING OBJECT CREATORS ==================================================
// ==========================================================================

function createBookingMock() {
  return {
    id: bookingId,
    title: "3rd Phoenix World IT Conference",
    destination: "Double Tree by Hilton Metropolitan, New York, USA",
    tags: [
      "test", "another", "bla"
    ],
    startDate: "2015-02-09T02:54:51+00:0",
    endDate: "2015-02-10T02:54:51+00:0",
    reference: "http://imaginative.url",
    hotel: {
      name: "Awesome Hotel",
      checkIn: "2015-02-10T02:54:51+00:0",
      url: "http://imaginative.url",
      image: "http://imaginative.url"
    },
    participants: [
      {
        firstName: "Eric",
        lastName: "Conan",
        email: "eric@conan.com",
        booked: true,
        arrivalTime: "2015-02-09T02:54:51+00:0",
        image: 'http://imaginative.url',
        profile: "http://somewhere.com"
      },
      {
        firstName: "Jenny",
        lastName: "Kandone",
        email: "jenny@kandone.com",
        booked: true,
        arrivalTime: "2015-02-09T02:54:51+00:0",
        image: 'http://imaginative.url',
        profile: "http://somewhere.com"
      },
      {
        firstName: "Alvin",
        lastName: "Cooke",
        email: "alvin@cooke.com",
        booked: false,
        arrivalTime: "2015-02-09T02:54:51+00:0",
        image: 'http://imaginative.url',
        profile: "http://somewhere.com"
      }
    ]
  }
}