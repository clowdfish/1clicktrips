describe('searchOriginCtrl', function() {
  var ctrl,
      $rootScope,
      $scope,
      $q,
      $state,
      mockLocation,
      suggestionAdapter,
      mockAddress,
      googleMap;

  beforeEach(module('app.common'));
  beforeEach(module('app.index'));
  beforeEach(module('app.search'));
  beforeEach(module('scripts/app/templates/result/result.html'));
  beforeEach(module('app.result'));
  beforeEach(inject(function(_$rootScope_,
                            _$q_,
                            _$controller_,
                            _$state_,
                            _SUGGESTION_TYPES_,
                            _suggestionAdapter_,
                            _googleMap_,
                            _mockAddress_) {
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

    ctrl = _$controller_('searchOriginCtrl', {
      $scope: $scope,
      $state: _$state_,
      SUGGESTION_TYPES: _SUGGESTION_TYPES_,
      suggestionAdapter: _suggestionAdapter_,
      googleMap: _googleMap_
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
    expect($scope.$parent.originAddress).not.toEqual(null);
    expect($scope.$parent.isStep3Ready).toEqual(true);
  });

  it('send search data to form correctly', function() {
    $scope.$parent.startDate = new Date();
    $scope.$parent.endDate = new Date();
    $scope.$parent.startTime = new Date();
    $scope.$parent.endTime = new Date();
    $scope.$parent.destinationAddress = mockLocation;
    $scope.$parent.originAddress = mockLocation;
    $scope.startSearch();
    $rootScope.$digest();
    expect($state.current.name).toBe('search_result');
  });
});
