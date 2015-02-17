(function() {
  angular
    .module('app.dashboard')
    .service('favoriteService', favoriteService);

  function favoriteService($http, $q) {
    var _this = this;
    _this.getFarvoriteList = getFarvoriteList;

    function getFarvoriteList(arguments) {
      var deferred = $q.defer();
      $http
        .get('api/account/favorites')
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function() {
          deferred.reject();
        });
      return deferred.promise;
    }

  }
})();