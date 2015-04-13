'use strict';

describe('service: session', function() {
  var session,
      token,
      userProfile;

  beforeEach(function() {
    module('app.auth');
    module('app.index');
  });

  beforeEach(inject(function(_session_) {
    session = _session_;
    token = 'test_token';
    userProfile = {
      id: 1,
      name: 'Nam Tran'
    }
  }));

  afterEach(function() {
    //remove token after run this test
    session.removeAuthToken();
    session.removeUserProfile();
  });

  it('get, set and remove token', function() {
    session.authSuccess(token, true);
    expect(session.getAuthToken()).toEqual(token);

    session.removeAuthToken();
    expect(session.getAuthToken()).toEqual(undefined);
  });

  it('set, get and remove user profile', function() {
    session.setUserProfile(userProfile);
    expect(session.getUserProfile()).toEqual(userProfile);

    session.removeUserProfile();
    expect(session.getUserProfile()).toEqual(undefined);
  });


});
