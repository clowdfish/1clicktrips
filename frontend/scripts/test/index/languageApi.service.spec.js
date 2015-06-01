'use strict';

describe('languageApi: service', function() {
  var $q,
      session,
      userApi,
      languageApi;

  beforeEach(function() {
    module('app');
  });

  beforeEach(inject(function(_$q_,
                            _session_,
                            _userApi_,
                            _languageApi_) {
    $q = _$q_;
    session = _session_;
    userApi = _userApi_;
    languageApi = _languageApi_;

    userApi.setUserProfile = jasmine.createSpy('userApi.setUserProfile').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    });

  }));

  afterEach(function() {
    session.authFailed();
  })

  it('get/set active language', function() {
    languageApi.setActiveLanguageKey('en');
    expect(languageApi.getActiveLanguageKey()).toEqual('en');

    languageApi.setActiveLanguageKey('de');
    expect(languageApi.getActiveLanguageKey()).toEqual('de');

    languageApi.setActiveLanguageKey('ru');
    expect(languageApi.getActiveLanguageKey()).toEqual('de'); //should not change
  });

  it('save active language in user profile', function() {
    session.authSuccess('test_token');
    languageApi.setActiveLanguageKey('en');
    expect(userApi.setUserProfile).toHaveBeenCalledWith('language', 'en');
  });

});
