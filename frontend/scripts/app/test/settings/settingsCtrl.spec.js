describe('settingsCtrl', function() {
  var settingsCtrl,
      $scope,
      $state;

  beforeEach(module('app.settings'));
  beforeEach(module('scripts/app/templates/settings/settings.html'));

  beforeEach(inject(function(_$controller_,
                            _$rootScope_,
                            _$state_) {
    $scope = _$rootScope_.$new();
    settingsCtrl = _$controller_('settingsCtrl', {
      $scope: $scope
    });
    $state = _$state_;

  }));

  it('go to setting page', function() {
    $state.go('settings');
    $scope.$digest();
    expect($state.current.name).toEqual('settings');
  });

});

