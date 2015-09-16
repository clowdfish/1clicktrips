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

    scope.majorAlternatives = scope.showMajor == 'true';
    scope.minorAlternatives = scope.showMajor == 'false';

    scope.zoomToSegment = zoomToSegment;
    scope.zoomOut = zoomOut;

    initialize();

    scope.$on('dimensionChange', function(event, args) {
      scope.width = defineWidth(scope.segment, args['ratio']);

      scope.marginLeft = scope.segment['departureTime'] ?
        scope.defineLeftMargin({ time: scope.segment['departureTime'] }) : 0;

      //console.log("After zoom: " + scope.marginLeft + "; Width: " + scope.width);
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
     */
    function zoomToSegment() {
      var leftBorder = scope.marginLeft;
      var width = scope.width;

      console.log("Before zoom: " + leftBorder + "; Width: " + width);

      if(scope.width < 25) {
        var ratioMultiplier = 40 / scope.width;
        console.log("Ratio multiplier: " + ratioMultiplier);

        var newRatio = scope.ratio * ratioMultiplier;
        var newIntervalBoundaries =
          defineIntervalBoundaries(scope.segment['departureTime'], scope.segment['duration'], scope.ratio, scope.marginLeft, newRatio);

        console.log(JSON.stringify(newIntervalBoundaries, null, 2));

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
      //console.log("Zoom out.");

      scope.setDimensions();
    }


    /**
     *
     *
     * @param departureTime
     * @param duration
     * @param ratio
     * @param leftMargin
     * @param newRatio
     * @returns {*}
     */
    function defineIntervalBoundaries(departureTime, duration, ratio, leftMargin, newRatio) {

      if(!departureTime)
        return null;

      var departureTimeObject = moment(departureTime, 'YYYY-MM-DDTHH:mm:ss');

      console.log(departureTimeObject.toISOString());
      console.log("Left margin: " + leftMargin);
      console.log("Ratio: " + ratio);
      console.log("New ratio: " + newRatio);

      var growth = duration * (newRatio - ratio);

      console.log("Growth: " + growth);

      var newLeftMargin = leftMargin - growth / 2;
      var newRightMargin = leftMargin + ratio * duration + growth / 2;

      if(newLeftMargin < 0)
        newLeftMargin = 0;

      else if(newRightMargin > 100)
        newLeftMargin = 100 - (ratio * duration + growth);

      console.log("New left margin: " + newLeftMargin);
      console.log("New width: " + (ratio * duration + growth));

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