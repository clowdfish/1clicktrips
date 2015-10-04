/// <reference path="../_test.ts" />

'use strict';

describe('service: suggestionAdapter', () => {

	var suggestionAdapter: Search.SuggestionAdapter,
      $q: ng.IQService,
      $scope,
			mockAddress;

	beforeEach(angular.mock.module('app'));
	beforeEach(angular.mock.module('mocks'));

	beforeEach(inject((_$rootScope_,
										 _$q_,
										 _mockAddress_) => {
		$scope = _$rootScope_.$new();
		$q = _$q_;
    suggestionAdapter = new Search.SuggestionAdapter($q);
		mockAddress = _mockAddress_;

		var deferred = $q.defer();
		deferred.resolve(mockAddress);
    spyOn(suggestionAdapter, 'getAddressSuggestion').and.returnValue(deferred.promise);
	}));

	it('Get address suggestion', () => {
		var suggestionResult = null;
		suggestionAdapter
      .getAddressSuggestion('Stuttgart')
			.then((data) => {
				suggestionResult = data;
			});
		$scope.$digest();
		expect(suggestionResult).toEqual(mockAddress);
	});





});
