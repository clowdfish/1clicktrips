(function() {
  angular
    .module('app.dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  function dashboardCtrl($scope, favoriteService, bookingService) {
    $scope.isLogin = true;
    $scope.favoriteList = [];
    $scope.bookedTripList = [];

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