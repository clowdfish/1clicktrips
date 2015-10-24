/// <reference path="../../_all.ts" />

module Result {

  'use strict';

  export class TripSegment {

    public restrict = 'E';
    public templateUrl = 'scripts/app/templates/result/trip-segment.html';
    public replace = true;
    public scope = {
      segment: '=',
      ratio: '@',
      setDimensions: '&',
      defineLeftMargin: '&'
    };
    public link: (scope, element, attrs) => void;

    public static Factory() {

      var directive = ($rootScope, SEGMENT_ZOOM_THRESHOLD, SEGMENT_ZOOM_WIDTH): any => {
        return new TripSegment($rootScope, SEGMENT_ZOOM_THRESHOLD, SEGMENT_ZOOM_WIDTH);
      };

      directive['$inject'] = ['$rootScope', 'SEGMENT_ZOOM_THRESHOLD', 'SEGMENT_ZOOM_WIDTH'];
      return directive;
    }

    constructor($rootScope,
                SEGMENT_ZOOM_THRESHOLD,
                SEGMENT_ZOOM_WIDTH) {

      TripSegment.prototype.link = (scope, element, attrs) => {

        scope.zoomState = 0;

        scope.zoomToSegment = zoomToSegment;
        scope.zoomOut = zoomOut;

        initialize();

        scope.$on('dimensionChange', (event, args) => {
          initialize(args['ratio']);
        });

        /**
         * Set initial values to the segment.
         *
         */
        function initialize(ratio?) {

          ratio = ratio ? ratio : scope.ratio;

          scope.width = defineWidth(scope.segment, ratio);

          //var oldMargin = scope.marginLeft;

          scope.marginLeft = scope.segment['departureTime'] ?
            scope.defineLeftMargin({time: scope.segment['departureTime']}) : 0;

          //console.log("Old margin/new margin: " + oldMargin + "/" + scope.marginLeft);
        }

        /**
         * Define width of segment within the trip segment container.
         *
         * @param segment
         * @param ratio
         */
        function defineWidth(segment:any,
                             ratio:number) {

          // do not show segments without concrete timings
          return segment['departureTime'] ?
          segment['duration'] * ratio : 0;
        }

        /**
         * Zoom segment within segment container.
         *
         */
        function zoomToSegment() {

          if(scope.zoomState === 1) {
            zoomOut();
            return;
          }

          if (scope.width < SEGMENT_ZOOM_THRESHOLD) {
            scope.zoomState = 1;

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

          $rootScope.$broadcast('zoomSegment', scope.segment);
        }

        /**
         * Reset trip segment container.
         *
         */
        function zoomOut() {

          if (scope.zoomState == 1) {
            scope.setDimensions();
            scope.zoomState = 0;
          }

          $rootScope.$broadcast('unzoomSegment');
        }


        /**
         * Define the boundaries of the trip time line based on the segment that is
         * being zoomed.
         *
         * @param departureTime
         * @param duration
         * @param ratio
         * @param leftMargin
         * @param newRatio
         * @returns {*}
         */
        function defineIntervalBoundaries(departureTime:string,
                                          duration:number,
                                          ratio:number,
                                          leftMargin:number,
                                          newRatio:number) {

          if (!departureTime)
            return null;

          var departureTimeObject = moment(departureTime, 'YYYY-MM-DDTHH:mm:ss');

          var growth = duration * (newRatio - ratio);

          var newLeftMargin = leftMargin - growth / 2;
          var newRightMargin = leftMargin + ratio * duration + growth / 2;

          if (newLeftMargin < 0)
            newLeftMargin = 0;
          else if (newRightMargin > 100)
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
  }
}