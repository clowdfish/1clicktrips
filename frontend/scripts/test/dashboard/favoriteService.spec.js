'use strict';

describe('favoriteApi', function() {
  var favoriteApi,
      $q,
      $rootScope;

  beforeEach(function() {
    module('app.dashboard');
    module('app.templates');
    module('mockdata');
  })

  beforeEach(inject(function(_$rootScope_,
                            _favoriteApi_,
                            _$q_,
                            _mockFavorites_) {
    $rootScope = _$rootScope_;
    favoriteApi = _favoriteApi_;
    $q = _$q_;

    spyOn(favoriteApi, 'getFavoriteList').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve(_mockFavorites_);
      return deferred.promise;
    });

  }));

  it('get favorite list', function() {
    var favorites = [];
    favoriteApi
      .getFavoriteList()
      .then(function(data){
        favorites = data;
      });

    $rootScope.$digest();

    expect(favorites.length).toBeGreaterThan(3);
    expect(favorites[0].origin.description).toEqual("9579 Quaking Hill, Panther Valley, Indiana");
  });
});
