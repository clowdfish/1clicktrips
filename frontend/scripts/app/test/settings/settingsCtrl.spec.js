describe('settingsCtrl', function() {
  var settingsCtrl,
      $scope,
      $state;

  beforeEach(module('app.auth'));
  beforeEach(module('app.settings'));
  beforeEach(module('app.templates'));

  beforeEach(inject(function(_$controller_,
                            _$rootScope_,
                            _$state_) {
    $scope = _$rootScope_.$new();
    settingsCtrl = _$controller_('settingsCtrl', {
      $scope: $scope
    });
    $state = _$state_;

  }));

  it('routing', function() {
    $state.go('settings');
    $scope.$digest();
    expect($state.current.name).toEqual('settings');
  });

});


