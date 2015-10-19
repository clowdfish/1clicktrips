/// <reference path="../../_test.ts" />

'use strict';

describe('service: inactivityDectector', () => {
	var inactivityDectector: Common.InactivityDetector,
			inactivityOptions: Common.InactivityDetectorOptions,
			$rootScope,
			$document,
			onTimeout;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject((_$rootScope_,
                     _$timeout_) => {
		$document = setFixtures('<div id="my-fixture"></div>');
		$rootScope = _$rootScope_;
		inactivityDectector = new Common.InactivityDetector($rootScope, _$timeout_);
		jasmine.clock().install();
		onTimeout = jasmine.createSpy('onTimeout');
		inactivityOptions = {
			maxTimeAllow: 3000,
			onTimeout: onTimeout
		};
	}));

	afterEach(() => {
    jasmine.clock().uninstall();
  });

	it('It call timeout event when user is idle', () => {
		jasmine.clock().install();
		inactivityDectector.start(inactivityOptions);
    $rootScope.$digest();
		jasmine.clock().tick(6001);
    $rootScope.$digest();
		expect(inactivityOptions.onTimeout).toHaveBeenCalled();
		jasmine.clock().uninstall();
	});

	it('Does not call timeout event when mouse click', () => {
		jasmine.clock().install();
		inactivityDectector.start(inactivityOptions);
		setTimeout(() => {
			$('#my-fixture').trigger('click');
		}, 2000);
    $rootScope.$digest();
		jasmine.clock().tick(2001);
    $rootScope.$digest();
		jasmine.clock().tick(2001);
    $rootScope.$digest();
		expect(onTimeout).not.toHaveBeenCalled();
		jasmine.clock().uninstall();
	});


});