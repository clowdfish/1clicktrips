describe('searchDestinationFormCtrl', function() {
  var searchCtrl,
    $scope,
    suggestionAdapter,
    SUGGESTION_TYPES,
    $q,
    mockAddress,
    mockEvents,
    mockMeetingSpaces,
    googleMap,
    mockLocation;

  beforeEach(module('app.search'));
  beforeEach(module('app.common'));
  beforeEach(module('app.index'));

  beforeEach(inject(function(
                              _$controller_,
                              _$rootScope_,
                              _suggestionAdapter_,
                              _SUGGESTION_TYPES_,
                              _$q_,
                              _mockAddress_,
                              _mockEvents_,
                              _googleMap_ ) {
    $scope = _$rootScope_.$new();
    SUGGESTION_TYPES = _SUGGESTION_TYPES_;
    suggestionAdapter = _suggestionAdapter_;
    $q = _$q_;
    mockAddress = _mockAddress_;
    mockEvents = _mockEvents_;
    mockMeetingSpaces = _mockEvents_; //we use same data now
    googleMap = _googleMap_;
    mockLocation = {
      latitude: 1,
      longitude: 1
    }
    controller = _$controller_('searchDestinationFormCtrl', {
      $scope: $scope,
      SUGGESTION_TYPES: SUGGESTION_TYPES,
      suggestionAdapter: suggestionAdapter,
      googleMap: googleMap
    });

    spyOn(googleMap, 'geocode').and.callFake(function() {
      return $q(function(resolve) {
        resolve(mockLocation);
      });
    });
  }));

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

    it('assign destinationAddress after select address from suggestion', function() {
      var $item = {
        description: 'Stuttgart, Baden-Württemberg, Germany'
      }
      $scope.selectDestinationSuggestion($item);
      $scope.$digest();
      expect($scope.$parent.destinationAddress).toEqual(mockLocation);
      expect($scope.$parent.isStep1Ready).toEqual(true);
    });
  });
});
