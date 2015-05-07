(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('settingsCtrl', settingsCtrl);

  function settingsCtrl($scope,
                        AUTH_EVENTS,
                        $state) {
  	$scope.$state = $state;
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
