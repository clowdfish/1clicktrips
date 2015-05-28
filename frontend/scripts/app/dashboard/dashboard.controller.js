(function() {
  angular
    .module('app.dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  function dashboardCtrl($scope,
                        $rootScope,
                        favoriteList,
                        bookedTripList,
                        browser,
                        AUTH_EVENTS,
                        favoriteApi,
                        bookingApi,
                        newsletterApi) {

    $scope.favoriteList = favoriteList;
    $scope.bookedTripList = bookedTripList;

    $scope.isMobile = browser.isMobileDevice();
    $scope.numberOfFavorites = $scope.isMobile ? 3 : 6;
    $scope.numberOfTrips = $scope.isMobile ? 1 : 3;

    $scope.subscriptionEmail = null;
    $scope.subscriptionStatus = null;
    $scope.selectFavorite = function(favorite) {
      $rootScope.$broadcast('selectFavorite', favorite);
    };

    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
      refreshDashboard();
    });

    $scope.$on(AUTH_EVENTS.signupSuccess, function() {
      refreshDashboard();
    });

    $scope.subscribe = function() {
      var email = $scope.subscriptionEmail;

      if (email == null || email.trim() === '') {
        return;
      }

      $scope.subscribeMessage = null;

      newsletterApi
        .subscribe(email)
        .then(function(message) {
          $scope.subscriptionMessage = message;
          $scope.subscriptionStatus = 'success';

        }, function(message) {
          $scope.subscriptionMessage = message;
          $scope.subscriptionStatus = 'error';
          console.log("Error Response: " + message);
        });
    };

    function refreshDashboard() {
      favoriteApi
        .getFavoriteList()
        .then(function(response) {
          $scope.favoriteList = response;
        });

      bookingApi
        .getBookedTrips()
        .then(function(response) {
          $scope.bookedTripList = response;
        });
    }
  }
})();

