(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('profileCtrl', profileCtrl);

  function profileCtrl($scope,
                      userService,
                      userProfile) {

    $scope.userProfile = userProfile;

    $scope.change = function($event) {
      userService
        .setUserProfile($scope.userProfile)
        .then(function() {
          setElementStatus($event.target, 'done');
        }, function(reason) {
          setElementStatus($event.target, 'error', reason.data);
        });
    }

    function setElementStatus(element, status) {
      var statusList = ['error', 'done'];
      if (statusList.indexOf(status) === -1) {
        return;
      }
      statusList.map(function(item) {
        angular.element(element).removeClass(item);
      });
      angular.element(element).addClass(status);
    }

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
          setElementStatus($event.target, 'done');
        })
        .error(function(data) {
          $scope.isUploading = false;
          setElementStatus($event.target, 'error');
        });
    }
  }

})();
