'use strict';

describe('dashboardCtrl', function() {
  var $rootScope,
      $scope,
      $controller,
      bookingService,
      favoriteService,
      $q;
  beforeEach(module('app.dashboard'));
  beforeEach(inject(function(_$rootScope_,
                            _$controller_,
                            _bookingService_,
                            _favoriteService_,
                            _$q_,
                            _mockBooking_,
                            _mockFavorites_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    bookingService = _bookingService_;
    favoriteService = _favoriteService_;
    $q = _$q_;

    $scope = $rootScope.$new();

    spyOn(bookingService, 'getBookedTrips').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve(_mockBooking_);
      return deferred.promise;
    });

    spyOn(favoriteService, 'getFarvoriteList').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve(_mockFavorites_);
      return deferred.promise;
    });

    $controller('dashboardCtrl', {
      $scope: $scope,
      favoriteService: favoriteService,
      bookingService: bookingService
    });

    $scope.$digest();
  }));

  it('take data after initialize', function() {
    expect($scope.favoriteList.length).toBeGreaterThan(0);
    expect($scope.bookedTripList.length).toBeGreaterThan(0);
  });
});