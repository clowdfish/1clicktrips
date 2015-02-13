'use strict';

describe('tripService', function() {
  var tripService,
      $httpBackend,
      itinerary,
      alternativeSegment,
      $rootScope,
      $q;

  beforeEach(module('app.result'));

  beforeEach(inject(function(_tripService_,
                            _$rootScope_,
                            mockItinerary,
                            mockAlternativeSegment,
                            _$q_) {
    tripService = _tripService_;
    $rootScope = _$rootScope_;
    itinerary = mockItinerary;
    alternativeSegment = mockAlternativeSegment
    $q = _$q_;

    spyOn(tripService, 'callSearchItineraryApi').and.callFake(function(){
      var deferred = $q.defer();
      deferred.resolve(itinerary);
      return deferred.promise;
    })
  }));

  it('it find and have valid data', function() {
    var returnValue = null;
    tripService
      .findItinerary()
      .then(function(itinerary) {
        returnValue = itinerary;
      });

    $rootScope.$digest();
    expect(returnValue.hasOwnProperty('destination')).toEqual(true);
    expect(returnValue.hasOwnProperty('outbound')).toEqual(true);
    expect(returnValue.hasOwnProperty('inbound')).toEqual(true);
    expect(returnValue.hasOwnProperty('price')).toEqual(true);
    expect(returnValue.hasOwnProperty('currency')).toEqual(true);
    expect(returnValue.hasOwnProperty('startTime')).toEqual(true);
    expect(returnValue.hasOwnProperty('endTime')).toEqual(true);
    expect(returnValue.hasOwnProperty('duration')).toEqual(true);
  });

});