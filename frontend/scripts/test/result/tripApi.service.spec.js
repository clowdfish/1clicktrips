'use strict';

describe('service: tripApi', function() {
  var tripApi,
      $httpBackend,
      itinerary,
      mockAlternativeSegment,
      mockItinerary,
      mockHotels,
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
                            _mockHotels_,
                            _$q_,
                            _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    tripApi = _tripApi_;
    $rootScope = _$rootScope_;
    mockItinerary = _mockItinerary_;
    mockAlternativeSegment = _mockAlternativeSegment_;
    mockHotels = _mockHotels_;
    $q = _$q_;

    $httpBackend.whenPOST(/\/api\/search\/trips/).respond(mockItinerary);

    var searchObject = {};
    var additionData = {
      startDate: new Date(),
      endDate: new Date(),
      origin: 'Ha Noi',
      destination: 'Ho Chi Minh'
    }
    tripApi
      .findItinerary(searchObject, additionData)
      .then(function(data) {
        itinerary = data;
      });

    $rootScope.$digest();
    $httpBackend.flush();
  }));

  it('it find and have valid data', function() {
    var trip = itinerary[0];
    expect(trip.hasOwnProperty('outbound')).toEqual(true);
    expect(trip.hasOwnProperty('inbound')).toEqual(false);
    expect(trip.hasOwnProperty('cost')).toEqual(true);
    expect(trip.hasOwnProperty('currency')).toEqual(true);
    expect(trip.hasOwnProperty('startTime')).toEqual(true);
    expect(trip.hasOwnProperty('endTime')).toEqual(true);
    expect(trip.hasOwnProperty('duration')).toEqual(true);
    expect(trip.hasOwnProperty('groupSegment')).toEqual(true);

    expect(trip.duration).toEqual(250);
    expect(trip.cost).toEqual(360);
    expect(0 in trip.groupSegment).toEqual(true);
    expect(1 in trip.groupSegment).toEqual(false);
  });

  it('change cost and duration after change alternative segment', function() {
    var trip = itinerary[0];
    expect(trip.cost).toEqual(360);
    trip = tripApi.replaceSegmentWithAlternatives(trip, 0, mockAlternativeSegment[0]);
    expect(trip.cost).toEqual(370);
  });

  it('increase cost after select hotel', function() {
    var trip = itinerary[0];
    expect(trip.cost).toEqual(360);
    trip = tripApi.setSegmentHotel(trip, trip.groupSegment[0][1], mockHotels[0]);
    expect(trip.cost).toEqual(360 + mockHotels[0].price);
  });


});
