/// <reference path="../_test.ts" />

'use strict';

describe('service: tripCache', () => {
	var $sessionStorage,
			$location: ng.ILocationService,
			tripCache: Result.TripCache;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject((_$sessionStorage_,
										 _$location_: ng.ILocationService) => {
		$sessionStorage = _$sessionStorage_;
		$location = _$location_;
		tripCache = new Result.TripCache($sessionStorage, $location);
	}));

	it('store trip', () => {
		var mockTrip = 'sample_trip_data';
		$location.url('/example_url');
		tripCache.storeTrip(mockTrip);
		var cachedTrip = tripCache.getCachedTrip();
		expect(mockTrip).toEqual(cachedTrip);
	});

	it('change location so tripCache is not same', () => {
		var mockTrip = 'sample_trip_data';
		$location.url('/example_url');
		tripCache.storeTrip(mockTrip);

		var anotherTrip = 'another_trip_data';
		$location.url('/another_url');
		tripCache.storeTrip(anotherTrip);
		var cachedTrip = tripCache.getCachedTrip();

		expect(cachedTrip).not.toEqual(mockTrip);
		expect(cachedTrip).toEqual(anotherTrip);
	});

});