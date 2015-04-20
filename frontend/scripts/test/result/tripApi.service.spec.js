'use strict';

describe('service: tripApi', function() {
  var tripApi,
      $httpBackend,
      itinerary,
      mockAlternativeSegment,
      mockItinerary,
      $rootScope,
      $q;

  beforeEach(module('app.result'));
  beforeEach(module('app.auth'));
  beforeEach(module('mockdata'));
  beforeEach(module('app.index'));
  beforeEach(module('app.templates'));

  beforeEach(inject(function(_tripApi_,
                            _$rootScope_,
                            _mockItinerary_,
                            _mockAlternativeSegment_,
                            _$q_,
                            _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    tripApi = _tripApi_;
    $rootScope = _$rootScope_;
    mockItinerary = _mockItinerary_;
    mockAlternativeSegment = _mockAlternativeSegment_;
    $q = _$q_;

    $httpBackend.whenPOST(/\/api\/search\/trips/).respond(mockItinerary);

    var returnValue;
    tripApi
      .findItinerary()
      .then(function(itinerary) {
        returnValue = itinerary;
      });

    $rootScope.$digest();
    $httpBackend.flush();
    itinerary = returnValue[0];
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
    expect(itinerary.hasOwnProperty('groupSegment')).toEqual(true);

    expect(itinerary.duration).toEqual(250);
    expect(itinerary.cost).toEqual(360);
    expect(1 in itinerary.groupSegment).toEqual(true);
    expect(2 in itinerary.groupSegment).toEqual(true);
    expect(3 in itinerary.groupSegment).toEqual(false);
  });

  it('change cost and duration after change alternative segment', function() {
    var returnValue, itinerary;
    tripApi
      .findItinerary()
      .then(function(itinerary) {
        returnValue = itinerary;
      });
    $rootScope.$digest();
    $httpBackend.flush();
    itinerary = returnValue[0];
    tripApi.replaceSegmentWithAlternatives(itinerary, 1, mockAlternativeSegment[0]);
  });


});
