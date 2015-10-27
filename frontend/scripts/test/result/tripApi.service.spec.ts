/// <reference path="../_test.ts" />

'use strict';

describe('service: tripApi', () => {

	var tripApi: Result.TripApi,
			$scope,
			$q: ng.IQService,
			$httpBackend: ng.IHttpBackendService,
			$http: ng.IHttpService,
			requestSpinnerEvents;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject((_$rootScope_,
										 _$q_,
										 _$httpBackend_,
										 _$http_,
                     _$translate_,
										 _requestSpinnerEvents_) => {
		$q = _$q_;
		$scope = _$rootScope_.$new();
		$http = _$http_;
		$httpBackend = _$httpBackend_;
		requestSpinnerEvents = _requestSpinnerEvents_;
		var tripApi = new Result.TripApi($http, $q, _$translate_)
	}));

	it('getAvailableItineraries', () => {
		var searchObject = {};
		var itineraries = [
			{
				sessionId: 1
			}
		];
		$httpBackend.expectPOST('/api/search/trips', searchObject).respond(200, itineraries);

		var result = null;
		var showWaitingAnimation = false;

		$scope.$on(requestSpinnerEvents.show, () => {
			showWaitingAnimation = true;
		});

		tripApi
			.getAvailableHotels(searchObject)
			.then((response) => {
				result = response;
			});

		$scope.$digest();

		expect(itineraries).toEqual(result);
		expect(showWaitingAnimation).toEqual(true);
	});
})