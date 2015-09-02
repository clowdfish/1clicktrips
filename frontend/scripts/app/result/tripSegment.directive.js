angular
  .module('app.result')
  .directive('tripSegment', tripSegment);

function tripSegment() {

  return {
    restrict: 'E',
    templateUrl: 'scripts/app/templates/result/trip-segment.html',
    replace: true,
    scope: {
      segment: '=',
      showMajor: '=',
      showMinor: '='
    },
    link: link
  };

  function link(scope, element, attrs) {

  }
}