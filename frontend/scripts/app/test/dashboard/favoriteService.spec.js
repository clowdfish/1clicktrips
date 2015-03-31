'use strict';

describe('favoriteService', function() {
  var favoriteService,
      $q,
      $rootScope;

  beforeEach(module('app.dashboard'));
  beforeEach(module('app.templates'));

  beforeEach(inject(function(_$rootScope_,
                            _favoriteService_,
                            _$q_,
                            _mockFavorites_) {
    $rootScope = _$rootScope_;
    favoriteService = _favoriteService_;
    $q = _$q_;

    spyOn(favoriteService, 'getFavoriteList').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve(_mockFavorites_);
      return deferred.promise;
    });

  }));

  it('get favorite list', function() {
    var favorites = [];
    favoriteService
      .getFavoriteList()
      .then(function(data){
        favorites = data;
      });

    $rootScope.$digest();

    expect(favorites.length).toBeGreaterThan(3);
    expect(favorites[0].origin.description).toEqual("9579 Quaking Hill, Panther Valley, Indiana");
  });
});
