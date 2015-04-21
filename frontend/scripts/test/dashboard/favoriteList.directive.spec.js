describe('favoriteList', function() {
  var $rootScope,
      favoriteApi,
      _$q_,
      $scope,
      directive,
      directiveScope,
      mockFavorites;

  beforeEach(function() {
    module('app.common');
    module('app.dashboard');
    module('app.templates');
    module('mockdata');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$q_,
                            _favoriteApi_,
                            _$compile_,
                            _mockFavorites_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    favoriteApi = _favoriteApi_;
    $q = _$q_;
    mockFavorites = _mockFavorites_;
    spyOn(favoriteApi, 'getFavoriteList').and.callFake(function() {
      return $q(function(resolve) {
        resolve(mockFavorites);
      });
    });
    var favoriteList = null;
    favoriteApi
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

  it('switch to detail view', function() {
    var favorite = mockFavorites[0];
    directiveScope.detailView(favorite);
    expect(directiveScope.isShowingFavoriteDetail).toEqual(true);
    expect(directiveScope.favorite).toEqual(favorite);
  });

});