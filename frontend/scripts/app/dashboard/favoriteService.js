(function() {
  angular
    .module('app.dashboard')
    .service('favoriteService', favoriteService);

  function favoriteService($http, $q) {
    var _this = this;
    _this.getFavoriteList = getFavoriteList;
    _this.addFavorite = addFavorite;

    function getFavoriteList(arguments) {
      return $q(function(resolve, reject) {
        $http
          .get('/api/account/favorites')
          .success(function(response) {
            resolve(response);
          })
          .error(function(data, status) {
            reject({
              data: data,
              status: status
            });
          });
      });
    }

    function addFavorite(favorite) {
      return $q(function(resolve, reject) {
        $http
          .post('/api/account/favorites', favorite)
          .success(function() {
            resolve();
          })
          .error(function() {
            reject();
          });
      });
    }

    return this;

  }
})();
