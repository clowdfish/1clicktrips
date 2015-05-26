describe('searchOriginCtrl', function() {
  var ctrl,
      $rootScope,
      $scope,
      $q,
      $state,
      $httpBackend,
      mockLocation,
      suggestionAdapter,
      mockAddress,
      googleMap,
      defaultOriginApi,
      defaultOriginHandler,
      defaultOriginMock,
      session;

  beforeEach(function() {
    module('app.search');
    module('app.common');
    module('app.index');
    module('app.auth');
    module('app.templates');
    module('app.result');
    module('app.settings');
    module('mockdata');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$q_,
                            _$controller_,
                            _$state_,
                            _$httpBackend_,
                            _SUGGESTION_TYPES_,
                            _suggestionAdapter_,
                            _googleMap_,
                            _mockAddress_,
                            _AUTH_EVENTS_,
                            _session_,
                            _defaultOriginApi_) {
    session = _session_;
    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    $q = _$q_;
    mockLocation = {
      latitude: 1,
      longitude: 1
    };
    googleMap = _googleMap_;
    suggestionAdapter = _suggestionAdapter_;
    mockAddress = _mockAddress_;
    defaultOriginApi = _defaultOriginApi_;
    $state = _$state_;
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET(/\/api\/account\/profile/).respond(200, 'OK');
    defaultOriginMock = {
      description: 'San Diego',
      location: {
        latitude: 10.6,
        longitude: 106.9
      }
    };

    defaultOriginHandler = $httpBackend.whenGET(/\/api\/account\/settings\/default_origin/).respond(200, defaultOriginMock);
    $httpBackend.whenPOST(/\/api\/account\/settings/).respond(200, 'OK');
    session.authSuccess('test_token');
    $scope.setOrigin = jasmine.createSpy('setOrigin');
    ctrl = _$controller_('searchOriginCtrl', {
      $scope: $scope,
      $state: _$state_,
      SUGGESTION_TYPES: _SUGGESTION_TYPES_,
      suggestionAdapter: _suggestionAdapter_,
      googleMap: _googleMap_,
      AUTH_EVENTS: _AUTH_EVENTS_,
    });

    spyOn(googleMap, 'geocode').and.callFake(function() {
      return $q(function(resolve) {
        resolve(mockLocation);
      });
    });

    spyOn(suggestionAdapter, 'getAddressSuggestion').and.callFake(function(input) {
      var deferred = $q.defer();
      deferred.resolve(mockAddress);
      return deferred.promise;
    });

    spyOn(defaultOriginApi, 'setDefaultOrigin').and.callThrough();

  }));

  afterEach(function() {
    session.authFailed();
  });

  it('get/set default origin in session storage correctly', function() {
    session.authFailed();
    defaultOriginApi.setDefaultOrigin(defaultOriginMock.description, defaultOriginMock.location);
    $scope.loadDefaultOrigin();
    $scope.$digest();
    expect($scope.origin).toEqual(defaultOriginMock.description);
    expect($scope.originLocation).toEqual(defaultOriginMock.location);
    expect($scope.storeDefaultOrigin).toEqual(true);
  });

  it('get/set default origin by Api correctly', function() {

    defaultOriginHandler.respond(200, defaultOriginMock);
    $scope.loadDefaultOrigin();
    $scope.$digest();
    $httpBackend.flush();
    expect($scope.origin).toEqual(defaultOriginMock.description);
    expect($scope.originLocation).toEqual(defaultOriginMock.location);
    expect($scope.storeDefaultOrigin).toEqual(true);

    $scope.storeDefaultOrigin = false;
    $scope.toggleDefaultOrigin();
    $scope.$digest();
    expect(defaultOriginApi.setDefaultOrigin).toHaveBeenCalledWith(null);

    $scope.storeDefaultOrigin = true;
    $scope.origin = defaultOriginMock.description;
    $scope.originLocation = defaultOriginMock.location;
    $scope.toggleDefaultOrigin();
    $scope.$digest();
    $httpBackend.flush();
    expect(defaultOriginApi.setDefaultOrigin).toHaveBeenCalledWith(defaultOriginMock.description, defaultOriginMock.location);
  });

  it('return value when call getAddressSuggestion()', function() {
    var input = 'sample address input';
    var outputAddress = null;
    $scope
      .getAddressSuggestion(input)
      .then(function(data) {
        outputAddress = data;
      });
    $scope.$digest();
    expect(outputAddress).toEqual(mockAddress);
  });

  it('select value from suggestion', function() {
    $item = {
      description: 'Random street name from suggestionAdapter'
    }
    $scope.selectOriginSuggestion($item);
    $scope.$digest();
    //$httpBackend.flush();
    expect($scope.setOrigin).toHaveBeenCalled();
  });

});
