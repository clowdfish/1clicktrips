describe('searchCtrl', function() {
  var searchCtrl,
    $scope,
    suggestionAdapter,
    SUGGESTION_TYPES;

  beforeEach(module('app.search'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _suggestionAdapter_, _SUGGESTION_TYPES_ ) {
    $scope = _$rootScope_.$new();
    SUGGESTION_TYPES = _SUGGESTION_TYPES_;
    suggestionAdapter = _suggestionAdapter_;
    searchCtrl = _$controller_('searchCtrl', {
      $scope: $scope,
      SUGGESTION_TYPES: SUGGESTION_TYPES,
      suggestionAdapter: suggestionAdapter
    });
  }));

  it('has valid initial data', function() {
    expect($scope.step).toEqual(1);
    expect($scope.destinationType).toEqual(SUGGESTION_TYPES.address);
  });

  it('change step correctly', function() {
    $scope.step1();
    expect($scope.step).toEqual(1);
    $scope.step2();
    expect($scope.step).toEqual(2);
    $scope.step3();
    expect($scope.step).toEqual(3);
  });

  it('gets suggestion correctly', function() {

  });

});