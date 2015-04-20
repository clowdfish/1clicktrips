'use strict';

describe('directive: requestSpinner', function() {
  var $q,
      $http,
      $scope,
      requestSpinner,
      requestSpinnerScope,
      requestSpinnerEvents;

  beforeEach(function() {
    module('app.common');
    module('app.templates');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$q_,
                            _$compile_,
                            _requestSpinnerEvents_) {
    $scope = _$rootScope_.$new();
    var element = angular.element('<request-spinner></request-spinner>');
    requestSpinner = _$compile_(element)($scope);
    $scope.$digest();
    requestSpinnerScope = element.isolateScope();
    $scope.$digest();
    requestSpinnerEvents = _requestSpinnerEvents_;
  }));

  it('requestSpinner shows when receive requestSpinnerEvents.show event', function() {
    $scope.$broadcast(requestSpinnerEvents.show, {
      title: 'showRequestSpinner'
    });
    $scope.$digest();
    expect(requestSpinnerScope.isShowing).toEqual(true);
    expect(requestSpinnerScope.title).toEqual('showRequestSpinner');
  });

  it('requestSpinner hide when receive requestSpinnerEvents.hide event', function() {
    $scope.$broadcast(requestSpinnerEvents.hide);
    $scope.$digest();
    expect(requestSpinnerScope.isShowing).toEqual(false);
  });

});
