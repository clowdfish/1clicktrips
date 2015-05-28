'use strict';

describe('booking:route', function() {
  var $state,
      $q,
      $httpBackend,
      $scope,
      $state,
      tripApi,
      bookingApi,
      itineraries,
      userProfile,
      AUTH_EVENTS,
      TRIP_TYPE;

  beforeEach(function() {
    module('app');
    module('mockdata');
  });

  beforeEach(inject(function(_$state_,
                            _$q_,
                            _$httpBackend_,
                            _$rootScope_,
                            _$controller_,
                            _tripApi_,
                            _bookingApi_,
                            _mockItinerary_,
                            _mockUserProfile_,
                            _TRIP_TYPE_,
                            _AUTH_EVENTS_,
                            _appConfig_) {
    $scope = _$rootScope_.$new();
    $q = _$q_;
    $state = _$state_;
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    tripApi = _tripApi_;
    bookingApi = _bookingApi_;
    userProfile = _mockUserProfile_;
    TRIP_TYPE = _TRIP_TYPE_;
    AUTH_EVENTS = _AUTH_EVENTS_;

    $httpBackend.whenPOST(/\/api\/search\/trips/).respond(_mockItinerary_);

    var searchParams = {};
    var additionData = {
      startDate: new Date(),
      endDate: new Date(),
      origin: 'Ha Noi',
      destination: 'Ho Chi Minh'
    };

    tripApi
      .findItinerary(searchParams, additionData)
      .then(function(data) {
        itineraries = data;
      });

    $scope.$digest();
    $httpBackend.flush();

    bookingApi.setShareTripData(itineraries, _TRIP_TYPE_.lowBudget, searchParams);

    _$controller_('bookingCtrl', {
      $scope: $scope,
      bookingData: bookingApi.getShareTripData(),
      $state: $state,
      $anchorScroll: {},
      userProfile: userProfile,
      AUTH_EVENTS: AUTH_EVENTS,
      appConfig: _appConfig_
    });

  }));

  it('load bookingData from controller correctly', function() {
    expect($scope.step).toEqual(1);
    expect($scope.bookingData.user).toEqual(userProfile);
    expect($scope.bookingData.trip.type).toEqual(TRIP_TYPE.lowBudget);
  });

  it('back to booking page correctly', function() {
    $scope.mapView();
    $scope.$digest();
    expect($state.current.name).toEqual('search_result');
  });

});
