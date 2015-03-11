describe('favoriteList', function() {
  var $rootScope,
      favoriteService,
      _$q_,
      $scope,
      directive,
      directiveScope,
      mockFavorites;

  beforeEach(module('app.common'));
  beforeEach(module('app.dashboard'));
  beforeEach(module('app-templates'));

  beforeEach(inject(function(_$rootScope_,
                            _$q_,
                            _favoriteService_,
                            _$compile_,
                            _mockFavorites_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    favoriteService = _favoriteService_;
    $q = _$q_;
    mockFavorites = _mockFavorites_;
    spyOn(favoriteService, 'getFavoriteList').and.callFake(function() {
      return $q(function(resolve) {
        resolve(mockFavorites);
      });
    });
    var favoriteList = null;
    favoriteService
      .getFavoriteList()
      .then(function(data) {
        favoriteList = data;
      });
    $scope.$digest();
    $scope.favoriteList = favoriteList;
    var element = angular.element('<favorite-list list-items="favoriteList" item-per-page="3" select-favorite="selectFavorite"></favorite=list>');
    directive = _$compile_(element)($scope);
    $scope.$digest();
    directiveScope = directive.isolateScope();
    $scope.$digest();
  }));

  it('scope has valid data', function() {
    expect(directiveScope.listItems.length).toBeGreaterThan(0);
    expect(directiveScope.itemPerPage).toEqual(3);
    expect(directiveScope.totalPage).toBeGreaterThan(0);
  });

  it('directive work correctly', function() {
    expect(directiveScope.currentPage).toEqual(1);
    expect(directiveScope.disablePreviousPageButton).toEqual(true);

    directiveScope.nextPage();
    expect(directiveScope.currentPage).toEqual(2);
    expect(directiveScope.disableNextPageButton).toEqual(true);
    expect(directiveScope.disablePreviousPageButton).toEqual(false);
    expect(directiveScope.slideDirection).toEqual('slide-left');
    directiveScope.nextPage();
    expect(directiveScope.currentPage).toEqual(2);

    directiveScope.previousPage();
    expect(directiveScope.currentPage).toEqual(1);
    expect(directiveScope.disableNextPageButton).toEqual(false);
    expect(directiveScope.disablePreviousPageButton).toEqual(true);
    expect(directiveScope.slideDirection).toEqual('slide-right');
  });

  it('directive has valid html', function() {
    var html = directive.html();
    expect(html).toContain('9579 Quaking Hill, Panther Valley, Indiana');
    expect(html).toContain('Double Tree by Hilton Metropolitan, New York, USA');
  });

});
