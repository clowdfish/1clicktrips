/// <reference path="../_test.ts" />

'use strict';

describe('controller: searchOriginCtrl', () => {

	var $scope,
			searchOriginCtrl;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject((_$rootScope_,
										_suggestionAdapter_,
										_googleMap_) => {
		$scope = _$rootScope_.$new();
		searchOriginCtrl = new Search.SearchOriginCtrl($scope, _suggestionAdapter_, _googleMap_);
	}));		
});