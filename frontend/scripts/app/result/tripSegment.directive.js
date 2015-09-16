angular
  .module('app.result')
  .directive('tripSegment', tripSegment);

function tripSegment(SEGMENT_ZOOM_THRESHOLD, SEGMENT_ZOOM_WIDTH) {

  return {
    restrict: 'E',
    templateUrl: 'scripts/app/templates/result/trip-segment.html',
    replace: true,
    scope: {
      segment: '=',
      ratio: '@',
      showMajor: '@',
      setDimensions: '&',
      defineLeftMargin: '&'
    },
    link: link
  };

  function link(scope, element, attrs) {

    scope.majorAlternatives = scope.showMajor == 'true';
    scope.minorAlternatives = scope.showMajor == 'false';

    scope.zoomToSegment = zoomToSegment;
    scope.zoomOut = zoomOut;

    initialize();

    scope.$on('dimensionChange', function(event, args) {
      scope.width = defineWidth(scope.segment, args['ratio']);

      scope.marginLeft = scope.segment['departureTime'] ?
        scope.defineLeftMargin({ time: scope.segment['departureTime'] }) : 0;
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
     * Zoom segment within segment container.
     *
     */
    function zoomToSegment() {

      if(scope.width < SEGMENT_ZOOM_THRESHOLD) {
        var ratioMultiplier = SEGMENT_ZOOM_WIDTH / scope.width;

        var newRatio = scope.ratio * ratioMultiplier;
        var newIntervalBoundaries =
          defineIntervalBoundaries(
            scope.segment['departureTime'],
            scope.segment['duration'],
            scope.ratio,
            scope.marginLeft,
            newRatio);

        scope.setDimensions({
          data: {
            ratio: newRatio,
            interval: newIntervalBoundaries
          }
        });
      }
    }

    /**
     * Reset trip segment container.
     *
     */
    function zoomOut() {
      scope.setDimensions();
    }


    /**
     * Define the boundaries of a result list item based in the segment to be
     * zoomed.
     *
     * @param departureTime
     * @param duration
     * @param ratio
     * @param leftMargin
     * @param newRatio
     * @returns {*}
     */
    function defineIntervalBoundaries(departureTime,
                                      duration,
                                      ratio,
                                      leftMargin,
                                      newRatio) {

      if(!departureTime)
        return null;

      var departureTimeObject = moment(departureTime, 'YYYY-MM-DDTHH:mm:ss');

      var growth = duration * (newRatio - ratio);

      var newLeftMargin = leftMargin - growth / 2;
      var newRightMargin = leftMargin + ratio * duration + growth / 2;

      if(newLeftMargin < 0)
        newLeftMargin = 0;

      else if(newRightMargin > 100)
        newLeftMargin = 100 - (ratio * duration + growth);

      var leftIntervalBoundary = departureTimeObject
        .clone().subtract(newLeftMargin / newRatio, 'minutes');

      var rightIntervalBoundary = departureTimeObject
        .clone().add((100 - newLeftMargin) / newRatio, 'minutes');

      return {
        start: leftIntervalBoundary,
        end: rightIntervalBoundary
      };
    }
  }
}