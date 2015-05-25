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
      googleMap;

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
                            _session_) {
    _session_.authFailed();
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
    $state = _$state_;
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET(/\/api\/account\/profile/).respond(200, 'OK');
    ctrl = _$controller_('searchOriginCtrl', {
      $scope: $scope,
      $state: _$state_,
      SUGGESTION_TYPES: _SUGGESTION_TYPES_,
      suggestionAdapter: _suggestionAdapter_,
      googleMap: _googleMap_,
      AUTH_EVENTS: _AUTH_EVENTS_
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

    $scope.setOrigin = jasmine.createSpy('setOrigin');

  }));

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
