'use strict';

describe('authHelper: service', function() {
  var $q,
      $state,
      $rootScope,
      $httpBackend,
      authHelper,
      session,
      AUTH_EVENTS;

  beforeEach(function() {
    module('app');
    module('mockdata');
  });

  beforeEach(inject(function(_$q_,
                            _$state_,
                            _$rootScope_,
                            _$httpBackend_,
                            _authHelper_,
                            _session_,
                            _AUTH_EVENTS_) {
    $q = _$q_;
    $state = _$state_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    authHelper = _authHelper_;
    session = _session_;
    AUTH_EVENTS = _AUTH_EVENTS_;
    var $modal = {
      open: jasmine.createSpy('$modal.open')
    };
    $httpBackend.whenGET(/\/api\/account\/profile/).respond(200, {
      test_profile: 1
    });
    $httpBackend.whenGET(/\/api\/countries/).respond(200, []);
    $httpBackend.whenGET(/\/api\/account\/favorites/).respond(200, []);
    $httpBackend.whenGET(/\/api\/bookings/).respond(200, []);
  }));

  afterEach(function() {
    session.authFailed();
  });

  it('get/set redirect state correctly', function() {
    var stateData = {
      isTempData: true
    }
    authHelper.openLoginDialog('mystate', stateData);
    $rootScope.$digest();
    expect(authHelper.getRedirectState()).toEqual({
      state: 'mystate',
      data: stateData
    });

    authHelper.openLoginDialog(null);
    $rootScope.$digest();
    expect(authHelper.getRedirectState()).toEqual(null);

    authHelper.openSignupDialog('mystate', stateData);
    $rootScope.$digest();
    expect(authHelper.getRedirectState()).toEqual({
      state: 'mystate',
      data: stateData
    });

  });

  it('redirect after auth success', function() {
    authHelper.openLoginDialog('index');
    session.authSuccess('test_token');
    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    $rootScope.$digest();
    $httpBackend.flush();
    expect($state.current.name).toEqual('index');
  });

});
