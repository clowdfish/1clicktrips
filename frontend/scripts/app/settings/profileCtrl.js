(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('profileCtrl', profileCtrl);

  function profileCtrl($scope,
                      userService,
                      userProfile,
                      countryList) {

    $scope.countryList = countryList;
    $scope.userProfile = userProfile;
    $scope.isUploading = false;

    $scope.saveProfile = function(key, value) {
      return userService.setUserProfile(key, value);
    };

    $scope.uploadImage = function($event) {
      $scope.uploadPercentage = 0;
      $scope.isUploading = true;
      userService
        .uploadProfilePicture($scope.profilePicture)
        .progress(function(evt) {
          $scope.uploadPercentage = parseInt(100.0 * evt.loaded / evt.total);
        })
        .success(function(data) {
          $scope.isUploading = false;
        })
        .error(function(data) {
          $scope.isUploading = false;
        });
    }
  }

})();
