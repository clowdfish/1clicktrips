(function() {
  'use strict';

  xdescribe('bookingApi', function() {
    var bookingApi,
        $rootScope,
        $q,
        bookedTripList,
        mockBooking;

    beforeEach(function() {
      module('app');
      module('mockdata');
    });

    beforeEach(inject(function(_bookingApi_,
                              _$rootScope_,
                              _$q_,
                              _mockBooking_) {
      $rootScope = _$rootScope_;
      bookingApi = _bookingApi_;
      mockBooking = _mockBooking_.slice(0);
      $q = _$q_;
      spyOn(bookingApi, 'callBookingApi').and.callFake(function() {
        return $q(function(resolve) {
          resolve(mockBooking);
        });
      });

      bookingApi
        .getBookedTrips()
        .then(function(data) {
          bookedTripList = data;
        });

      $rootScope.$digest();
    }));

    it('get booked trip and return data', function() {
      expect(bookedTripList.length).toBeGreaterThan(0);
    });
  });

})();
