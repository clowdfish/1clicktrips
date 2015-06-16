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
    module('app');
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

  it('change step correctly', function() {
    $scope.stepOrigin();
    expect($scope.step).toEqual(SEARCH_STEPS.origin);
    $scope.setOrigin({
      description: 'San Diego',
      location: {
        latitude: 1,
        longitude: 1
      }
    });
    $scope.$digest();
    expect($scope.isStepOriginReady).toEqual(true);

    $scope.stepDestination();
    expect($scope.step).toEqual(SEARCH_STEPS.destination);
    $scope.setDestination({
      description: 'Washington, United States',
      location: {
        latitude: 1,
        longitude: 1
      }
    });
    $scope.$digest();
    expect($scope.isStepDestinationReady).toEqual(true);

    $scope.stepAppointment();
    expect($scope.step).toEqual(SEARCH_STEPS.appointment);
    var startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    $scope.setStartDate({
      startDate: startDate,
      startTime: '12:00'
    });
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    $scope.setEndDate({
      endDate: endDate,
      endTime: '12:00'
    });
    $scope.$digest();
    expect($scope.isStepAppointmentReady).toEqual(true);
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
