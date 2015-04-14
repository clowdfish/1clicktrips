'use strict';

describe('suggestionAdapter', function() {
  var SUGGESTION_TYPES,
      suggestionAdapter,
      $q,
      address,
      events,
      meetings,
      $rootScope;

  beforeEach(function() {
    module('app.search');
    module('app.templates');
    module('mockdata');
  });

  beforeEach(inject(function(_$rootScope_,
                              _SUGGESTION_TYPES_,
                              _suggestionAdapter_,
                              _$q_,
                              _mockAddress_,
                              _mockEvents_) {
    $rootScope = _$rootScope_.$new();
    SUGGESTION_TYPES = _SUGGESTION_TYPES_;
    suggestionAdapter = _suggestionAdapter_;
    address = _mockAddress_;
    events = _mockEvents_;
    meetings = _mockEvents_;
    $q = _$q_;
  }));

  describe('getAddressSuggestion', function() {
    beforeEach(function() {
      var deferred = $q.defer();
      deferred.resolve(address);
      spyOn(suggestionAdapter, 'getAddressSuggestion').and.returnValue(deferred.promise);
    });

    it('get address suggestion correctly', function() {
      var returnValue;
      suggestionAdapter
        .getSuggestion('Stuttgart, Baden-Württemberg, Germany', SUGGESTION_TYPES.address)
        .then(function(data) {
          returnValue = data;
        });
      $rootScope.$digest();
      expect(suggestionAdapter.getAddressSuggestion).toHaveBeenCalled();
      expect(returnValue).toEqual(address);
      expect(returnValue.length).toEqual(5);
    });
  });

  describe('getEventSuggestion', function() {
    beforeEach(function() {
      var deferred = $q.defer();
      deferred.resolve(events);
      spyOn(suggestionAdapter, 'getEventSuggestion').and.returnValue(deferred.promise);
    });

    it('get events suggestion correctly', function() {
      var returnValue;
      suggestionAdapter
        .getSuggestion('Stuttgart, Baden-Württemberg, Germany', SUGGESTION_TYPES.events)
        .then(function(data) {
          returnValue = data;
        });
      $rootScope.$digest();
      expect(suggestionAdapter.getEventSuggestion).toHaveBeenCalled();
      expect(returnValue).toEqual(events);
      expect(returnValue.length).toEqual(3);
    });
  });

  describe('getMeetingSpaceSuggestion', function() {
    beforeEach(function() {
      var deferred = $q.defer();
      deferred.resolve(meetings);
      spyOn(suggestionAdapter, 'getMeetingSpaceSuggestion').and.returnValue(deferred.promise);
    });

    it('get meetings suggestion correctly', function() {
      var returnValue;
      suggestionAdapter
        .getSuggestion('Stuttgart, Baden-Württemberg, Germany', SUGGESTION_TYPES.meetingSpace)
        .then(function(data) {
          returnValue = data;
        });
      $rootScope.$digest();
      expect(suggestionAdapter.getMeetingSpaceSuggestion).toHaveBeenCalled();
      expect(returnValue).toEqual(meetings);
      expect(returnValue.length).toEqual(3);
    })
  });



  it('throws error when given invalid suggestion type', function() {
    expect(function() {
      suggestionAdapter
        .getSuggestion('Stuttgart, Baden-Württemberg, Germany', 'invalid_type');
    }).toThrow(new Error('Invalid suggestion type'));
  });
});
