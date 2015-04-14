'use strict';

describe('controller: profileCtrl', function() {
  var $scope,
      $httpBackend,
      userService,
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
                            _userService_,
                            _session_,
                            _mockUserProfile_,
                            _mockCountryList_) {
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    userService = _userService_;
    session = _session_;

    session.authSuccess('test_token', true);
    _$controller_('profileCtrl', {
      $scope: $scope,
      userService: userService,
      userProfile: _mockUserProfile_,
      countryList: _mockCountryList_
    });

    $httpBackend.whenPOST(/\/api\/account\/profile/).respond(200, 'OK');

  }));

  it('save profile', function() {
    $scope.saveProfile('test_key','test_value');
    $httpBackend.flush();
    $scope.$digest();
  });
});
