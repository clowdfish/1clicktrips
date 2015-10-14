/// <reference path="../_test.ts" />

'use strict';

describe('controller: searchCtrl', () => {

	var $scope,
			$state: ng.ui.IStateService,
			searchCtrl: Search.SearchCtrl;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject((_$rootScope_: ng.IRootScopeService,
										 _$state_: ng.ui.IStateService) => {
		$scope = _$rootScope_.$new();
		$state = _$state_;

		searchCtrl = new Search.SearchCtrl($scope, $state, getDefaultSearchFormData());
		searchCtrl.$scope.schedule.origin = 'New York';
		searchCtrl.$scope.schedule.destination = 'San Diego';
		searchCtrl.$scope.startDateString = '10/10/2030';
		searchCtrl.$scope.startTimeString = '10:10';
	}));

	it('validate form input', () => {
		var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(true);

		searchCtrl.$scope.schedule.origin = null;
		searchCtrl.$scope.schedule.destination = null;
		searchCtrl.$scope.startDateString = null;
		searchCtrl.$scope.startTimeString = null;
		var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(false);
	});

	it('validate start date and time', () => {
		searchCtrl.$scope.startDateString = '1/1/2030';
		searchCtrl.$scope.startTimeString = '10:10';
		var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(false);

		searchCtrl.$scope.startDateString = '10/10/2030';
		searchCtrl.$scope.startTimeString = '10';
		var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(false);

		searchCtrl.$scope.startDateString = null;
		searchCtrl.$scope.startTimeString = null;
		var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(false);

	});

	it('go to result page', () => {
		searchCtrl.startSearch();
		$scope.$digest();
		expect($state.current.name).toEqual('result.list');
	});

	function getDefaultSearchFormData() {
		var startDate = new Date();
    startDate.setDate(startDate.getDate() + 10);

    var startDateObject = moment(startDate);
    var startTimeString = "14:00";

		return {
			originLocation: null,  // the location data
      destinationLocation: null,  // the location data
      startDate: startDateObject,
      origin: null, // the location description
      destination: null, // the location description
      startTimeString: startTimeString,
      targetDate: true
		}

	}
});