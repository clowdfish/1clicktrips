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
      containerIndex: '@',
      segmentIndex: '@',
      showMajor: '@',
      showMinor: '@'
    },
    link: link
  };

  function link(scope, element, attrs) {

    scope.width = 0;
    scope.marginLeft = 0;

    defineWidth();
    defineMargin();

    function defineWidth() {
      scope.width = scope.segment['duration'] * scope.$parent.ratio; // TODO replace by isolate scope
    }

    function defineMargin() {
      var start = scope.segment['departureTime'];

      if(start)
        scope.marginLeft = scope.$parent.defineMarginLeft(start); // TODO replace by isolate scope
    }
  }
}