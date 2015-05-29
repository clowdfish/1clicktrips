'use strict';

describe('bookingApi: service', function() {
  var $q,
      $httpBackend,
      $sessionStorage,
      bookingApi;

  beforeEach(function() {
    module('app');
  });

  beforeEach(inject(function(_$q_,
                            _$httpBackend_,
                            _$sessionStorage_,
                            _bookingApi_) {
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    $sessionStorage = _$sessionStorage_;
    bookingApi = _bookingApi_;
  }));

  it('set/get/remove share trip data correctly', function() {
    var itineraries = {
      sampleData: 1
    };
    var tripType = 0;
    var searchParams = {
      origin: 'San Diego'
    };

    bookingApi.setShareTripData(itineraries, tripType, searchParams);
    var shareTripData = bookingApi.getShareTripData();

    expect(shareTripData['itineraries']).toEqual(itineraries);
    expect(shareTripData['tripType']).toEqual(tripType);
    expect(shareTripData['searchParams']).toEqual(searchParams);

    bookingApi.removeShareTripData();
    shareTripData = bookingApi.getShareTripData();
    expect(shareTripData).toEqual(null);
  });

});
