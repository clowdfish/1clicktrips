(function() {
  'use strict';

  angular
    .module('app.result')
    .directive('tripSegmentContainer', tripSegmentContainer);

  function tripSegmentContainer(VEHICLE_TYPE, OVERNIGHT_WIDTH) {

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
            // a different timing for the given segment index is selected, so
            // the segment's size and position will change. The adjacent segments
            // must be adapted or new timings must be retrieved from the back end

            var itinerary = scope.itineraries[itineraryIndex];
            var container = itinerary['segmentsContainer'][containerIndex];
            var segment = container['alternatives'][0][segmentIndex];
            var alternative = segment['alternatives'][timingIndex];

            if(container['isMajor']) {

              var numberOfMajorContainers =
                itinerary['segmentsContainer'].filter(function(containerItem) {
                  return !!containerItem['isMajor'];
              }).length;

              if(numberOfMajorContainers > 1) {
                // other major container is present
                updateTrip(itineraryIndex, containerIndex, segmentIndex)
                  .then(resolve).catch(reject);
              }
              else {
                // no other major container is present -> update segment data
                overWriteSegment(segment, alternative);
                updateItineraryData(itinerary);
                resolve();
              }
            }
            else {
              // minor container
              var numberOfSegmentsInContainer = container['alternatives'][0].length;

              if(numberOfSegmentsInContainer > 1) {

                var otherPublicTransportSegments =
                  container['alternatives'][0].some(function(segmentItem, index) {
                    if(segmentItem['type'] == VEHICLE_TYPE.bus ||
                      segmentItem['type'] == VEHICLE_TYPE.train ||
                      segmentItem['type'] == VEHICLE_TYPE.subway) {

                      // check if the segment is different from the one that
                      // the alternative was selected for
                      if(index != segmentIndex) return true;
                    }
                    return false;
                  });

                if(otherPublicTransportSegments) {
                  // other segments are in the container with type public transport
                  updateTrip(itineraryIndex, containerIndex, segmentIndex)
                    .then(resolve).catch(reject);
                }
                else {
                  // only segments with type individual transport are in the container
                  overWriteSegment(segment, alternative);
                  adaptTimings(container, segmentIndex);
                  updateItineraryData(itinerary);
                  resolve();
                }
              }
              else {
                // no other segment is in the container
                overWriteSegment(segment, alternative);
                updateItineraryData(itinerary);
                resolve();
              }
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
       * Overwrites the segment's data with the data from the alternative.
       *
       * @param segment
       * @param alternative
       */
      function overWriteSegment(segment, alternative) {

        segment['departureTime'] = alternative['departureTime'];
        segment['arrivalTime'] = alternative['arrivalTime'];
        segment['duration'] = alternative['duration'];

        if(alternative['price'])
          segment['price'] = alternative['price'];
      }

      /**
       * Adapts the timings of all segments based on the segment given by the
       * segmentIndex.
       *
       * @param container
       * @param segmentIndex
       */
      function adaptTimings(container, segmentIndex) {
        // the idea is to adapt all timings starting from the segmentIndex
        // so for all segments smaller than the segmentIndex and for all
        // segments bigger than segmentIndex

        var segment = container['alternatives'][0][segmentIndex];

        var timeFormat = 'YYYY-MM-DDTHH:mm:ss';
        var departureTime = moment(segment['departureTime'], timeFormat);
        var arrivalTime = moment(segment['arrivalTime'], timeFormat);

        var segmentsList = container['alternatives'][0];

        var i;
        for(i=segmentIndex + 1; i<segmentsList.length; i++) {

          var subsequentDepartureTime =
            moment(segmentsList[i]['departureTime'], timeFormat);
          var subsequentDuration =
            moment.duration(segmentsList[i]['duration'], 'minutes');

          if(subsequentDepartureTime.isBefore(arrivalTime)) {

            departureTime = arrivalTime.clone().add(5, 'minutes');
            arrivalTime = departureTime.clone().add(subsequentDuration);

            segmentsList[i]['departureTime'] = departureTime.format(timeFormat);
            segmentsList[i]['arrivalTime'] = arrivalTime.format(timeFormat);
          }
        }

        // now do the same for all segments smaller than the segmentIndex
        departureTime = moment(segment['departureTime'], timeFormat);
        arrivalTime = moment(segment['arrivalTime'], timeFormat);

        for(i=segmentIndex - 1; i>=0; i--) {

          var previousArrivalTime =
            moment(segmentsList[i]['arrivalTime'], timeFormat);
          var previousDuration =
            moment.duration(segmentsList[i]['duration'], 'minutes');

          if(previousArrivalTime.isAfter(departureTime)) {

            arrivalTime = departureTime.clone().subtract(5, 'minutes');
            departureTime = arrivalTime.clone().subtract(previousDuration);

            segmentsList[i]['departureTime'] = departureTime.format(timeFormat);
            segmentsList[i]['arrivalTime'] = arrivalTime.format(timeFormat);
          }
        }
      }

      /**
       * Updates itinerary data after changes to the underlying segments have
       * been made. The itinerary data to be updates is:
       * Departure time, arrival time, duration and price
       *
       * @param itinerary
       */
      function updateItineraryData(itinerary) {

        // TODO implement

        // TODO
        // add trip data to itineraries and resolve

      }

      /**
       *
       */
      function updateTrip(itineraryIndex,
                          containerIndex,
                          segmentIndex) {

        /*
        var index = getTimingIndex(itineraryIndex, containerIndex, segmentIndex);
        */
        
        // TODO
        // recalculate itinerary data
        // - total price
        // - total duration
        // - departure time
        // - arrival time
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