(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('forgotPasswordCtrl', forgotPasswordCtrl);

  function forgotPasswordCtrl($scope, $modalInstance, authApi) {
    $scope.sent = false;
    $scope.submit = function() {
      $scope.sent = false;
      $scope.error = false;
      authApi
        .forgotPassword($scope.email)
        .then(function() {
          $scope.sent = true;
        }, function(reason) {
          $scope.error = reason.data;
        });
    };

    $scope.cancel = function() {
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }
  }

})();
