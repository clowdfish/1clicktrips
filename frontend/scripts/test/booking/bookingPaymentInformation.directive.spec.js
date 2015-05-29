'use strict';

describe('bookingPaymentInformation: directive', function() {
  var $state,
      $q,
      $httpBackend,
      $scope,
      $state,
      $rootScope,
      tripApi,
      bookingApi,
      itineraries,
      userProfile,
      AUTH_EVENTS,
      TRIP_TYPE,
      session,
      authHelper,
      appConfig,
      bookingPaymentInformation,
      bookingPaymentInformationScope,
      authApi

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
                      _AUTH_EVENTS_,
                      _TRIP_TYPE_,
                      _session_,
                      _authApi_) {
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    tripApi = _tripApi_;
    bookingApi = _bookingApi_;
    AUTH_EVENTS = _AUTH_EVENTS_;
    TRIP_TYPE = _TRIP_TYPE_;
    session = _session_;
    authApi = _authApi_;

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

    $scope.selectionStep = jasmine.createSpy('selectionStep');
    $scope.confirmationStep = jasmine.createSpy('confirmationStep');
    authApi.signup = jasmine.createSpy('signup');

    var element = angular.element([
      '<booking-payment-information',
        'booking-data="bookingData"',
        'previous-step="selectionStep"',
        'next-step="confirmationStep"',
        'ng-show="step == 2"></booking-payment-information>'
    ].join(' '));

    bookingPaymentInformation = _$compile_(element)($scope);
    $scope.$digest();
    bookingPaymentInformationScope = element.isolateScope();

    bookingPaymentInformationScope['account'] = {
      email: null,
      password: null
    };

  }));

  afterEach(function() {
    session.authFailed();
  });

  it('validate data before save', function() {
    bookingPaymentInformationScope.bookingData.payment.cardNumber = '4539765475697132';
    bookingPaymentInformationScope.continue();
    $scope.$digest();
    expect($scope.confirmationStep).not.toHaveBeenCalled();

    bookingPaymentInformationScope.bookingData.payment.cardNumber = '4539765475697132';
    bookingPaymentInformationScope.continue();
    $scope.$digest();
    expect($scope.confirmationStep).toHaveBeenCalled();
  });

  it('test signup function', function() {
    session.authFailed();
    /**
    * Can't signup if email and password is empty
    */
    bookingPaymentInformationScope.account.email = null;
    bookingPaymentInformationScope.account.password = null;
    bookingPaymentInformationScope.bookingData.payment.cardNumber = 4111111111111111;
    bookingPaymentInformationScope.continue();
    expect(authApi.signup).not.toHaveBeenCalled();

    /**
    * Signup when email and password are valid
    */
    bookingPaymentInformationScope.account.email = 'sascha.gros@gmail.com';
    bookingPaymentInformationScope.account.password = '42IsTheAnswerForTheWholeUniversity';
    bookingPaymentInformationScope.continue();
    expect(authApi.signup).toHaveBeenCalled();

    /**
    * Don't call signup method when user is already login
    */
    session.authSuccess('test_token');
    $scope.$digest();
    bookingPaymentInformationScope.continue();
    expect(authApi.signup).toHaveBeenCalled();

  });
});
