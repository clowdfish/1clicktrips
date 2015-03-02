'use strict';

describe('bookingService', function() {
  var bookingService,
      $rootScope,
      $q;

  beforeEach(module('app.common'));
  beforeEach(module('app.dashboard'));

  beforeEach(inject(function(_bookingService_,
                            _$rootScope_,
                            _$q_,
                            _mockBooking_) {
    $rootScope = _$rootScope_;
    bookingService = _bookingService_;
    $q = _$q_;

    spyOn(bookingService, 'callBookingApi').and.callFake(function() {
      return $q(function(resolve) {
        resolve(_mockBooking_);
      });
    });

  }));

  it('get booked trip and return data', function() {
    var bookedTrips = [];
    bookingService
      .getBookedTrips()
      .then(function(data) {
        bookedTrips = data;
      });
    $rootScope.$digest();
    expect(bookedTrips.length).toBeGreaterThan(0);
  });
});
