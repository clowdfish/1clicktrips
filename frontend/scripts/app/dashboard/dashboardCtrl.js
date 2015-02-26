(function() {
  angular
    .module('app.dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  function dashboardCtrl($scope, $rootScope, favoriteService, bookingService) {
    $scope.isLogin = true; //true;
    $scope.favoriteList = [];
    $scope.bookedTripList = [];

    $scope.selectFavorite = function(favorite) {
      console.log(favorite);
      $rootScope.$broadcast('selectFavorite', favorite);
    }

    favoriteService
      .getFarvoriteList()
      .then(function(data) {
        $scope.favoriteList = data;
      });

    bookingService
      .getBookedTrips()
      .then(function(data) {
        $scope.bookedTripList = data;
      });

  }

})();