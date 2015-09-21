(function() {
  'use strict';

  angular
    .module('app.result')
    .directive('tripSegmentContainer', tripSegmentContainer);

  function tripSegmentContainer(VEHICLE_TYPE,
                                TRANSFER_TIME) {

    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/result/trip-segment-container.html',
      replace: true,
      scope: {
        itineraries: '=',
        timing: '=',
        selection: '=',
        selectItinerary: '&',
        updateItinerary: '&'
      },
      link: link
    };

    function link(scope, element, attrs) {

      scope.showDetails = 'showDetails' in attrs;

      // how much percent per minute
      scope.dimensions = {
        ratio: 0
      };

      // the original ration to go back to after zooming
      scope.originalRatio = 0;

      // defining the latest/earliest point in time of the given itineraries
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
       *
       * @param boundaryData
       */
      function defineBoundaries(boundaryData) {

        // reset boundaries
        scope.earliestDeparture = undefined;
        scope.latestArrival = undefined;

        if(boundaryData) {
          var intervalStart = boundaryData['start'];
          var intervalEnd = boundaryData['end'];

          setBoundaries(intervalStart, intervalEnd);
        }
        else {
          scope.itineraries.forEach(function (itinerary) {

            if(itinerary) {
              var departureTime = moment(itinerary['departureTime'], 'YYYY-MM-DDTHH:mm:ss');
              var arrivalTime = moment(itinerary['arrivalTime'], 'YYYY-MM-DDTHH:mm:ss');

              setBoundaries(departureTime, arrivalTime);
            }
          });
        }

        /**
         *
         *
         * @param intervalStart
         * @param intervalEnd
         */
        function setBoundaries(intervalStart, intervalEnd) {

          var appointmentTime =
            moment(scope.timing['value'], 'YYYY-MM-DDTHH:mm:ss');
          var targetDate = scope.timing['targetDate'];

          if (targetDate) {
            // optimize towards target date
            if (scope.earliestDeparture == undefined || intervalStart.isBefore(scope.earliestDeparture))
              scope.earliestDeparture = intervalStart.clone();

            // set latest arrival time
            if(!scope.showDetails)
              scope.latestArrival = appointmentTime;
            else if (scope.latestArrival == undefined || intervalEnd.isAfter(scope.latestArrival))
              scope.latestArrival = intervalEnd.clone();
          }
          else {
            // optimize from given date
            if (scope.latestArrival == undefined || intervalEnd.isAfter(scope.latestArrival))
              scope.latestArrival = intervalEnd.clone();

            // set earliest departure time
            if(!scope.showDetails)
              scope.earliestDeparture = appointmentTime;
            else if (scope.earliestDeparture == undefined || intervalStart.isBefore(scope.earliestDeparture))
              scope.earliestDeparture = intervalStart.clone();
          }
        }
      }

      /**
       * Sets the ratio for the trip time line.
       */
      function calculateDimensions() {

        if(scope.latestArrival && scope.earliestDeparture) {
          var tripDuration =
            scope.latestArrival.diff(scope.earliestDeparture, 'minutes');

          scope.dimensions = {
            ratio: 100 / tripDuration
          };
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

        var margin = 0;

        if(scope.earliestDeparture != undefined) {
          margin = scope.dimensions.ratio *
            time.diff(scope.earliestDeparture, 'minutes');
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
                scope.updateItinerary({ index: itineraryIndex })
                  .then(resolve).catch(reject);
              }
              else {
                // no other major container is present -> update segment data
                overWriteSegment(segment, alternative);
                updateItineraryData(itineraryIndex);
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
                  scope.updateItinerary({ index: itineraryIndex })
                    .then(resolve).catch(reject);
                }
                else {
                  // only segments with type individual transport are in the container
                  overWriteSegment(segment, alternative);
                  adaptTimings(container, segmentIndex);
                  updateItineraryData(itineraryIndex);
                  resolve();
                }
              }
              else {
                // no other segment is in the container
                overWriteSegment(segment, alternative);
                updateItineraryData(itineraryIndex);
                resolve();
              }
            }
          }
        })
        .catch(function(err) {
          console.error("Could not select alternative: " + err);
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

          if(subsequentDepartureTime.isBefore(arrivalTime) ||
            subsequentDepartureTime.diff(arrivalTime, 'minutes') > 10) {

            departureTime = arrivalTime.clone().add(TRANSFER_TIME, 'minutes');
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

          if(previousArrivalTime.isAfter(departureTime) ||
            departureTime.diff(previousArrivalTime, 'minutes') > 10) {

            arrivalTime = departureTime.clone().subtract(TRANSFER_TIME, 'minutes');
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
       * @param itineraryIndex
       */
      function updateItineraryData(itineraryIndex) {

        var itinerary = scope.itineraries[itineraryIndex];

        // define itinerary price
        var totalPrice =
          itinerary['segmentsContainer'].map(function(container, containerIndex) {

            var alternativeIndex =
              getAlternativeIndex(itineraryIndex, containerIndex);

            return container['alternatives'][alternativeIndex].map(function(segment) {
              return segment.hasOwnProperty('price') ? segment['price']['amount'] : 0;
            }).reduce(function(previousValue, currentValue) {
              return previousValue + currentValue;
            });
          }).reduce(function(previousValue, currentValue) {
            return previousValue + currentValue;
          });


        // define itinerary departure time
        var departureTime = null;
        var startDuration = 0;

        var i, j;
        var container, alternativeIndex, segment;

        for(i=0; i<itinerary['segmentsContainer'].length; i++) {
          if(departureTime != null) break;

          container = itinerary['segmentsContainer'][i];
          alternativeIndex = getAlternativeIndex(itineraryIndex, i);

          for(j=0; j<container['alternatives'][alternativeIndex].length; j++) {
            if(departureTime != null) break;

            segment = container['alternatives'][alternativeIndex][j];

            if(segment.hasOwnProperty("departureTime") && segment['departureTime'] != "") {
              departureTime =
                moment(segment['departureTime'], 'YYYY-MM-DDTHH:mm:ss')
                  .subtract(startDuration, 'minutes');
            }
            else {
              startDuration += (segment['duration'] + TRANSFER_TIME);
            }
          }
        }

        // define itinerary arrival time
        var arrivalTime = null;
        var endDuration = 0;

        for(i=itinerary['segmentsContainer'].length - 1; i>=0; i--) {
          if(arrivalTime != null) break;

          container = itinerary['segmentsContainer'][i];
          alternativeIndex = getAlternativeIndex(itineraryIndex, i);

          for(j=container['alternatives'][alternativeIndex].length - 1; j>=0; j--) {
            if(arrivalTime != null) break;

            segment = container['alternatives'][alternativeIndex][j];

            if(segment.hasOwnProperty("arrivalTime") && segment['arrivalTime'] != "") {
              arrivalTime =
                moment(segment['arrivalTime'], 'YYYY-MM-DDTHH:mm:ss')
                  .add(endDuration, 'minutes');
            }
            else {
              endDuration += (segment['duration'] + TRANSFER_TIME);
            }
          }
        }

        itinerary['departureTime'] = departureTime.format('YYYY-MM-DDTHH:mm:ss');
        itinerary['arrivalTime'] = arrivalTime.format('YYYY-MM-DDTHH:mm:ss');

        itinerary['duration'] = arrivalTime.diff(departureTime, 'minutes');
        itinerary['price'] = totalPrice;
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