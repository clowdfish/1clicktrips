'use strict';

describe('controller: editableCtrl', function() {
  var editableCtrl,
      $scope,
      $q;

  beforeEach(module('app.common'));
  beforeEach(inject(function(_$controller_,
                            _$rootScope_,
                            _$q_) {
    $scope = _$rootScope_.$new();
    //Reset controller variable
    $scope.error = false;
    $scope.success = false;

    $scope.fieldConfig = {
      key: 'first_name',
      value: 'David',
      description: 'my_description'
    };

    editableCtrl = _$controller_('editableCtrl', {
      $scope: $scope
    });
    $q = _$q_;



  }));


  it('save success', function() {
    $scope.saveFn = jasmine.createSpy('saveFn').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    });
    $scope.save('test_key', 'test_value');
    $scope.$digest();
    expect($scope.saveFn).toHaveBeenCalled();
    expect($scope.success).toEqual(true);
    expect($scope.error).toEqual(false);
  });

  it('save fail', function() {
    $scope.saveFn = jasmine.createSpy('saveFn').and.callFake(function() {
      var deferred = $q.defer();
      deferred.reject();
      return deferred.promise;
    });

    $scope.save('test_data');
    $scope.$digest();
    expect($scope.saveFn).toHaveBeenCalled();
    expect($scope.success).toEqual(false);
    expect($scope.error).toEqual(true);
  });
});
