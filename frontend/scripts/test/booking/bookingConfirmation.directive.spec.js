'use strict';

describe('bookingConfirmation: directive', function() {
  var $q,
      $httpBackend,
      $scope,
      $rootScope,
      tripApi,
      bookingApi,
      itineraries,
      bookingConfirmation,
      bookingConfirmationScope,
      TRIP_TYPE;

  beforeEach(function() {
    module('app');
    module('mockdata');
  });

  beforeEach(inject(function(_$q_,
                      _$httpBackend_,
                      _$rootScope_,
                      _$compile_,
                      _tripApi_,
                      _bookingApi_,
                      _mockItinerary_,
                      _TRIP_TYPE_) {
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    tripApi = _tripApi_;
    bookingApi = _bookingApi_;
    TRIP_TYPE = _TRIP_TYPE_;


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
    $scope.bookingData = {
      trip: itineraries[0],
      payment: {
        cardNumber: null
      },
      user: {},
      isConfirm: false
    };

    bookingApi.requestRealBooking = jasmine.createSpy('requestRealBooking').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    });

    bookingApi.removeShareTripData = jasmine.createSpy('removeShareTripData');

    $scope.paymentStep = jasmine.createSpy('paymentStep');
    $scope.successStep = jasmine.createSpy('successStep');
    var element = angular.element([
      '<booking-confirmation',
        'booking-data="bookingData"',
        'previous-step="paymentStep"',
        'next-step="successStep"',
        'ng-show="step == 3"></booking-confirmation>'
    ].join(' '));

    bookingConfirmation = _$compile_(element)($scope);
    $scope.$digest();
    bookingConfirmationScope = element.isolateScope();

  }));

  it('call request real booking', function() {
    var cloneBookingData = _.cloneDeep(bookingConfirmationScope.bookingData);
    delete cloneBookingData['payment'];
    bookingConfirmationScope.book();
    $scope.$digest();
    expect(bookingApi.requestRealBooking).toHaveBeenCalledWith(cloneBookingData);
    expect(bookingApi.removeShareTripData).toHaveBeenCalled();
    expect($scope.successStep).toHaveBeenCalled();
  });

  it('only show selected segment', function() {
    expect(bookingConfirmationScope.selectedSegments.length).toEqual(0);

    var totalBookedItem = 0;
    _.each(bookingConfirmationScope.bookingData.trip.groupSegment, function(groupSegment) {
      _.each(groupSegment, function(segment) {
        segment['bookable'] = true;
        segment['isBooked'] = true;
        totalBookedItem++;
      });
    });
    $scope.$digest();
    expect(totalBookedItem).toBeGreaterThan(0);
    expect(bookingConfirmationScope.selectedSegments.length).toEqual(totalBookedItem);
  });


});
