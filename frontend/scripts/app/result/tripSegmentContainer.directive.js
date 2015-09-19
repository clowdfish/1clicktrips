(function() {
  'use strict';

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
        selection: '=',
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

      // defining the latest/earliest point in time of the given itineraries
      scope.earliestDepartureDayBefore = undefined;
      scope.latestArrivalDayAfter = undefined;
      scope.earliestDeparture = undefined;
      scope.latestArrival = undefined;

      // functions for the segments to call
      scope.defineMarginLeft = defineMarginLeft;
      scope.setDimensions = setDimensions;

      // the alternative rendering logic
      scope.getAlternativeIndex = getAlternativeIndex;
      scope.getTimingIndex = getTimingIndex;

      // the alternatives selection logic
      scope.selectAlternative = selectAlternative;
      scope.updateTrip = updateTrip;
      scope.renderTimeLine = renderTimeLine;

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

        // reset boundaries
        scope.earliestDepartureDayBefore = undefined;
        scope.earliestDeparture = undefined;
        scope.latestArrivalDayAfter = undefined;
        scope.latestArrival = undefined;
        scope.overnightStay = 0;

        if(boundaryData) {
          var intervalStart = boundaryData['start'];
          var intervalEnd = boundaryData['end'];

          setBoundaries(intervalStart, intervalEnd);
        }
        else {
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
              if (scope.earliestDepartureDayBefore == undefined || intervalStart.isBefore(scope.earliestDepartureDayBefore))
                scope.earliestDepartureDayBefore = intervalStart;
            }
            else {
              // same day
              if (scope.earliestDeparture == undefined || intervalStart.isBefore(scope.earliestDeparture))
                scope.earliestDeparture = intervalStart;
            }

            // set latest arrival time
            scope.latestArrival = appointmentTime;
          }
          else {
            // optimize from given date
            if (intervalEnd.isAfter(appointmentTime, 'day')) {
              // overnight stay
              if (scope.latestArrivalDayAfter == undefined || intervalEnd.isAfter(scope.latestArrivalDayAfter))
                scope.latestArrivalDayAfter = intervalEnd;
            }
            else {
              // same day
              if (scope.latestArrival == undefined || intervalEnd.isAfter(scope.latestArrival))
                scope.latestArrival = intervalEnd;
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

      /**
       * Checks if an alternative for a segment was selected and returns the
       * index position in the given container.
       *
       * @param itineraryIndex
       * @param containerIndex
       * @returns {number}
       */
      function getAlternativeIndex(itineraryIndex, containerIndex) {

        // check if selection has an entry matching the given arguments
        var selectionKey = itineraryIndex + '-' + containerIndex;

        for(var key in scope.selection) {
          if(scope.selection.hasOwnProperty(key)) {

            if(key.indexOf(selectionKey) == 0) {
              // we have a match
              var selection = scope.selection[key];

              if(selection.hasOwnProperty('alternativeIndex') &&
                selection['alternativeIndex'] != undefined) {

                return selection['alternativeIndex'];
              }
            }
          }
        }

        return 0;
      }

      /**
       * Checks if an alternative timing for a segment was selected and returns
       * the index position in the given segment's timing alternatives array.
       *
       * @param itineraryIndex
       * @param containerIndex
       * @param segmentIndex
       * @returns {number}
       */
      function getTimingIndex(itineraryIndex, containerIndex, segmentIndex) {

        // check if selection has an entry matching the given arguments
        var selectionKey =
          itineraryIndex + '-' + containerIndex + '-' + segmentIndex;

        if(scope.selection.hasOwnProperty(selectionKey)) {

          var selection = scope.selection[selectionKey];

          if(selection.hasOwnProperty('timingIndex') &&
            selection['timingIndex'] != undefined) {
            return selection['timingIndex'];
          }
        }

        return -1;
      }

      /**
       *
       *
       * @param itineraryIndex
       * @param containerIndex
       * @param segmentIndex
       * @param alternativeIndex
       * @param timingIndex
       */
      function selectAlternative(itineraryIndex,
                                 containerIndex,
                                 segmentIndex,
                                 alternativeIndex,
                                 timingIndex) {

        // store alternative in selection data structure
        var selectionKey =
          itineraryIndex + '-' + containerIndex + '-' + segmentIndex;

        scope.selection[selectionKey] = {
          alternativeIndex: alternativeIndex,
          timingIndex: timingIndex
        };

        new Promise(function(resolve, reject) {

          if(alternativeIndex != undefined) {
            // the new segments are automatically replaced during the next
            // rendering process. In the trip-segments-container template the
            // getAlternativeIndex(...) function is called to get the selected
            // alternatives.
          }

          if(timingIndex != undefined) {
            // a different timing for the given segment (index) is selected, so
            // the segment's size and position will change. The adjacent segments
            // must be adapted or new timings must be retrieves from the back end

            var itinerary = scope.itineraries[itineraryIndex];
            var container = itinerary['segmentsContainer'][containerIndex];

            if(container['isMajor']) {

              // TODO if other major containers are present
              // Check if dependent trip segments make a call to the backend necessary
              // then call updateTrip()
              updateTrip(itineraryIndex, containerIndex, segmentIndex);

              // TODO if no other major container is present
              // modify segment data of major trip segment
              // update itinerary data: departure time, arrival time, duration, price
            }
            else {

              // TODO if other segments are in the container with type public transport
              // Check if dependent trip segments make a call to the backend necessary
              // then call updateTrip()
              updateTrip(itineraryIndex, containerIndex, segmentIndex);

              // TODO if other segments are in the container with type individual transport
              // modify segment data of minor trip segment and all other segments
              // update itinerary data: departure time, arrival time, duration, price

              // TODO if no her segment is in the container
              // modify segment data
              // update itinerary data: departure time, arrival time, duration, price
            }
          }
        })
        .catch(function(err) {
          console.error("Could not select alternative: " + err.message);
        })
        .then(function() {
          // no matter what happened, the time line should be refreshed
          renderTimeLine();
        });
      }

      /**
       *
       */
      function updateTrip(itineraryIndex,
                          containerIndex,
                          segmentIndex) {

        /*
        var index = getTimingIndex(itineraryIndex, containerIndex, segmentIndex);

        if(index > -1) {
          var itinerary = scope.itineraries[itineraryIndex];
          var segment = itinerary['segmentsContainer'][containerIndex]['alternatives'][0][segmentIndex];
          var alternative = segment['alternatives'][index];

          var departureTimeDifference = Math.abs(
            moment(segment['departureTime'], 'YYYY-MM-DDTHH:mm:ss')
              .diff(moment(alternative['departureTime'], 'YYYY-MM-DDTHH:mm:ss'), 'minutes'));

          var arrivalTimeDifference = Math.abs(
            moment(segment['arrivalTime'], 'YYYY-MM-DDTHH:mm:ss')
              .diff(moment(alternative['arrivalTime'], 'YYYY-MM-DDTHH:mm:ss'), 'minutes'));

          // check if selected alternative makes trip start earlier
          if(moment(itinerary['departureTime'], 'YYYY-MM-DDTHH:mm:ss')
              .isAfter(moment(alternative['departureTime'], 'YYYY-MM-DDTHH:mm:ss'))) {

            itinerary['departureTime'] =
              moment(itinerary['departureTime'], 'YYYY-MM-DDTHH:mm:ss')
                .subtract(departureTimeDifference, 'minutes')
                .format('YYYY-MM-DDTHH:mm:ss');
          }

          // check if selected alternative delays whole trip
          if(moment(itinerary['arrivalTime'], 'YYYY-MM-DDTHH:mm:ss')
              .isBefore(moment(alternative['arrivalTime'], 'YYYY-MM-DDTHH:mm:ss'))) {

            itinerary['arrivalTime'] =
              moment(itinerary['arrivalTime'], 'YYYY-MM-DDTHH:mm:ss')
                .add(arrivalTimeDifference, 'minutes')
                .format('YYYY-MM-DDTHH:mm:ss');
          }

          segment['departureTime'] = alternative['departureTime'];
          segment['arrivalTime'] = alternative['arrivalTime'];
          segment['duration'] = alternative['duration'];

          // TODO
          // recalculate itinerary data
          // - total price
          // - total duration
          // - departure time
          // - arrival time

          if(alternative['price']) {
            var priceDifference =
              alternative['price']['amount'] - segment['price']['amount'];

            segment['price'] = alternative['price'];

            // update itinerary price
            itinerary['price'] += priceDifference;
          }
        }
        */
      }

      /**
       * Re-renders the time line.
       */
      function renderTimeLine() {

        defineBoundaries();
        calculateDimensions();

        scope.originalRatio = scope.dimensions.ratio;

        scope.$broadcast('dimensionChange', {
          ratio: scope.dimensions.ratio
        });
      }
    }
  }
})();