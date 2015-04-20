'use strict';

describe('factory: tokenInjector', function() {
  var $httpBackend,
      $rootScope,
      $http,
      httpHandler,
      session,
      auth;

  beforeEach(module('app.auth'));

  beforeEach(inject(function(_$httpBackend_,
                              _$rootScope_,
                              _$http_,
                              _session_,
                              _auth_) {
    $http = _$http_;
    $httpBackend = _$httpBackend_;
    session = _session_;
    $rootScope = _$rootScope_;
    auth = _auth_;
    httpHandler = $httpBackend.whenGET('/api/sample_request').respond(200, 'success');
  }));

  afterEach(function() {
    session.removeAuthToken();
  });

  xit('has token in http', function() {
    session.authSuccess("tokenInjector");
    var httpHeaders = null;
    var httpStatus
    $http
      .get('/api/sample_request')
      .success(function(data, status, headers) {
        httpStatus = status;
        httpHeaders = headers;
      });
    $rootScope.$digest();
    $httpBackend.flush();
    expect(httpHeaders('x-auth-token')).toEqual('tokenInjector');
  });

});
