'use strict';

describe('tripService', function() {
  var tripService,
      $httpBackend,
      itinerary,
      alternativeSegment,
      $rootScope,
      $q;

  beforeEach(module('app.result'));
  beforeEach(module('app.mockdata'));
  beforeEach(inject(function(_tripService_,
                            _$rootScope_,
                            mockItinerary,
                            mockAlternativeSegment,
                            _$q_) {
    tripService = _tripService_;
    $rootScope = _$rootScope_;
    itinerary = mockItinerary;
    alternativeSegment = mockAlternativeSegment;
    $q = _$q_;

    spyOn(tripService, 'callSearchItineraryApi').and.callFake(function(){
      var deferred = $q.defer();
      deferred.resolve(itinerary);
      return deferred.promise;
    })
  }));

  it('it find and have valid data', function() {
    var returnValue, itinerary;
    tripService
      .findItinerary()
      .then(function(itinerary) {
        returnValue = itinerary;
      });

    $rootScope.$digest();
    itinerary = returnValue[0];
    expect(itinerary.hasOwnProperty('destination')).toEqual(true);
    expect(itinerary.hasOwnProperty('outbound')).toEqual(true);
    expect(itinerary.hasOwnProperty('inbound')).toEqual(true);
    expect(itinerary.hasOwnProperty('price')).toEqual(true);
    expect(itinerary.hasOwnProperty('currency')).toEqual(true);
    expect(itinerary.hasOwnProperty('startTime')).toEqual(true);
    expect(itinerary.hasOwnProperty('endTime')).toEqual(true);
    expect(itinerary.hasOwnProperty('duration')).toEqual(true);
  });

});
