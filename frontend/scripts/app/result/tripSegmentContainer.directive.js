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
      timing: '='
    },
    link: link
  };

  function link(scope, element, attrs) {

    // overnight states the percentage that is needed for the day before or day after section
    scope.overnightStay = 0;

    // how much percent per minute
    scope.ratio = 0;

    // when arriving the day before
    scope.earliestDepartureDayBefore = undefined;

    // when departing the day after
    scope.latestArrivalDayAfter = undefined;

    // when travelling the same day
    scope.earliestDeparture = undefined;
    scope.latestArrival = undefined;

    scope.defineMarginLeft = defineMarginLeft;

    // initialize the boundaries for the segments
    defineBoundaries();
    calculateDimensions();

    /**
     *
     *
     */
    function defineBoundaries() {

      // TODO must be tested!!!

      var appointmentTime = moment(scope.timing['value'], 'YYYY-MM-DDTHH:mm:ss');
      var targetDate = scope.timing['targetDate'];

      scope.itineraries.forEach(function(itinerary) {

        var departureTime = moment(itinerary['departureTime'], 'YYYY-MM-DDTHH:mm:ss');
        var arrivalTime = moment(itinerary['arrivalTime'], 'YYYY-MM-DDTHH:mm:ss');

        if(targetDate) {
          // optimize towards target date
          if(departureTime.isBefore(appointmentTime, 'day')) {
            // overnight stay
            if(scope.earliestDepartureDayBefore == undefined || departureTime.isBefore(scope.earliestDepartureDayBefore)) {
              scope.earliestDepartureDayBefore = departureTime;
            }
          }
          else {
            // same day
            if(scope.earliestDeparture == undefined || departureTime.isBefore(scope.earliestDeparture)) {
              scope.earliestDeparture = departureTime;
            }
          }

          // set latest arrival time
          scope.latestArrival = appointmentTime;
        }
        else {
          // optimize from given date
          if(arrivalTime.isAfter(appointmentTime, 'day')) {
            // overnight stay
            if(scope.latestArrivalDayAfter == undefined || arrivalTime.isAfter(scope.latestArrivalDayAfter)) {
              scope.latestArrivalDayAfter = arrivalTime;
            }
          }
          else {
            // same day
            if(scope.latestArrival == undefined || arrivalTime.isAfter(scope.latestArrival)) {
              scope.latestArrival = arrivalTime;
            }
          }

          // set earliest departure time
          scope.earliestDeparture = appointmentTime;
        }
      });
    }

    /**
     *
     *
     */
    function calculateDimensions() {

      // TODO must be tested!!!

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
        scope.ratio = (100 - OVERNIGHT_WIDTH) / (durationOvernight + durationSameDay);
        scope.overnightStay = scope.ratio * durationOvernight;
      }
      else {
        scope.ratio = 100 / durationSameDay;
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

      // TODO must be tested!!!

      var time = moment(timeString, 'YYYY-MM-DDTHH:mm:ss');
      var appointmentTime = moment(scope.timing['value'], 'YYYY-MM-DDTHH:mm:ss');

      var margin = 0;

      if(scope.earliestDepartureDayBefore) {
        // we have a day before section
        if(time.isAfter(scope.earliestDepartureDayBefore, 'day')) {
          margin += (scope.overnightStay + OVERNIGHT_WIDTH) * scope.ratio;
        }
      }

      // the current day
      if(scope.timing['targetDate']) {
        margin += scope.ratio *
          Math.abs(time.diff(scope.earliestDeparture, 'minutes'));
      }
      else {
        margin += scope.ratio *
          Math.abs(time.diff(appointmentTime, 'minutes'));
      }

      if(scope.latestArrivalDayAfter) {
        // we have a day after section
        if(time.isSame(scope.latestArrivalDayAfter, 'day')) {
          margin += (scope.overnightStay + OVERNIGHT_WIDTH) * scope.ratio;
        }
      }

      return margin;
    }
  }
}