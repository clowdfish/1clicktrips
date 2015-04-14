(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('settingsCtrl', settingsCtrl);

  function settingsCtrl($scope,
                        AUTH_EVENTS,
                        $state) {

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
