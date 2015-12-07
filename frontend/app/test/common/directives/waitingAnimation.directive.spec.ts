/// <reference path="../../_test.ts" />

'use strict';

describe('directive: waitingAnimation', () => {

	var $q,
      $http,
      $scope,
			$timeout,
      waitingAnimation,
      waitingAnimationScope,
      requestSpinnerEvents;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject((_$rootScope_: ng.IRootScopeService,
										_$q_: ng.IQService,
										_$compile_: ng.ICompileService,
										_requestSpinnerEvents_,
										_$timeout_) => {
		$scope = _$rootScope_.$new();
		$timeout = _$timeout_;
		var element = angular.element('<waiting-animation></waiting-animation>');
		waitingAnimation = _$compile_(element)($scope);
		$scope.$digest();
		waitingAnimationScope = element.isolateScope();
		requestSpinnerEvents = _requestSpinnerEvents_;
	}));

	it('show waitingAnimation', () => {
		$scope.$broadcast(requestSpinnerEvents.show, {
			title: 'MyTitle'
		});
		$scope.$digest();
		expect(waitingAnimationScope.isShowing).toEqual(true);
		expect(waitingAnimationScope.title).toEqual('MyTitle');
	});

	it('Hide waitingAnimation', () => {
		$scope.$broadcast(requestSpinnerEvents.hide);
		$scope.$digest();
		expect(waitingAnimationScope.isShowing).toEqual(false);
	});

	it('Rotate message', () => {
		$scope.$broadcast(requestSpinnerEvents.show, {
			activeMessages: [
				{
					title: "message1",
					time: 1000
				},
				{
					title: "message2",
					time: 1000
				}
			]
		});
		$scope.$digest();
		expect(waitingAnimationScope.title).toEqual('message1');
		$timeout(() => {
			console.log('Timeout');
			$scope.$digest();
			expect(waitingAnimationScope.title).toEqual('message2');
		}, 3000);
	});

});