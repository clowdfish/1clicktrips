(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('settingsCtrl', settingsCtrl);

  function settingsCtrl($scope,
                        AUTH_EVENTS,
                        $state) {
    $scope.$on(AUTH_EVENTS.logout, function() {
      goToHomePage();
    });

    function goToHomePage() {
      $state.go('index');
    }
  }

})();
