(function() {

  'use strict';

  angular
    .module('app.settings')
    .controller('profileCtrl', profileCtrl);

  function profileCtrl($scope,
                      userApi,
                      countryList) {
    $scope.countryList = countryList;
    $scope.userProfile = $scope.$parent.userProfile;
    $scope.isUploading = false;

    $scope.editableFields = {
      firstName: {
        key: 'first_name',
        value: $scope.userProfile.first_name,
        description: 'settings_profile_firstname'
      },
      lastName: {
        key: 'last_name',
        value: $scope.userProfile.last_name,
        description: 'settings_profile_lastname'
      },
      companyName: {
        key: 'company_name',
        value: $scope.userProfile.company_name,
        description: 'settings_profile_company'
      },
      street: {
        key: 'street',
        value: $scope.userProfile.street,
        description: 'settings_profile_address_street'
      },
      zipCode: {
        key: 'zip_code',
        value: $scope.userProfile.zip_code,
        description: 'settings_profile_address_zip'
      },
      city: {
        key: 'city',
        value: $scope.userProfile.city,
        description: 'settings_profile_address_city'
      },
      country: {
        key: 'country',
        value: $scope.userProfile.country,
        options: countryList,
        description: 'settings_profile_address_country'
      }
    };


    $scope.saveProfile = function(key, value) {
      return userApi.setUserProfile(key, value);
    };

    $scope.uploadImage = function(files) {
      if (files.length === 0) {
        return;
      }

      $scope.uploadPercentage = 0;
      $scope.isUploading = true;
      userApi
        .uploadProfilePicture(files[0])
        .progress(function(evt) {
          $scope.uploadPercentage = parseInt(100.0 * evt.loaded / evt.total);
        })
        .success(function(data) {
          $scope.isUploading = false;
          $scope.userProfile.image = data;
        })
        .error(function(data) {
          $scope.isUploading = false;
        });
    }


  }

})();
