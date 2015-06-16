describe('searchDestinationFormCtrl', function() {
  var searchCtrl,
    $rootScope,
    $scope,
    suggestionAdapter,
    SUGGESTION_TYPES,
    $q,
    $httpBackend,
    mockAddress,
    mockEvents,
    mockMeetingSpaces,
    googleMap,
    mockLocation,
    mockFavorites,
    SEARCH_STEPS;

  beforeEach(function() {
    module('app.search');
    module('app.common');
    module('app.index');
    module('app.auth');
    module('app.templates');
    module('mockdata');
  });

  beforeEach(inject(function(
                              _$controller_,
                              _$rootScope_,
                              _$httpBackend_,
                              _suggestionAdapter_,
                              _SUGGESTION_TYPES_,
                              _$q_,
                              _mockAddress_,
                              _mockEvents_,
                              _googleMap_,
                              _AUTH_EVENTS_,
                              _mockFavorites_,
                              _SEARCH_STEPS_) {
    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    SUGGESTION_TYPES = _SUGGESTION_TYPES_;
    suggestionAdapter = _suggestionAdapter_;
    mockFavorites = _mockFavorites_;
    SEARCH_STEPS = _SEARCH_STEPS_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    $httpBackend.whenGET(/\/api\/account\/profile/).respond(200, 'OK');
    mockAddress = _mockAddress_;
    mockEvents = _mockEvents_;
    mockMeetingSpaces = _mockEvents_; //we use same data now
    googleMap = _googleMap_;
    mockLocation = {
      latitude: 1,
      longitude: 1
    }

    $scope.setDestination = jasmine.createSpy('setDestination');

    controller = _$controller_('searchDestinationFormCtrl', {
      $scope: $scope,
      SUGGESTION_TYPES: SUGGESTION_TYPES,
      suggestionAdapter: suggestionAdapter,
      googleMap: googleMap,
      AUTH_EVENTS: _AUTH_EVENTS_
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

    it('assign destinationLocation after select address from suggestion', function() {
      $scope.$parent.isStepDestinationReady = false;
      var $item = {
        description: 'Stuttgart, Baden-Württemberg, Germany'
      }
      $scope.selectDestinationSuggestion($item);
      $scope.$digest();
      expect($scope.setDestination).toHaveBeenCalled();
    });

    it('populate search form with data from selectFavorite event', function() {
      favorite = mockFavorites[0];
      $rootScope.$broadcast('selectFavorite', favorite);
      $scope.$digest();
      expect($scope.destination).toEqual(favorite.destination.description);
      expect($scope.destinationLocation).toEqual(favorite.destination.location);
    });
  });
});
