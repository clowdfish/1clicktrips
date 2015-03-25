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

    $scope.uploadImage = function() {
      $scope.uploadPercentage = 0;
      $scope.uploadSuccess = false;
      userService
        .uploadProfilePicture($scope.profilePicture)
        .progress(function(evt) {
          $scope.uploadPercentage = parseInt(100.0 * evt.loaded / evt.total);
        })
        .success(function(data) {
          $scope.uploadSuccess = true;
          $scope.userProfile.image = data;
        })
        .error(function(data) {
          alert("Can not upload image");
        });
    }
  }

})();
