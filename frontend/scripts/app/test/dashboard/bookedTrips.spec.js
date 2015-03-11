(function() {
  'use strict';

  describe('bookedTrips', function() {

    var $q,
        $scope,
        bookingService,
        bookedTrips,
        bookedTripsScope,
        mockBooking;

    beforeEach(module('app.common'));
    beforeEach(module('app.dashboard'));
    beforeEach(module('app-templates'));

    beforeEach(inject(function(_$q_,
                              _$rootScope_,
                              _bookingService_,
                              _mockBooking_,
                              _$compile_) {
      $q = _$q_;
      $scope = _$rootScope_.$new();
      bookingService = _bookingService_;
      mockBooking = _mockBooking_;

      spyOn(bookingService, 'callBookingApi').and.callFake(function() {
        return $q(function(resolve) {
          resolve(mockBooking);
        });
      });

      var bookedTripList = null;
      bookingService
        .getBookedTrips()
        .then(function(data) {
          bookedTripList = data;
        });
      $scope.$digest();
      $scope.bookedTripList = bookedTripList;
      var element = angular.element("<booked-trips list-items='bookedTripList' item-per-page='2'></booked-trips>");
      bookedTrips = _$compile_(element)($scope);
      $scope.$digest();
      bookedTripsScope = element.isolateScope();
    }));

    it('bookedTrips has valid scope data', function() {
      expect(bookedTripsScope.listItems.length).toBeGreaterThan(0);
      expect(bookedTripsScope.itemPerPage).toEqual(2);
    });

    xit('directive changes page as expected', function() {
      expect(bookedTripsScope.currentPage).toEqual(1);
      bookedTripsScope.changePage(2);
      expect(bookedTripsScope.currentPage).toEqual(2);
      bookedTripsScope.changePage(3);
      expect(bookedTripsScope.currentPage).toEqual(2);
    });
  });

})();
