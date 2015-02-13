describe('searchCtrl', function() {
  var searchCtrl,
    $scope,
    suggestionAdapter,
    SUGGESTION_TYPES,
    $q,
    mockAddress,
    mockEvents,
    mockMeetingSpaces;

  beforeEach(module('app.search'));

  beforeEach(inject(function(
                              _$controller_,
                              _$rootScope_,
                              _suggestionAdapter_,
                              _SUGGESTION_TYPES_,
                              _$q_,
                              _mockAddress_,
                              _mockEvents_ ) {
    $scope = _$rootScope_.$new();
    SUGGESTION_TYPES = _SUGGESTION_TYPES_;
    suggestionAdapter = _suggestionAdapter_;
    $q = _$q_;
    mockAddress = _mockAddress_;
    mockEvents = _mockEvents_;
    mockMeetingSpaces = _mockEvents_; //we use same data now
    searchCtrl = _$controller_('searchCtrl', {
      $scope: $scope,
      SUGGESTION_TYPES: SUGGESTION_TYPES,
      suggestionAdapter: suggestionAdapter
    });
  }));

  it('has valid initial data', function() {
    expect($scope.step).toEqual(1);
    expect($scope.destinationType).toEqual(SUGGESTION_TYPES.address);
  });

  it('change step correctly', function() {
    $scope.step1();
    expect($scope.step).toEqual(1);
    $scope.step2();
    expect($scope.step).toEqual(2);
    $scope.step3();
    expect($scope.step).toEqual(3);
  });

  describe('get suggestion', function() {
    beforeEach(function() {
      spyOn(suggestionAdapter, 'getAddressSuggestion').and.callFake(function(input){
        var deferred = $q.defer();
        deferred.resolve(mockAddress);
        return deferred.promise;
      });

      spyOn(suggestionAdapter, 'getEventSuggestion').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve(mockEvents);
        return deferred.promise;
      });

      spyOn(suggestionAdapter, 'getMeetingSpaceSuggestion').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve(mockMeetingSpaces);
        return deferred.promise;
      });
    });

    it('get address suggestion correctly', function() {
      var addresses;
      var input = 'Stuttgart, Baden-Württemberg, Germany';
      $scope.destinationType = SUGGESTION_TYPES.address;
      $scope.getSuggestion(input)
            .then(function(response) {
              addresses = response;
            });
      $scope.$digest();
      expect(suggestionAdapter.getAddressSuggestion).toHaveBeenCalledWith(input)
      expect(addresses).toEqual(mockAddress);
      expect(addresses.length).toEqual(5);
    });

    it('get events suggestion correctly', function() {
      var meetingSpaces;
      var input = 'Stuttgart, Baden-Württemberg, Germany';
      $scope.destinationType = SUGGESTION_TYPES.meetingSpace;
      $scope.getSuggestion(input)
            .then(function(response) {
              meetingSpaces = response;
            });
      $scope.$digest();
      expect(suggestionAdapter.getMeetingSpaceSuggestion).toHaveBeenCalledWith(input)
      expect(meetingSpaces).toEqual(mockMeetingSpaces);
      expect(meetingSpaces.length).toEqual(3);
    });

  });

  it('get correct data when click on typeahead suggestion', function() {
    var item = {
      description: 'Stuttgart, Baden-Württemberg, Germany',
      location: {
        latitude: 10.802305,
        longitude: 106.641142
      }
    }

    $scope.destinationType = SUGGESTION_TYPES.address;
    $scope.selectDestinationSuggestion(item);
    expect($scope.destinationAddress).toEqual(item.description);

    $scope.destinationType = SUGGESTION_TYPES.events;
    $scope.selectDestinationSuggestion(item);
    expect($scope.destinationAddress).toEqual(item.location);

    $scope.destinationType = SUGGESTION_TYPES.meetingSpace;
    $scope.selectDestinationSuggestion(item);
    expect($scope.destinationAddress).toEqual(item.location);
  });

});