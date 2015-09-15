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
      ratio: '@',
      containerIndex: '@',
      segmentIndex: '@',
      showMajor: '@',
      setDimensions: '&',
      defineLeftMargin: '&'
    },
    link: link
  };

  function link(scope, element, attrs) {

    console.log("Ratio in child: " + scope.ratio);

    scope.majorAlternatives = scope.showMajor == 'true';
    scope.minorAlternatives = scope.showMajor == 'false';

    scope.zoomToSegment = zoomToSegment;
    scope.zoomOut = zoomOut;

    initialize();

    scope.$on('dimensionChange', function(event, args) {
      scope.width = defineWidth(scope.segment, args['ratio']);

      scope.marginLeft = scope.segment['departureTime'] ?
        scope.defineLeftMargin({ time: scope.segment['departureTime'] }) : 0;

      console.log("After zoom: " + scope.marginLeft + "; Width: " + scope.width);
    });

    /**
     * Set initial values to the segment.
     *
     */
    function initialize() {

      scope.width = defineWidth(scope.segment, scope.ratio);

      scope.marginLeft = scope.segment['departureTime'] ?
        scope.defineLeftMargin({ time: scope.segment['departureTime'] }) : 0;
    }

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
      var leftBorder = scope.marginLeft;
      var width = scope.width;

      console.log("Before zoom: " + leftBorder + "; Width: " + width);

      if(scope.width < 25) {
        var ratioMultiplier = 50 / scope.width;
        console.log("Ratio multiplier: " + ratioMultiplier);

        scope.setDimensions({
          ratio: scope.ratio * ratioMultiplier,
          data: {
            start: "", // TODO calculate interval start
            end: "" // TODO calculate interval end
          }
        });
      }
    }

    /**
     * Reset trip segment container.
     *
     */
    function zoomOut() {
      console.log("Zoom out.");

      scope.setDimensions();
    }
  }
}