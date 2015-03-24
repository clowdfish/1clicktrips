(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('profileCtrl', profileCtrl);

  function profileCtrl($scope,
                      userService,
                      userProfile) {

    $scope.userProfile = userProfile;

    /**
     * Submit form
     * @return null
     */
    $scope.submit = function() {
      userService
        .setUserProfile($scope.userProfile)
        .then(function() {
          alert('Update profile successful')
        }, function(reason) {
          handleUpdateProfileError(reason);
        });
    }

    function handleUpdateProfileError(reason) {
      alert('There was a problem updating the profile.');
    }
  }

})();
