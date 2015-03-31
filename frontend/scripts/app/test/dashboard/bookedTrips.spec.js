(function() {
  'use strict';

  describe('bookedTrips', function() {

    var $q,
        $scope,
        $httpBackend,
        bookingService,
        bookedTrips,
        bookedTripsScope,
        mockBooking;

    beforeEach(module('app.common'));
    beforeEach(module('app.dashboard'));
    beforeEach(module('app.templates'));

    beforeEach(inject(function(_$q_,
                              _$rootScope_,
                              _bookingService_,
                              _mockBooking_,
                              _$compile_,
                              _$httpBackend_) {
      $q = _$q_;
      $scope = _$rootScope_.$new();
      bookingService = _bookingService_;
      mockBooking = _mockBooking_;

      $httpBackend = _$httpBackend_;
      $httpBackend.whenGET(/\/api\/account\/bookings/).respond(_mockBooking_);

      var bookedTripList = null;
      bookingService
        .getBookedTrips()
        .then(function(data) {
          bookedTripList = data;
        });
      $scope.$digest();
      $httpBackend.flush();
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
