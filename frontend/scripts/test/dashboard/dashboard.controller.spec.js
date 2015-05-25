'use strict';

describe('dashboardCtrl', function() {
  var $rootScope,
      $scope,
      $controller,
      bookingApi,
      favoriteApi,
      $q,
      mockFavorites;

  beforeEach(function() {
    module('app');
    module('mockdata');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$controller_,
                            _bookingApi_,
                            _favoriteApi_,
                            _$q_,
                            _mockBooking_,
                            _mockFavorites_
                            ) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    bookingApi = _bookingApi_;
    favoriteApi = _favoriteApi_;
    mockFavorites = _mockFavorites_;
    $q = _$q_;

    $scope = $rootScope.$new();

    spyOn(bookingApi, 'getBookedTrips').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve(_mockBooking_);
      return deferred.promise;
    });

    spyOn(favoriteApi, 'getFavoriteList').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve(_mockFavorites_);
      return deferred.promise;
    });

    spyOn($rootScope, '$broadcast').and.callFake(function() {
      return mockFavorites[0];
    });

    $controller('dashboardCtrl', {
      $scope: $scope,
      $rootScope: $rootScope,
      favoriteList: _mockFavorites_,
      bookedTripList: _mockBooking_,
      bookingApi: bookingApi
    });

    $scope.$digest();
  }));

  it('take data after initialize', function() {
    expect($scope.favoriteList.length).toBeGreaterThan(0);
    expect($scope.bookedTripList.length).toBeGreaterThan(0);
  });

  it('send favorite event', function() {
    var favorite = null;
    $scope.selectFavorite(mockFavorites[0]);
    $scope.$digest();
    $scope.$on('selectFavorite', function(e, data) {
      favorite = data;
    });
    $scope.$digest();
    expect(favorite, mockFavorites[0]);

  });
});
