describe('settingsCtrl', function() {
  var settingsCtrl,
      $scope,
      $state;

  beforeEach(module('app.auth'));
  beforeEach(module('app.settings'));
  beforeEach(module('app.index'));
  beforeEach(module('app.templates'));

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


