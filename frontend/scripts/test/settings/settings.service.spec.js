'use strict';

describe('service: settings', function() {
  var settingsService,
      settingsTemplate,
      userSettings,
      session,
      $scope,
      $httpBackend,
      $state,
      $q;

  beforeEach(function() {
    module('app.auth');
    module('app.settings');
    module('app.index');
    module('app.templates');
    module('mockdata');
  })

  beforeEach(inject(function(_$rootScope_,
                            _$httpBackend_,
                            _$q_,
                            _settings_,
                            _settingsTemplate_,
                            _session_
                            ) {
    $scope = _$rootScope_.$new();
    settingsService = _settings_,
    $httpBackend = _$httpBackend_,
    $q = _$q_,
    settingsTemplate = _settingsTemplate_,
    session = _session_,
    userSettings = [{"key":"transfer_time","value":"0"},{"key":"travel_profile","value":"2"}];

    $httpBackend.whenGET(/\/api\/account\/settings/).respond(userSettings)
    session.authSuccess('test_token');
  }));

  afterEach(function() {
    session.removeAuthToken();
  });

  it('get user settings', function() {
    var settings;
    settingsService
      .getUserSettings()
      .then(function(response) {
        settings = response;
      });
    $scope.$digest();
    $httpBackend.flush();

    //After merge with settingsTemplate, settings and settingsTemplate must have the same length
    expect(settings.length).toEqual(settingsTemplate.length);
    var transferTimeSetting = _.find(settings, function(item) {
      return item.key === "transfer_time";
    });

    //Transfer time setting must be found
    expect(transferTimeSetting).not.toEqual(null);

    //Setting value should be convert to integer
    expect(transferTimeSetting.value).not.toEqual("0");
    expect(transferTimeSetting.value).toEqual(0);

    var transferTimeOption = _.find(transferTimeSetting.options, function(option) {
      return option.selected === true;
    });

    expect(transferTimeOption).not.toEqual(null);
    expect(transferTimeOption.selected).toEqual(true);
  });

});


