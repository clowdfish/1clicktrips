(function() {
  angular
    .module('app.dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  function dashboardCtrl($scope, $rootScope, favoriteList, bookedTripList) {
    $scope.isLogin = true; //true;
    $scope.favoriteList = favoriteList;
    $scope.bookedTripList = bookedTripList;

    $scope.selectFavorite = function(favorite) {
      $rootScope.$broadcast('selectFavorite', favorite);
    };

  }
})();

