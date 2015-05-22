describe('settingsCtrl', function() {
  var settingsCtrl,
      $scope,
      $state,
      $httpBackend,
      session;

  beforeEach(function() {
    module('app');
    module('mockdata');
  });

  beforeEach(inject(function(_$controller_,
                            _$rootScope_,
                            _$state_,
                            _$httpBackend_,
                            _AUTH_EVENTS_,
                            _mockUserProfile_,
                            _mockCountryList_,
                            _session_) {
    $scope = _$rootScope_.$new();
    $state = _$state_;
    $httpBackend = _$httpBackend_;
    session = _session_;
    $httpBackend.whenGET(/\/api\/account\/profile/).respond(_mockUserProfile_);
  }));

  afterEach(function() {
    session.authFailed();
  });

  it('restrict access for un-authorized user', function() {
    $state.go('settings');
    $scope.$digest();
    expect($state.current.name).toEqual('');
  });

  xit('allow access for authorized user', function() {
    session.authSuccess('test_token', true);
    expect(session.getAuthToken()).toEqual('test_token');
    $state.go('settings');
    $scope.$digest();
    $httpBackend.flush();
    expect($state.current.name).toEqual('settings');
  });

});


