'use strict';

describe('controller: profileCtrl', function() {
  var $scope,
      $httpBackend,
      userService;

  beforeEach(function() {
    module('app.auth');
    module('app.settings');
    module('app.templates');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$httpBackend_,
                            _$controller_,
                            _userService_,
                            _mockUserProfile_) {
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    userService = _userService_;

    _$controller_('profileCtrl', {
      $scope: $scope,
      userService: userService,
      userProfile: _mockUserProfile_
    });

    $httpBackend.whenPOST(/\/api\/account\/profile/).respond(200, 'OK');

  }));

  it('save profile', function() {
    $scope.saveProfile('test_key','test_value');
    $httpBackend.flush();
    $scope.$digest();
  });
});
