(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('settingsCtrl', settingsCtrl);

  function settingsCtrl($scope,
                        userProfile,
                        AUTH_EVENTS,
                        $state) {
  	$scope.$state = $state;
    $scope.userProfile = userProfile;

    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
       $state.reload();
    });

    $scope.$on(AUTH_EVENTS.signupSuccess, function() {
      $state.reload();
    });

    /**
    * Go to homepage when user logout
    */
    $scope.$on(AUTH_EVENTS.logout, function() {
      goToHomePage();
    });

    function goToHomePage() {
      $state.go('index');
    }
  }

})();
