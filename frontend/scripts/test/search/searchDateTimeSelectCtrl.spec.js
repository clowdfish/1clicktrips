'use strict';

describe('searchDateTimeSelectCtrl', function() {
  var ctrl,
    $scope,
    $rootScope;

  beforeEach();
  beforeEach();
  beforeEach();
  beforeEach();
  beforeEach();

  beforeEach(function() {
    module('app.search');
    module('app.common');
    module('app.index');
    module('app.auth');
    module('app.templates');
    module('mockdata');
  });

  beforeEach(inject(function(
                              _$controller_,
                              _$rootScope_,
                              _$q_,
                              _AUTH_EVENTS_) {
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    _$controller_('searchDateTimeSelectCtrl', {
      $scope: $scope,
      AUTH_EVENTS: _AUTH_EVENTS_
    });
  }));

  it('open and close date and time picker correctly', function() {
    $scope.openStartDatePicker();
    expect($scope.isOpenStartDatePicker).toEqual(true);
    expect($scope.isOpenEndDatePicker).toEqual(false);
    expect($scope.isOpenStartTimePicker).toEqual(false);
    expect($scope.isOpenEndTimePicker).toEqual(false);

    $scope.openEndDatePicker();
    expect($scope.isOpenStartDatePicker).toEqual(false);
    expect($scope.isOpenEndDatePicker).toEqual(true);
    expect($scope.isOpenStartTimePicker).toEqual(false);
    expect($scope.isOpenEndTimePicker).toEqual(false);
  });

  it('watch for isStep2Ready value correctly', function() {
    $scope.$parent.isStep1Ready = true;
    $scope.$parent.startDate = new Date();
    $scope.$parent.endDate = new Date();

    $rootScope.$digest();
    expect($scope.$parent.isStep2Ready).toEqual(true);
  });
});
