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

    spyOn(bookingService, 'getBookedTrips').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve(_mockBooking_);
      return deferred.promise;
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
