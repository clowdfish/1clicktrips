'use strict';

describe('dashboardCtrl', function() {
  var $rootScope,
      $scope,
      $controller,
      bookingService,
      favoriteService,
      $q,
      mockFavorites;

  beforeEach(function() {
    module('app.index');
    module('app.auth');
    module('app.common');
    module('app.dashboard');
    module('app.templates');
    module('mockdata');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$controller_,
                            _bookingService_,
                            _favoriteService_,
                            _$q_,
                            _mockBooking_,
                            _mockFavorites_
                            ) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    bookingService = _bookingService_;
    favoriteService = _favoriteService_;
    mockFavorites = _mockFavorites_;
    $q = _$q_;

    $scope = $rootScope.$new();

    spyOn(bookingService, 'getBookedTrips').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve(_mockBooking_);
      return deferred.promise;
    });

    spyOn(favoriteService, 'getFavoriteList').and.callFake(function() {
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
      bookedTripList: _mockBooking_
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
      console.log(data);
      favorite = data;
    });
    $scope.$digest();
    expect(favorite, mockFavorites[0]);

  });
});
