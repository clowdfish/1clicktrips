'use strict';

describe('service: authApi', function() {
  var $scope,
      $rootScope,
      authApi,
      $httpBackend,
      signupHandler,
      loginHandler,
      forgotHandler,
      logoutHandler,
      loginData,
      signupData,
      session;

  beforeEach(function() {
    module('app.auth');
    module('app.index');
    module('app.templates');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$httpBackend_,
                            _authApi_,
                            _session_) {
    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    authApi = _authApi_;
    session = _session_;

    signupHandler = $httpBackend.whenPOST(/\/api\/auth\/register/).respond(200, 'success');
    loginHandler = $httpBackend.whenPOST(/\/api\/auth\/local/).respond(200, 'success');
    forgotHandler = $httpBackend.whenPOST(/\/api\/auth\/forgot/).respond(200, 'success');
    logoutHandler = $httpBackend.whenPOST(/\/api\/auth\/logout/).respond(200, 'success');
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
    authApi
      .login(loginData)
      .then(function() {
        success = true;
      }, function() {
        success = false;
      });
    $scope.$digest();
    $httpBackend.flush();
    expect(success).toEqual(true);
    expect(session.isLogin()).toEqual(true);
  });

  it('test login failed', function() {
    var success;
    loginHandler.respond(401, 'failed');
    authApi
      .login(loginData)
      .then(function() {
        success = true;
      }, function() {
        success = false;
      });
    $scope.$digest();
    $httpBackend.flush();
    expect(success).toEqual(false);
    expect(session.isLogin()).toEqual(false);
  });

  it('test signup success', function() {
    signupHandler.respond(200, {
      token: 'test_token'
    });
    var success;
    authApi
      .signup(signupData)
      .then(function() {
        success = true;
      }, function() {
        success = false;
      });
    $scope.$digest();
    $httpBackend.flush();
    expect(success).toEqual(true);
    expect(session.isLogin()).toEqual(true);
  });

  it('test signup failed', function() {
    var success;
    signupHandler.respond(401, 'failed');
    authApi
      .signup(signupData)
      .then(function() {
        success = true;
      }, function() {
        success = false;
      });
    $scope.$digest();
    $httpBackend.flush();
    expect(success).toEqual(false);
    expect(session.isLogin()).toEqual(false);
  });

  it('test logout', function() {
    loginHandler.respond(200, {
      token: 'test_token'
    });
    var success;
    authApi
      .login(loginData)
      .then(function() {
        success = true;
      }, function() {
        success = false;
      });
    $scope.$digest();
    $httpBackend.flush();
    expect(session.isLogin()).toEqual(true);
    authApi.logout();
    $scope.$digest();
    $httpBackend.flush();
    expect(session.isLogin()).toEqual(false);
  });

  it('test forgot password', function() {
    forgotHandler.respond(200, 'OK');
    authApi
      .forgotPassword('example@gmail.com')
  })
});
