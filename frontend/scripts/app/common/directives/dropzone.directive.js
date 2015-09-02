angular
  .module('app.common')
  .directive('dropzone', button);

function button() {

  return {
    restrict: 'E',
    templateUrl: 'scripts/app/templates/directives/dropzone.html',
    link: link,
    controller: dropzoneCtrl
  };

  function link(scope, element, attributes) {

  }

  function dropzoneCtrl($scope, $timeout) {

    $scope.$watch('file', function () {
      if ($scope.file != null) {
        // do something with $scope.file
      }
    });
  }
}