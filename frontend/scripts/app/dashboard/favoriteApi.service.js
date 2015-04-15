(function() {
  angular
    .module('app.dashboard')
    .service('favoriteApi', favoriteApi);

  function favoriteApi($http, $q) {
    var _this = this;

    _this.getFavoriteList = getFavoriteList;
    _this.addFavorite = addFavorite;
    _this.deleteFavorite = deleteFavorite;
    _this.updateFavoritePosition = updateFavoritePosition;

    function getFavoriteList() {
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

    function deleteFavorite(favoriteId) {
      return $q(function(resolve, reject) {
        $http
          .delete('/api/account/favorites/' + favoriteId)
          .success(function() {
            resolve();
          })
          .error(function(data, status) {
            reject({
              data: data,
              status: status
            });
          });
      });
    }

    function updateFavoritePosition(positionData) {
      return $q(function(resolve, reject) {
        $http
          .post('/api/account/favorites/updateposition', positionData)
          .success(function() {
            resolve();
          })
          .error(function() {
            reject();
          })
      });
    }

    return this;

  }
})();
