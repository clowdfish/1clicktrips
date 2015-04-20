'use strict';

describe('directive: editableTextField', function() {
  var editableTextField,
      $q,
      $scope,
      editableTextFieldScope;

  beforeEach(module('app'));
  beforeEach(module('app.common'));
  beforeEach(module('app.templates'));

  beforeEach(inject(function(_$rootScope_,
                            _$compile_,
                            _$q_) {
    $scope = _$rootScope_.$new();
    $q = _$q_;

    var element = angular.element('<editable-text-field ' +
                                  ' label="description" ' +
                                  ' key="key" '           +
                                  ' value="value" '       +
                                  ' save="saveSetting"> ' +
                                  '</editable-text-field>');

    $scope.saveSetting = jasmine.createSpy('saveSetting').and.callFake(function() {
      return $q(function(resolve, reject) {
        resolve();
      });
    });
    $scope.key = 'first_name';
    $scope.value = 'David';
    $scope.description = 'my_description';

    editableTextField = _$compile_(element)($scope);
    $scope.$digest();

    editableTextFieldScope = element.isolateScope();
    $scope.$digest();
  }));


  it('test valid html', function() {
    expect(editableTextField.html()).toContain('my_description');
  });

});
