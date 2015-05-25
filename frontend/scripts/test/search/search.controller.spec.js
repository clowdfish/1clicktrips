describe('searchCtrl', function() {
  var searchCtrl,
    $scope,
    $rootScope,
    $controller,
    $state,
    suggestionAdapter,
    SUGGESTION_TYPES,
    $q,
    mockAddress,
    mockEvents,
    mockMeetingSpaces,
    mockFavorites,
    SEARCH_STEPS;

  beforeEach(function() {
    module('app.search');
    module('app.common');
    module('app.index');
    module('app.dashboard');
    module('app.auth');
    module('app.result');
    module('app.templates');
    module('app.settings');
    module('mockdata');
  });

  beforeEach(inject(function(
                              _$controller_,
                              _$rootScope_,
                              _$state_,
                              _suggestionAdapter_,
                              _SUGGESTION_TYPES_,
                              _$q_,
                              _mockAddress_,
                              _mockEvents_,
                              _mockFavorites_,
                              _SEARCH_STEPS_) {
    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    SUGGESTION_TYPES = _SUGGESTION_TYPES_;
    suggestionAdapter = _suggestionAdapter_;
    $q = _$q_;
    $controller = _$controller_;
    $state = _$state_;
    mockAddress = _mockAddress_;
    mockEvents = _mockEvents_;
    mockMeetingSpaces = _mockEvents_; //we use same data now
    mockFavorites = _mockFavorites_;
    SEARCH_STEPS = _SEARCH_STEPS_;
    searchCtrl = $controller('searchCtrl', {
      $scope: $scope,
      SUGGESTION_TYPES: SUGGESTION_TYPES,
      suggestionAdapter: suggestionAdapter,
      searchFormData: getDefaultSearchFormData()
    });
  }));

  xit('change step correctly', function() {
    $scope.stepOrigin();
    expect($scope.step).toEqual(SEARCH_STEPS.origin);
    $scope.originLocation = {latitude: 1, longitude: 1};
    $scope.$digest();

    expect($scope.isStepDestinationReady).toEqual(true);

    $scope.stepDestination();
    $scope.destinationLocation = {latitude: 1, longitude: 1};
    $scope.$digest();
    expect($scope.step).toEqual(SEARCH_STEPS.destination);
    $scope.startDate = new Date();
    $scope.endDate = new Date();
    $scope.$digest();
    expect($scope.isStepOriginReady).toEqual(true);

    $scope.stepAppointment();
    expect($scope.step).toEqual(SEARCH_STEPS.appointment);

    expect($scope.isStep3Ready).toEqual(true);
  });

  it('populate search form with data from selectFavorite event', function() {
    favorite = mockFavorites[0];
    $rootScope.$broadcast('selectFavorite', favorite);
    $scope.$digest();
    expect($scope.destination).toEqual(favorite.destination.description);
    expect($scope.origin).toEqual(favorite.origin.description);
    expect($scope.destinationLocation).toEqual(favorite.destination.location);
    expect($scope.step).toEqual(SEARCH_STEPS.appointment);
  });

  it('send search data to form correctly', function() {
    var location = {
      longitude: 1,
      latitude: 1
    }
    $scope.destinationLocation = location;
    $scope.destination = 'Ha Hoi';
    $scope.originLocation = location;
    $scope.origin = 'Ho Chi Minh';
    $scope.roundTrip = false;
    $scope.startDate = new Date();
    $scope.startDate.setDate($scope.startDate.getDate() + 1);
    $scope.endDate = new Date();
    $scope.endDate.setDate($scope.endDate.getDate() + 2);
    $scope.startSearch();
    $rootScope.$digest();

    expect($state.current.name).toBe('search_result');
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
    origin: null,
    roundTrip: false
  };
}
