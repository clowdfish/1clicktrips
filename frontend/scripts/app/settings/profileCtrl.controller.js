(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('profileCtrl', profileCtrl);

  function profileCtrl($scope,
                      userApi,
                      userProfile,
                      countryList) {

    $scope.countryList = countryList;
    $scope.userProfile = userProfile;
    $scope.isUploading = false;

    $scope.saveProfile = function(key, value) {
      return userApi.setUserProfile(key, value);
    };

    $scope.uploadImage = function($event) {
      $scope.uploadPercentage = 0;
      $scope.isUploading = true;
      userApi
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
