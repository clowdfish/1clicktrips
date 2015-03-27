describe('searchCtrl', function() {
  var searchCtrl,
    $scope,
    $rootScope,
    $controller,
    suggestionAdapter,
    SUGGESTION_TYPES,
    $q,
    mockAddress,
    mockEvents,
    mockMeetingSpaces,
    mockFavorites;

  beforeEach(module('app.search'));
  beforeEach(module('app.common'));
  beforeEach(module('app.index'));
  beforeEach(module('app.dashboard'));
  beforeEach(module('app.auth'));
  beforeEach(module('app-templates'));

  beforeEach(inject(function(
                              _$controller_,
                              _$rootScope_,
                              _suggestionAdapter_,
                              _SUGGESTION_TYPES_,
                              _$q_,
                              _mockAddress_,
                              _mockEvents_,
                              _mockFavorites_ ) {
    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    SUGGESTION_TYPES = _SUGGESTION_TYPES_;
    suggestionAdapter = _suggestionAdapter_;
    $q = _$q_;
    $controller = _$controller_;
    mockAddress = _mockAddress_;
    mockEvents = _mockEvents_;
    mockMeetingSpaces = _mockEvents_; //we use same data now
    mockFavorites = _mockFavorites_;
    searchCtrl = $controller('searchCtrl', {
      $scope: $scope,
      SUGGESTION_TYPES: SUGGESTION_TYPES,
      suggestionAdapter: suggestionAdapter,
      searchFormData: getDefaultSearchFormData()
    });
  }));

  it('change step correctly', function() {
    $scope.step1();
    expect($scope.step).toEqual(1);

    $scope.destinationLocation = {latitude: 1, longitude: 1};
    $scope.$digest();
    expect($scope.isStep1Ready).toEqual(true);

    $scope.step2();
    expect($scope.step).toEqual(2);
    $scope.startDate = '2015-12-31';
    $scope.startTime = '00:00:00';
    $scope.endDate = '2015-12-31';
    $scope.endTime = '00:00:00';
    $scope.$digest();
    expect($scope.isStep2Ready).toEqual(true);

    $scope.step3();
    expect($scope.step).toEqual(3);
    $scope.originLocation = {latitude: 1, longitude: 1};
    $scope.$digest();
    expect($scope.isStep3Ready).toEqual(true);
  });

  it('populate search form with data from selectFavorite event', function() {
    favorite = mockFavorites[0];
    $rootScope.$broadcast('selectFavorite', favorite);
    $scope.$digest();
    expect($scope.destination).toEqual(favorite.destination.description);
    expect($scope.origin).toEqual(favorite.origin.description);
    expect($scope.destinationLocation).toEqual(favorite.destination.location);
    expect($scope.step).toEqual(2);
  });

});

function getDefaultSearchFormData() {
  var startDate = new Date();
  startDate.setHours(14);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  var endDate = new Date();
  endDate.setHours(16);
  endDate.setMinutes(0);
  endDate.setSeconds(0);

  return {
    destinationLocation: null,
    originLocation: null,
    startDate: startDate,
    endDate: endDate,
    destination: null,
    origin: null
  }
}
