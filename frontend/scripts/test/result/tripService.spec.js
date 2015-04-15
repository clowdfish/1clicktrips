'use strict';

describe('tripApi', function() {
  var tripApi,
      $httpBackend,
      itinerary,
      alternativeSegment,
      $rootScope,
      $q,
      $httpBackend;

  beforeEach(module('app.result'));
  beforeEach(module('app.auth'));
  beforeEach(module('mockdata'));
  beforeEach(module('app.index'));
  beforeEach(module('app.templates'));

  beforeEach(inject(function(_tripApi_,
                            _$rootScope_,
                            mockItinerary,
                            mockAlternativeSegment,
                            _$q_,
                            _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    tripApi = _tripApi_;
    $rootScope = _$rootScope_;
    itinerary = mockItinerary;
    alternativeSegment = mockAlternativeSegment;
    $q = _$q_;

    $httpBackend.whenPOST(/\/api\/search\/trips/).respond(mockItinerary);
  }));

  it('it find and have valid data', function() {
    var returnValue, itinerary;
    tripApi
      .findItinerary()
      .then(function(itinerary) {
        returnValue = itinerary;
      });

    $rootScope.$digest();
    $httpBackend.flush();
    itinerary = returnValue[0];
    expect(itinerary.hasOwnProperty('outbound')).toEqual(true);
    expect(itinerary.hasOwnProperty('inbound')).toEqual(false);
    expect(itinerary.hasOwnProperty('cost')).toEqual(true);
    expect(itinerary.hasOwnProperty('currency')).toEqual(true);
    expect(itinerary.hasOwnProperty('startTime')).toEqual(true);
    expect(itinerary.hasOwnProperty('endTime')).toEqual(true);
    expect(itinerary.hasOwnProperty('duration')).toEqual(true);
  });

});
