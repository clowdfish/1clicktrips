/// <reference path="../_test.ts" />

'use strict';

describe('service: itineraryHelper', () => {

	var itineraryHelper: Result.ItineraryHelper,
			mockItineraries;

	beforeEach(angular.mock.module('app'));
	beforeEach(angular.mock.module('mocks'));

	beforeEach(inject((_mockItineraries_) => {
		mockItineraries = _mockItineraries_;
		itineraryHelper = new Result.ItineraryHelper();
	}));

	it('no selection and test segments', () => {
		var itinerary = mockItineraries[0];
		var segments = itineraryHelper.getActiveSegmentFromItinerary(itinerary, {});
		expect(segments.length).toEqual(3);

		var itinerary = mockItineraries[1];
		var segments = itineraryHelper.getActiveSegmentFromItinerary(itinerary, {});
		expect(segments.length).toEqual(5);

		expect(segments[0].price.amount).toEqual(0);
		expect(segments[0].type).toEqual(1);

		expect(segments[1].price.amount).toEqual(17);
		expect(segments[1].type).toEqual(8);
	});

	it('change selection and get segments', () => {
		var itinerary = mockItineraries[1];
		var selection = {
			'0-0-1': {
				timingIndex: 1
			}
		};
		var segments = itineraryHelper.getActiveSegmentFromItinerary(itinerary, selection);
		expect(segments.length).toEqual(4);
		expect(segments[0].price.amount).toEqual(30);
		expect(segments[0].type).toEqual(1);
	});

	it('get segments path', () => {
		var itinerary = mockItineraries[1];
		var paths = itineraryHelper.getActiveSegmentFromItinerary(itinerary, {});
		expect(paths.length).toBeGreaterThan(0);
	});
});