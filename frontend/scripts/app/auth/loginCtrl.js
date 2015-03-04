(function() {

  'use strict';

  angular
    .module('app.auth')
    .controller('loginCtrl', loginCtrl);

  function loginCtrl($scope, $window) {
    $scope.loginTwitter = loginTwitter;

    function loginTwitter() {
      createAuthDialog();
    }

    function createAuthDialog() {
      var url = '/api/auth/twitter';
      var width = 800;
      var height = 550;
      var top = ($window.outerHeight - height) / 2;
      var left = ($window.outerWidth - width) / 2;
      var windowOptions = 'width=' + width;
      windowOptions += ',height=' + height;
      windowOptions += ',scrollbars=0';
      windowOptions += ',top=' + top;
      windowOptions += ',left=' + left;
      $window.open(url, 'twitter_login', windowOptions);
    }
  }
})();
