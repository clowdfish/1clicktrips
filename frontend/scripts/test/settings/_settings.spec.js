'use strict';

describe('module: settings', function() {

  var $scope,
      $state,
      $location,
      $httpBackend,
      session;

  beforeEach(function() {
    module('app');
    module('mockdata');
  });

  beforeEach(inject(function(_$rootScope_,
                      _$state_,
                      _$location_,
                      _$httpBackend_,
                      _session_,
                      _mockBooking_,
                      _mockFavorites_,
                      _mockCountryList_,
                      _mockUserProfile_) {
    $state = _$state_;
    $scope = _$rootScope_;
    $location = _$location_;
    $httpBackend = _$httpBackend_;
    session = _session_;
    session.authSuccess('test_token');

    $httpBackend.whenGET(/\/api\/account\/profile/).respond(_mockUserProfile_);
    $httpBackend.whenGET(/\/api\/account\/settings/).respond([]);
    $httpBackend.whenGET(/\/api\/countries/).respond(_mockCountryList_);
    $httpBackend.whenGET(/\/api\/bookings/).respond(_mockBooking_);
    $httpBackend.whenGET(/\/api\/account\/favorites/).respond(_mockFavorites_);
  }));

  afterEach(function() {
    session.authFailed();
  });

  it('profile state', function() {
    $location.path('/settings/profile');
    $scope.$digest();
    $httpBackend.flush();
    expect($state.current.name).toEqual('settings.profile');
  });

  it('preference state', function() {
    $location.path('/settings/preferences');
    $scope.$digest();
    $httpBackend.flush();
    expect($state.current.name).toEqual('settings.preferences');
  });

 it('booking history', function() {
  $location.path('/settings/booking/list');
  $scope.$digest();
  $httpBackend.flush();
  expect($state.current.name).toEqual('settings.booking.list');
 });

 it('favorite history', function() {
  $location.path('/settings/favorite');
  $scope.$digest();
  $httpBackend.flush();
  expect($state.current.name).toEqual('settings.favorite');
 });

});
