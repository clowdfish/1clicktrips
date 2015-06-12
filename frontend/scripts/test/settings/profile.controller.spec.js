'use strict';

describe('controller: profileCtrl', function() {
  var $scope,
      $httpBackend,
      userApi,
      session;

  beforeEach(function() {
    module('app.auth');
    module('app.settings');
    module('app.index');
    module('app.templates');
    module('mockdata');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$httpBackend_,
                            _$controller_,
                            _userApi_,
                            _session_,
                            _mockUserProfile_,
                            _mockCountryList_) {
    $scope = _$rootScope_.$new();
    $scope.$parent.userProfile = _mockUserProfile_;
    $httpBackend = _$httpBackend_;
    userApi = _userApi_;
    session = _session_;

    session.authSuccess('test_token', true);
    _$controller_('profileCtrl', {
      $scope: $scope,
      userApi: userApi,
      userProfile: _mockUserProfile_,
      countryList: _mockCountryList_
    });
    $httpBackend.whenGET(/\/api\/account\/profile/).respond(200, _mockUserProfile_);
    $httpBackend.whenPOST(/\/api\/account\/profile/).respond(200, 'OK');

  }));

  it('save profile', function() {
    $scope.saveProfile('test_key','test_value');
    $scope.$digest();
    $httpBackend.flush();
  });
});
