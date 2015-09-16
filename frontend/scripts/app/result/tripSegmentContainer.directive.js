angular
  .module('app.result')
  .directive('tripSegmentContainer', tripSegmentContainer);

function tripSegmentContainer(OVERNIGHT_WIDTH) {

  return {
    restrict: 'E',
    templateUrl: 'scripts/app/templates/result/trip-segment-container.html',
    replace: true,
    scope: {
      itineraries: '=',
      timing: '=',
      selectItinerary: '&'
    },
    link: link
  };

  function link(scope, element, attrs) {

    scope.showMajor = 'showMajor' in attrs;
    scope.showMinor = 'showMinor' in attrs;

    // overnight states the percentage that is needed for the day before or day after section
    scope.overnightStay = 0;

    // how much percent per minute
    scope.dimensions = {
      ratio: 0
    };

    // the original ration to go back to after zooming
    scope.originalRatio = 0;

    // when arriving the day before
    scope.earliestDepartureDayBefore = undefined;

    // when departing the day after
    scope.latestArrivalDayAfter = undefined;

    // when travelling the same day
    scope.earliestDeparture = undefined;
    scope.latestArrival = undefined;

    scope.defineMarginLeft = defineMarginLeft;
    scope.setDimensions = setDimensions;

    scope.selectTrip = function(index) {
      // we must call the bound function with an object that has keys
      // corresponding to the function parameters given in the binding
      scope.selectItinerary({ index: index });
    };

    // only initialize the trip segment container, when itineraries are available
    scope.$watch('itineraries', function() {

      if(scope.itineraries != null) {
        // initialize the boundaries for the segments
        defineBoundaries();
        calculateDimensions();

        scope.originalRatio = scope.dimensions.ratio;

        scope.$broadcast('dimensionChange', {
          ratio: scope.dimensions.ratio
        });
      }
    });

    /**
     * Will be called to zoom within the segment container.
     *
     * @param dimensionData
     */
    function setDimensions(dimensionData) {

      if(!dimensionData) {
        // set back to original dimensions
        defineBoundaries();

        scope.dimensions = {
          ratio: scope.originalRatio
        };
      }
      else {
        // set new dimensions
        var boundaryData = {
          start: dimensionData['interval']['start'],
          end: dimensionData['interval']['end']
        };

        defineBoundaries(boundaryData);

        scope.originalRatio = scope.dimensions.ratio;
        scope.dimensions = {
          ratio: dimensionData['ratio']
        };
      }

      scope.$broadcast('dimensionChange', {
        ratio: scope.dimensions.ratio
      });
    }

    /**
     *
     */
    function defineBoundaries(boundaryData) {

      if(boundaryData) {
        // reset boundaries
        scope.earliestDepartureDayBefore = undefined;
        scope.earliestDeparture = undefined;
        scope.latestArrivalDayAfter = undefined;
        scope.latestArrival = undefined;
        scope.overnightStay = 0;

        var intervalStart = boundaryData['start'];
        var intervalEnd = boundaryData['end'];

        setBoundaries(intervalStart, intervalEnd);
      }
      else {
        // reset boundaries
        scope.earliestDepartureDayBefore = undefined;
        scope.earliestDeparture = undefined;
        scope.latestArrivalDayAfter = undefined;
        scope.latestArrival = undefined;
        scope.overnightStay = 0;

        scope.itineraries.forEach(function (itinerary) {
          var departureTime = moment(itinerary['departureTime'], 'YYYY-MM-DDTHH:mm:ss');
          var arrivalTime = moment(itinerary['arrivalTime'], 'YYYY-MM-DDTHH:mm:ss');

          setBoundaries(departureTime, arrivalTime);
        });
      }

      /**
       *
       *
       * @param intervalStart
       * @param intervalEnd
       */
      function setBoundaries(intervalStart, intervalEnd) {

        var appointmentTime = moment(scope.timing['value'], 'YYYY-MM-DDTHH:mm:ss');
        var targetDate = scope.timing['targetDate'];

        if (targetDate) {
          // optimize towards target date
          if (intervalStart.isBefore(appointmentTime, 'day')) {
            // overnight stay
            if (scope.earliestDepartureDayBefore == undefined || intervalStart.isBefore(scope.earliestDepartureDayBefore)) {
              scope.earliestDepartureDayBefore = intervalStart;
            }
          }
          else {
            // same day
            if (scope.earliestDeparture == undefined || intervalStart.isBefore(scope.earliestDeparture)) {
              scope.earliestDeparture = intervalStart;
            }
          }

          // set latest arrival time
          scope.latestArrival = appointmentTime;
        }
        else {
          // optimize from given date
          if (intervalEnd.isAfter(appointmentTime, 'day')) {
            // overnight stay
            if (scope.latestArrivalDayAfter == undefined || intervalEnd.isAfter(scope.latestArrivalDayAfter)) {
              scope.latestArrivalDayAfter = intervalEnd;
            }
          }
          else {
            // same day
            if (scope.latestArrival == undefined || intervalEnd.isAfter(scope.latestArrival)) {
              scope.latestArrival = intervalEnd;
            }
          }

          // set earliest departure time
          scope.earliestDeparture = appointmentTime;
        }
      }
    }

    /**
     *
     *
     */
    function calculateDimensions() {

      var durationSameDay = Math.abs(scope.latestArrival.diff(scope.earliestDeparture, 'minutes'));

      var durationOvernight;
      if(scope.earliestDepartureDayBefore) {

        durationOvernight = Math.abs(
          scope.earliestDepartureDayBefore.clone()
            .setHours(24).setMinutes(0).setSeconds(0)
            .diff(scope.earliestDepartureDayBefore, 'minutes'));
      }
      else if(scope.latestArrivalDayAfter) {

        durationOvernight = Math.abs(
          scope.latestArrivalDayAfter.clone()
            .setHours(0).setMinutes(0).setSeconds(0)
            .diff(scope.earliestDepartureDayBefore, 'minutes'));
      }

      if(durationOvernight) {

        scope.dimensions = {
          ratio: (100 - OVERNIGHT_WIDTH) / (durationOvernight + durationSameDay)
        };
        scope.overnightStay = scope.dimensions.ratio * durationOvernight;
      }
      else {
        scope.dimensions = {
          ratio: 100 / durationSameDay
        };
        scope.overnightStay = 0;
      }
    }

    /**
     *
     *
     * @param timeString
     * @returns {number}
     */
    function defineMarginLeft(timeString) {

      var time = moment(timeString, 'YYYY-MM-DDTHH:mm:ss');
      var appointmentTime = moment(scope.timing['value'], 'YYYY-MM-DDTHH:mm:ss');

      var margin = 0;

      if(scope.earliestDepartureDayBefore) {
        // we have a day before section
        if(time.isAfter(scope.earliestDepartureDayBefore, 'day')) {
          margin += (scope.overnightStay + OVERNIGHT_WIDTH) * scope.dimensions.ratio;
        }
      }

      // the current day
      if(scope.timing['targetDate']) {
        margin += scope.dimensions.ratio *
          time.diff(scope.earliestDeparture, 'minutes');
      }
      else {
        margin += scope.dimensions.ratio *
          time.diff(appointmentTime, 'minutes');
      }

      if(scope.latestArrivalDayAfter) {
        // we have a day after section
        if(time.isSame(scope.latestArrivalDayAfter, 'day')) {
          margin += (scope.overnightStay + OVERNIGHT_WIDTH) * scope.dimensions.ratio;
        }
      }

      return margin;
    }
  }
}