'use strict';

describe('controller: forgotPasswordCtrl', function() {
  var $scope,
      $httpBackend,
      authService,
      $q,
      forgotHandler;

  beforeEach(function() {
    module('app.auth');
    module('app.templates');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$q_,
                            _$httpBackend_,
                            _$controller_,
                            _authService_) {
    $scope = _$rootScope_.$new();
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    authService = _authService_;

    _$controller_('forgotPasswordCtrl', {
      $scope: $scope,
      authService: authService
    });

    $scope.error = false;
    $scope.sent = false;
    $scope.email = null;

    forgotHandler = $httpBackend.whenPOST(/\/api\/auth\/forgot/);
  }));

  it('success to sent reset password link', function() {
    forgotHandler.respond(200, 'OK');
    $scope.email = 'example@gmail.com';
    $scope.submit();
    $scope.$digest();
    $httpBackend.flush();
    expect($scope.sent).toEqual(true);
    expect($scope.error).toEqual(false);
  });

  it('fail to send reset password link', function() {
    forgotHandler.respond(501, 'error');
    $scope.email = 'example@gmail.com';
    $scope.submit();
    $scope.$digest();
    $httpBackend.flush();
    expect($scope.sent).toEqual(false);
    expect($scope.error).toEqual(true);
  });

});
