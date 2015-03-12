'use strict';

describe('controller: signupCtrl', function() {

  var $scope,
      modalInstance,
      $httpBackend,
      authService,
      signupHandler;

  beforeEach(function() {
    module('app.auth');
    module('app-templates');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$q_,
                            _$httpBackend_,
                            _$controller_,
                            _$modal_,
                            _authService_,
                            _AUTH_EVENTS_) {
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    authService = _authService_;

    //Mock object for $modalInstance
    modalInstance = {
      close: jasmine.createSpy('modalInstance.close')
    }

    _$controller_('signupCtrl', {
      $scope: $scope,
      $modal: _$modal_,
      $rootScope: _$rootScope_,
      $modalInstance: modalInstance,
      AUTH_EVENTS: _AUTH_EVENTS_,
      authService: authService
    });

    signupHandler = $httpBackend.whenPOST(/\/api\/auth\/register/).respond(200, 'success');

    //$scope.loginForm is not available in unit test so we create it at here
    $scope.signupForm = {};
    $scope.signupForm.email = {};
    $scope.signupForm.email.$error = {};

    //Default email and password
    $scope.email = 'nam@gmail.com';
    $scope.password = '123';
  }));

  it('signup success', function() {
    expect($scope.isLogin).toEqual(false);
    $scope.signup();
    $scope.$digest();
    $httpBackend.flush();
    expect($scope.isLogin).toEqual(true);
    expect(modalInstance.close).toHaveBeenCalled();
  });

  it('signup failed', function() {
    $scope.errorMessage = null;
    signupHandler.respond(401, 'status.user.error.signup.exists');
    expect($scope.isLogin).toEqual(false);
    $scope.signup();
    $scope.$digest();
    $httpBackend.flush();
    expect($scope.isLogin).toEqual(false);
    expect(modalInstance.close).not.toHaveBeenCalled();
    expect($scope.errorMessage).not.toEqual(null);
    expect($scope.signupForm.email.$error.exist).toEqual(true);
  });
});
