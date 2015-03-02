'use strict';

describe('searchDateTimeSelectCtrl', function() {
  var ctrl,
    $scope,
    $rootScope;

  beforeEach(module('app.search'));
  beforeEach(module('app.common'));
  beforeEach(module('app.index'));

  beforeEach(inject(function(
                              _$controller_,
                              _$rootScope_,
                              _$q_) {
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    _$controller_('searchDateTimeSelectCtrl', {
      $scope: $scope
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
    $scope.$parent.startDate = new Date();
    $scope.$parent.endDate = new Date();
    $scope.$parent.startTime = new Date();
    $scope.$parent.endTime = new Date();
    $rootScope.$digest();
    expect($scope.$parent.isStep2Ready).toEqual(true);
  });
});
