'use strict';

describe('controller: loginCtrl', function() {
  var $scope,
      $q,
      $httpBackend,
      authApi,
      AUTH_EVENTS,
      signupHandler,
      loginHandler,
      logoutHandler,
      modalInstance;

  beforeEach(function() {
    module('app.index');
    module('app.auth');
    module('app.templates');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$q_,
                            _$httpBackend_,
                            _$controller_,
                            _authApi_,
                            _AUTH_EVENTS_,
                            _oAuthDialog_) {
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;

    //Mock object for $modalInstance
    modalInstance = {
      close: jasmine.createSpy('modalInstance.close')
    }

    _$controller_('loginCtrl', {
      $scope: $scope,
      $rootScope: _$rootScope_,
      $modalInstance: modalInstance,
      AUTH_EVENTS: _AUTH_EVENTS_,
      oAuthDialog: _oAuthDialog_,
      authApi: _authApi_
    })
    signupHandler = $httpBackend.whenPOST(/\/api\/auth\/register/).respond(200, 'success');
    loginHandler = $httpBackend.whenPOST(/\/api\/auth\/local/).respond(200, 'success');
    logoutHandler = $httpBackend.whenPOST(/\/api\/auth\/logout/).respond(200, 'success');
    authApi = _authApi_;

    //$scope.loginForm is not available in unit test so we create it at here
    $scope.loginForm = {};
    $scope.loginForm.$error = {};

    //Default email and password
    $scope.email = 'nam@gmail.com';
    $scope.password = '123';
  }));

  it('login success', function() {
    loginHandler.respond(200, 'success');
    $scope.login();
    $scope.$digest();
    $httpBackend.flush();

    //Check login state
    expect($scope.isLogin).toEqual(true);

    //Close modal dialog
    expect(modalInstance.close).toHaveBeenCalled();
  });

  it('login fail', function() {
    loginHandler.respond(401, 'success');

    $scope.login();
    $scope.$digest();
    $httpBackend.flush();

    //Check login state
    expect($scope.isLogin).toEqual(false);

    //Show error message
    expect($scope.loginForm.$error.unauthorized).toEqual(true);
  });

});