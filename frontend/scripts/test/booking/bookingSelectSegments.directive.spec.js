'use strict';

describe('bookingSelectSegments:directive', function () {
  var $httpBackend,
      $scope,
      $rootScope,
      $q,
      $state,
      tripApi,
      bookingApi,
      itineraries,
      userProfile,
      AUTH_EVENTS,
      TRIP_TYPE,
      session,
      authHelper,
      bookingSelectSegments,
      bookingSelectSegmentsScope,
      appConfig;

  beforeEach(function() {
    module('app');
    module('mockdata');
  });

  beforeEach(inject(function(_$httpBackend_,
                            _$q_,
                            _$rootScope_,
                            _$compile_,
                            _tripApi_,
                            _bookingApi_,
                            _mockItinerary_,
                            _mockUserProfile_,
                            _TRIP_TYPE_,
                            _AUTH_EVENTS_,
                            _appConfig_,
                            _session_,
                            _authHelper_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    tripApi = _tripApi_;
    bookingApi = _bookingApi_;
    userProfile = _mockUserProfile_;
    TRIP_TYPE = _TRIP_TYPE_;
    AUTH_EVENTS = _AUTH_EVENTS_;
    session = _session_;
    authHelper = _authHelper_;
    appConfig = _appConfig_;
    $httpBackend.whenPOST(/\/api\/search\/trips/).respond(_mockItinerary_);
    $httpBackend.whenPOST(/\/api\/booking/).respond(200, 'OK');
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
    $scope.bookingData = {
      trip: itineraries[0],
      payment: {},
      user: {},
      isConfirm: false
    };

    $scope.bookingFee = 0;
    $scope.bookingPrice = 0;
    $scope.totalBookingPrice = 0;
    $scope.mapView = jasmine.createSpy('mapView');
    $scope.paymentStep = jasmine.createSpy('paymentStep');
    $scope.step = 1;
    var element = angular.element(['<booking-select-segments',
                                      'booking-data="bookingData"',
                                      'next-step="paymentStep"',
                                      'previous-step="mapView"',
                                      'total-booking-price="totalBookingPrice"',
                                      'booking-fee="bookingFee"',
                                      'booking-price="bookingPrice"',
                                      'ng-show="step == 1">',
                                    '</booking-select-segments>'].join(' '));
    bookingSelectSegments = _$compile_(element)($scope);
    $scope.$digest();
    bookingSelectSegmentsScope = element.isolateScope();
  }));

  afterEach(function() {
    session.authFailed();
  });

  it('calculate booking fee correctly', function() {
    setIsBooked(false);
    bookingSelectSegmentsScope.$digest();
    expect(bookingSelectSegmentsScope.totalBookingPrice).toEqual(0);
    expect(bookingSelectSegmentsScope.bookable).toEqual(false);

    appConfig.bookingRate = 0;
    setIsBooked(true);
    bookingSelectSegmentsScope.$digest();
    expect(bookingSelectSegmentsScope.bookingPrice).toEqual(270);
    expect(bookingSelectSegmentsScope.bookingFee).toEqual(0);
    expect(bookingSelectSegmentsScope.totalBookingPrice).toEqual(270);

    expect(bookingSelectSegmentsScope.bookable).toEqual(true);

    appConfig.bookingRate = 5;
    setIsBooked(true);
    bookingSelectSegmentsScope.$digest();
    expect(bookingSelectSegmentsScope.bookingPrice).toEqual(270);
    expect(bookingSelectSegmentsScope.bookingFee).toEqual(13.5);
    expect(bookingSelectSegmentsScope.totalBookingPrice).toEqual(283.5);
    expect(bookingSelectSegmentsScope.bookable).toEqual(true);
  });

  it('test navigation', function() {
    setIsBooked(false);
    bookingSelectSegmentsScope.$digest();
    bookingSelectSegmentsScope.continue();
    expect($scope.paymentStep).not.toHaveBeenCalled();

    bookingSelectSegmentsScope.previousStep();
    expect($scope.mapView).toHaveBeenCalled();
  });

  xit('it show login dialog when save booking', function() {
    bookingApi.storeBooking = jasmine.createSpy('storeBooking').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    });
    authHelper.openLoginDialog = jasmine.createSpy('openLoginDialog').and.callThrough();

    session.authFailed();
    setIsBooked(true);
    bookingSelectSegmentsScope.$digest();
    bookingSelectSegmentsScope.save();
    expect(bookingApi.storeBooking).not.toHaveBeenCalled();
    expect(authHelper.openLoginDialog).toHaveBeenCalled();
    session.authSuccess('test_token');
    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    $scope.$digest();
    expect(bookingApi.storeBooking).toHaveBeenCalled();

    session.authSuccess('test_token');
    setIsBooked(true);
    bookingSelectSegmentsScope.$digest();
    bookingSelectSegmentsScope.save();
    expect(bookingApi.storeBooking).toHaveBeenCalled();

  });

  function setIsBooked(isBooked) {
    _.each(bookingSelectSegmentsScope.bookingData.trip.groupSegment, function(groupSegment) {
      _.each(groupSegment, function(segment) {
        segment['isBooked'] = isBooked;
      });
    });
    bookingSelectSegmentsScope.handleBookableChange();
  }

});
