'use strict';

describe('service: authService', function() {
  var $scope,
      $rootScope,
      authService,
      $httpBackend,
      signupHandler,
      loginHandler,
      loginData,
      signupData,
      session;

  beforeEach(function() {
    module('app.auth');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$httpBackend_,
                            _authService_,
                            _session_) {
    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    authService = _authService_;
    session = _session_;

    signupHandler = $httpBackend.whenPOST(/\/api\/auth\/register/).respond(200, 'success');
    loginHandler = $httpBackend.whenPOST(/\/api\/auth\/local/).respond(200, 'success');

    signupData = {
      email: 'david@gmail.com',
      password: '123'
    }

    loginData = {
      email: 'jane@gmail.com',
      password: '123'
    }

    session.removeAuthToken();
  }));

  afterEach(function() {
    session.removeAuthToken();
  });

  it('test login success', function() {
    var success;
    loginHandler.respond(200, {
      token: 'test_token'
    });
    authService
      .login(loginData)
      .then(function() {
        success = true;
      }, function() {
        success = false;
      });
    $scope.$digest();
    $httpBackend.flush();
    expect(success).toEqual(true);
    expect(authService.isLogin()).toEqual(true);
  });

  it('test login failed', function() {
    var success;
    loginHandler.respond(401, 'failed');
    authService
      .login(loginData)
      .then(function() {
        success = true;
      }, function() {
        success = false;
      });
    $scope.$digest();
    $httpBackend.flush();
    expect(success).toEqual(false);
    expect(authService.isLogin()).toEqual(false);
  });

  it('test signup success', function() {
    signupHandler.respond(200, {
      token: 'test_token'
    });
    var success;
    authService
      .signup(signupData)
      .then(function() {
        success = true;
      }, function() {
        success = false;
      });
    $scope.$digest();
    $httpBackend.flush();
    expect(success).toEqual(true);
    expect(authService.isLogin()).toEqual(true);
  });

  it('test signup failed', function() {
    var success;
    signupHandler.respond(401, 'failed');
    authService
      .signup(signupData)
      .then(function() {
        success = true;
      }, function() {
        success = false;
      });
    $scope.$digest();
    $httpBackend.flush();
    expect(success).toEqual(false);
    expect(authService.isLogin()).toEqual(false);
  });

  it('test logout', function() {
    loginHandler.respond(200, {
      token: 'test_token'
    });
    var success;
    authService
      .login(loginData)
      .then(function() {
        success = true;
      }, function() {
        success = false;
      });
    $scope.$digest();
    $httpBackend.flush();
    expect(authService.isLogin()).toEqual(true);
    authService.logout();
    expect(authService.isLogin()).toEqual(false);
  });
});
