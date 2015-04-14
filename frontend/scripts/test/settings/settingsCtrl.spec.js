describe('settingsCtrl', function() {
  var settingsCtrl,
      $scope,
      $state;

  beforeEach(function() {
    module('app.auth');
    module('app.settings');
    module('app.index');
    module('app.templates');
    module('mockdata');
  });

  beforeEach(inject(function(_$controller_,
                            _$rootScope_,
                            _$state_,
                            _AUTH_EVENTS_) {
    $scope = _$rootScope_.$new();
    $state = _$state_;
    settingsCtrl = _$controller_('settingsCtrl', {
      $scope: $scope,
      AUTH_EVENTS: _AUTH_EVENTS_,
      $state: _$state_
    });


  }));

  it('routing', function() {
    $state.go('settings');
    $scope.$digest();
    expect($state.current.name).toEqual('settings');
  });

});


