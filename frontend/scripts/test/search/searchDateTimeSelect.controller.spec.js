'use strict';

describe('searchDateTimeSelectCtrl', function() {
  var ctrl,
    $scope,
    $rootScope;

  beforeEach(function() {
    module('app');
    module('mockdata');
  });

  beforeEach(inject(function(
                              _$controller_,
                              _$rootScope_,
                              _$q_,
                              _AUTH_EVENTS_) {
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();

    $scope.setStartDate = jasmine.createSpy('setStartDate');
    $scope.setEndDate = jasmine.createSpy('setEndDate');
    $scope.$parent = {
      startDate: new Date(),
      endDate: new Date()
    };
    $scope.$parent.stepAppointment = jasmine.createSpy('setStepAppointment');

    _$controller_('searchDateTimeSelectCtrl', {
      $scope: $scope,
      AUTH_EVENTS: _AUTH_EVENTS_
    });
  }));

  it('open and close date and time picker correctly', function() {
    $scope.toggleStartDatePicker();
    expect($scope.isOpenStartDatePicker).toEqual(true);
    expect($scope.isOpenEndDatePicker).toEqual(false);

    $scope.toggleStartDatePicker();
    expect($scope.isOpenStartDatePicker).toEqual(false);
    expect($scope.isOpenEndDatePicker).toEqual(false);

    $scope.toggleEndDatePicker();
    expect($scope.isOpenEndDatePicker).toEqual(true);
    expect($scope.isOpenStartDatePicker).toEqual(false);

    $scope.toggleEndDatePicker();
    expect($scope.isOpenEndDatePicker).toEqual(false);
    expect($scope.isOpenStartDatePicker).toEqual(false);

  });

  it('test date time valid', function() {
    $scope.startDate = new Date();
    $scope.startTimeString = '12:xyz';
    $scope.updateStartDate();
    expect($scope.setStartDate).not.toHaveBeenCalled();

    $scope.startTimeString = '12:00';
    $scope.updateStartDate();
    expect($scope.setStartDate).toHaveBeenCalledWith({
      startDate: $scope.startDate,
      startTime: $scope.startTimeString
    });
  });

  it('endDate change when startDate change', function() {
    $scope.startDate = new Date();
    $scope.$digest();
    expect($scope.endDate.toDateString()).toEqual($scope.startDate.toDateString());

    var now = new Date();
    now.setFullYear(now.getFullYear() + 1);
    $scope.startDate = now;
    $scope.$digest();
    expect($scope.endDate.toDateString()).toEqual($scope.startDate.toDateString());
  });

});
