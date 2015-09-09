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
      ratio: '=',
      containerIndex: '@',
      segmentIndex: '@',
      showMajor: '@',
      defineLeftMargin: '&'
    },
    link: link
  };

  function link(scope, element, attrs) {

    scope.majorAlternatives = scope.showMajor == 'true';
    scope.minorAlternatives = scope.showMajor == 'false';

    scope.zoomToSegment = zoomToSegment;
    scope.zoomOut = zoomOut;

    var departureTime = scope.segment['departureTime'];

    scope.width = defineWidth(scope.segment, scope.ratio);
    scope.marginLeft = departureTime ?
      scope.defineLeftMargin({ time: departureTime }) : 0;

    scope.$on('dimensionChange', function(event, args){
      scope.width = defineWidth(scope.segment, args['ratio']);
      scope.marginLeft = departureTime ?
        scope.defineLeftMargin({ time: departureTime }) : 0;
    });

    /**
     * Define width of segment within the trip segment container.
     *
     * @param segment
     * @param ratio
     */
    function defineWidth(segment, ratio) {
      // do not show segments without concrete timings
      return segment['departureTime'] ?
        segment['duration'] * ratio : 0;
    }

    /**
     *
     *
     * @param containerIndex
     * @param segmentIndex
     */
    function zoomToSegment(containerIndex, segmentIndex) {
      console.log("Zoom in.");
    }

    /**
     *
     *
     */
    function zoomOut() {
      console.log("Zoom out.");
    }
  }
}