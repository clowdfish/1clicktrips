'use strict';

describe('module: auth', function() {
  var $rootScope,
      AUTH_EVENTS;

  beforeEach(module('app.auth'));
  beforeEach(module('LocalStorageModule'));
  beforeEach(module('app-templates'));

  beforeEach(inject(function(_$rootScope_,
                            _AUTH_EVENTS_) {
    $rootScope = _$rootScope_;
    AUTH_EVENTS = _AUTH_EVENTS_;
  }));

  it('isLogin is changed when AUTH_EVENTS.loginSuccess', function() {
    $rootScope.isLogin = false;
    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    $rootScope.$digest();
    expect($rootScope.isLogin).toEqual(true);
  });

  it('isLogin is changed when AUTH_EVENTS.signupSuccess', function() {
    $rootScope.isLogin = false;
    $rootScope.$broadcast(AUTH_EVENTS.signupSuccess);
    $rootScope.$digest();
    expect($rootScope.isLogin).toEqual(true);
  });

  it('isLogin is false when AUTH_EVENTS.logout', function() {
    $rootScope.isLogin = true;
    $rootScope.$broadcast(AUTH_EVENTS.logout);
    $rootScope.$digest();
    expect($rootScope.isLogin).toEqual(false);
  });

});
