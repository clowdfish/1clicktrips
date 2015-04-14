(function() {
  'use strict';

  xdescribe('bookingService', function() {
    var bookingService,
        $rootScope,
        $q,
        bookedTripList,
        mockBooking;

    beforeEach(function() {
      module('app.common');
      module('app.dashboard');
      module('app.templates');
      module('mockdata');
    });

    beforeEach(inject(function(_bookingService_,
                              _$rootScope_,
                              _$q_,
                              _mockBooking_) {
      $rootScope = _$rootScope_;
      bookingService = _bookingService_;
      mockBooking = _mockBooking_.slice(0);
      $q = _$q_;
      spyOn(bookingService, 'callBookingApi').and.callFake(function() {
        return $q(function(resolve) {
          resolve(mockBooking);
        });
      });

      bookingService
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
