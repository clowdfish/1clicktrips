/// <reference path="../_test.ts" />

'use strict';

describe('controller: resultCtrl', () => {

	var resultCtrl: Result.ResultCtrl,
			$scope,
			$state: ng.ui.IStateService,
			$stateParams,
			$window,
			$q,
			resultState,
			RESULT_STATE,
			tripCache: Result.TripCache,
			tripApi: Result.TripApi,
			searchObject,
			language: Common.Language,
			currency: Common.Currency,
			bookingApi: Booking.BookingApi,
			searchObject;


	beforeEach(angular.mock.module([
    'app',
    'mocks'
	]));

	beforeEach(inject((_$rootScope_,
										 _$state_,
										 _$stateParams_,
										 _$window_,
										 _$q_,
										 _RESULT_STATE_,
										 _$sessionStorage_,
										 _$location_,
										 _$http_,
										 _mockTrip_) => {
		$scope = _$rootScope_.$new();
		$state = _$state_;
		$stateParams = _$stateParams_;
		$window = _$window_;
		$q = _$q_;
		RESULT_STATE = _RESULT_STATE_;
		tripCache = new Result.TripCache(_$sessionStorage_, _$location_);
		tripApi = new Result.TripApi(_$http_, $q);
		language = new Common.Language();
		currency = new Common.Currency();
		bookingApi = new Booking.BookingApi(_$http_, $q, _$sessionStorage_);
		searchObject = {};

		resultCtrl = createResultCtrl(RESULT_STATE.overview);

    var deferred = $q.defer();
    deferred.resolve(_mockTrip_);
    spyOn(tripApi, 'getAvailableItineraries').and.callFake(function() {
      return deferred.promise;
    });
	}));



	function createResultCtrl(state): Result.ResultCtrl {
		return new Result.ResultCtrl($scope,
																 $state,
																 $stateParams,
																 $window,
																 $q,
																 state,
																 RESULT_STATE,
																 tripCache,
																 tripApi,
																 searchObject,
																 language,
																 currency,
																 bookingApi);
	}

	function getDefaultSearchObject() {
		var searchObject = {
      origin: {
        latitude: 1,
        longitude: 1
      },
      originDescription: 'San Diego',
      destination: {
        latitude: 2,
        longitude: 2
      },
      destinationDescription: 'New York',
      timing: [ moment().format('YYYY-MM-DDTHH:mm:ss') ],
      locale: language.get().locale,
      currency: currency.get().code,
      targetDate: moment().add(1, 'days').format('YYYY-MM-DDTHH:mm:ss')
    };

    return searchObject;
	}
});
