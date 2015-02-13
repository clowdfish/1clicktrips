'use strict';

xdescribe('tripService', function() {
  var tripService, $httpBackend, itinerary, alternativeSegment, $rootScope, $q;

  beforeEach(module('app.result'));

  beforeEach(inject(function(_tripService_, _$httpBackend_, _$rootScope_, mockItinerary, mockAlternativeSegment, _$q_) {
    tripService = _tripService_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    itinerary = mockItinerary;
    alternativeSegment = mockAlternativeSegment
    $httpBackend.whenGET('/search/trips').respond(itinerary);
  }));

  it('it find and have valid data', function(done) {
    var promise = tripService.findItinerary();
    spyOn(tripService, 'findItinerary').and.callFake(function() {
      $httpBackend.flush();
    });
    promise.then(function(itinerary) {
      expect(itinerary.hasOwnProperty('destination')).toEqual(true);
      expect(itinerary.hasOwnProperty('outbound')).toEqual(true);
      expect(itinerary.hasOwnProperty('inbound')).toEqual(true);
      expect(itinerary.hasOwnProperty('price')).toEqual(true);
      expect(itinerary.hasOwnProperty('currency')).toEqual(true);
      expect(itinerary.outbound.departureTime instanceof Date).toEqual(true);
      expect(itinerary.outbound.arrivalTime instanceof Date).toEqual(true);
      expect(itinerary.hasOwnProperty('startTime')).toEqual(true);
      expect(itinerary.hasOwnProperty('endTime')).toEqual(true);
      expect(itinerary.hasOwnProperty('duration')).toEqual(true);
    }).finally(done);



  });

});