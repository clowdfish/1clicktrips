(function() {
  angular
    .module('app.dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  function dashboardCtrl($scope, $rootScope, favoriteList, bookedTripList, browser) {
    $scope.favoriteList = favoriteList;
    $scope.bookedTripList = bookedTripList;

    $scope.isMobile = browser.isMobileDevice();
    $scope.numberOfFavorites = $scope.isMobile ? 3 : 6;
    $scope.numberOfTrips = $scope.isMobile ? 1 : 3;

    $scope.selectFavorite = function(favorite) {
      $rootScope.$broadcast('selectFavorite', favorite);
    };
  }
})();

