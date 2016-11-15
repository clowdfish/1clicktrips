/// <reference path="../_test.ts" />

'use strict';

describe('controller: searchCtrl', () => {

	var $scope,
			$state: ng.ui.IStateService,
      $q,
      suggestionAdapter: Search.SuggestionAdapter,
      googleMap: Common.GoogleMap,
      language: Common.Language,
      browser: Common.Browser,
			searchCtrl: Search.SearchCtrl;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject((_$rootScope_: ng.IRootScopeService,
										 _$state_: ng.ui.IStateService,
                     _$q_,
                     _language_: Common.Language,
                     _currency_: Common.Currency) => {
    window['locale'] = 'en';
		$scope = _$rootScope_.$new();
		$state = _$state_;
    $q = _$q_;
    suggestionAdapter = new Search.SuggestionAdapter($q);
    googleMap = new Common.GoogleMap(new Common.Browser());
    language = _language_;
    language.initialize();
    _currency_.initialize();
		searchCtrl = new Search.SearchCtrl($scope, $state, false, getDefaultSearchFormData(), suggestionAdapter, googleMap, language, $q);
		searchCtrl.$scope.schedule.origin = 'New York';
		searchCtrl.$scope.schedule.destination = 'San Diego';
		searchCtrl.$scope.schedule.time = moment().year(2030).toDate();
	}));

  it('validation success if data is ready', () => {
    searchCtrl.$scope.schedule.origin = 'New York';
		searchCtrl.$scope.schedule.destination = 'San Diego';
		searchCtrl.$scope.schedule.time = moment().year(2030).toDate();
    var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(true);
  });

	it('validation fail is locations are missing', () => {
		var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(true);

		searchCtrl.$scope.schedule.origin = null;
		searchCtrl.$scope.schedule.destination = null;

		var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(false);
	});

  it('validation fail if schedule time is null', () => {
    searchCtrl.$scope.schedule.time = null;
    var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(false);
  });

  it('validation fail if schedule time in the past', () => {
    searchCtrl.$scope.schedule.time = moment().year(2000).toDate();
    var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(false);
  });

  it('validation fail if timestring invalid', () => {
    searchCtrl.$scope.timeString = '1199';
    searchCtrl.$scope.$digest();
    var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(false);

    searchCtrl.$scope.timeString = '';
    searchCtrl.$scope.$digest();
    var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(false);

    searchCtrl.$scope.timeString = undefined;
    searchCtrl.$scope.$digest();
    var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(false);

    searchCtrl.$scope.timeString = 'abcde';
    searchCtrl.$scope.$digest();
    var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(false);
  });

  it('validation success if timeString is in correct format', () => {
    searchCtrl.$scope.timeString = '2210';
    searchCtrl.$scope.$digest();
    var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(true);

    searchCtrl.$scope.timeString = '22:10';
    searchCtrl.$scope.$digest();
    var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(true);

    searchCtrl.$scope.timeString = '09:10';
    var validate = searchCtrl.validateFormInput();
		expect(validate).toEqual(true);
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