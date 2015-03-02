(function() {
  angular
    .module('app.dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  function dashboardCtrl($scope, $rootScope, favoriteService, bookingService) {
    $scope.isLogin = true; //true;
    $scope.favoriteList = [];
    $scope.bookedTripList = [];

    $scope.selectFavorite = function(favorite) {
      $rootScope.$broadcast('selectFavorite', favorite);
    };

    favoriteService
      .getFavoriteList()
      .then(function(data) {
        $scope.favoriteList = data;
      });

    bookingService
      .getBookedTrips()
      .then(function(data) {
        $scope.bookedTripList = data;
      });
  }
<<<<<<< HEAD
})();
=======

})();
>>>>>>> 7ce2123... fix unit test
