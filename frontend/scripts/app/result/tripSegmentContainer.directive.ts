/// <reference path="../../_all.ts" />

module Result {

  'use strict';

  export class TripSegmentContainer {

    public restrict = 'E';
    public templateUrl = 'scripts/app/templates/result/trip-segment-container.html';
    public replace = true;
    public scope = {
      itineraries: '=',
      timing: '=',
      selection: '=',
      selectItinerary: '&',
      updateItinerary: '&'
    };

    public scopeService;

    public static Factory() {

      var directive = (VEHICLE_TYPE, TRANSFER_TIME, $q):any => {
        return new TripSegmentContainer(VEHICLE_TYPE, TRANSFER_TIME, $q);
      };

      directive['$inject'] = ['VEHICLE_TYPE', 'TRANSFER_TIME', '$q'];
      return directive;
    }

    constructor(public VEHICLE_TYPE,
                public TRANSFER_TIME,
                public $q: ng.IQService) {

    }

    link = (scope, element, attrs) => {
      this.scopeService = scope;
      this.scopeService.showDetails = 'showDetails' in attrs;

      // how much percent per minute
      this.scopeService.dimensions = {
        ratio: 0
      };

      this.scopeService.showAlternatives = {};

      // the original ration to go back to after zooming
      this.scopeService.originalRatio = 0;

      // defining the latest/earliest point in time of the given itineraries
      this.scopeService.earliestDeparture = undefined;
      this.scopeService.latestArrival = undefined;

      // functions for the segments to call
      this.scopeService.defineMarginLeft = this.defineMarginLeft;
      this.scopeService.setDimensions = this.setDimensions;

      // the alternative rendering logic
      this.scopeService.getAlternativeIndex = this.getAlternativeIndex;
      this.scopeService.getTimingIndex = this.getTimingIndex;
      this.scopeService.isPrioritySegment = this.isPrioritySegment;
      this.scopeService.hasAlternatives = this.hasAlternatives;
      this.scopeService.toggleAlternatives = this.toggleAlternatives;
      this.scopeService.showAlternatives = this.showAlternatives;
      this.scopeService.getAnnotation = this.getAnnotation;

      // the alternatives selection logic
      this.scopeService.selectAlternative = this.selectAlternative;
      this.scopeService.renderTimeLine = this.renderTimeLine;

      this.scopeService.selectTrip = (index) => {
        // we must call the bound function with an object that has keys
        // corresponding to the function parameters given in the binding
        this.scopeService.selectItinerary({ index: index });
      };

      // only initialize the trip segment container, when itineraries are available
      this.scopeService.$watch('itineraries', () => {

        if(this.scopeService.itineraries != null) {
          // initialize the boundaries for the segments
          this.defineBoundaries();
          this.calculateDimensions();

          this.scopeService.originalRatio = this.scopeService.dimensions.ratio;

          this.scopeService.$broadcast('dimensionChange', {
            ratio: this.scopeService.dimensions.ratio
          });
        }
      });
    };

    /**
      * Will be called to zoom within the segment container.
      *
      * @param dimensionData
      */
    setDimensions = (dimensionData:any) => {

      if(!dimensionData) {
        // set back to original dimensions
        this.defineBoundaries();

        this.scopeService.dimensions = {
          ratio: this.scopeService.originalRatio
        };
      }
      else {
        // set new dimensions
        var boundaryData = {
          start: dimensionData['interval']['start'],
          end: dimensionData['interval']['end']
        };

        this.defineBoundaries(boundaryData);

        this.scopeService.originalRatio = this.scopeService.dimensions.ratio;
        this.scopeService.dimensions = {
          ratio: dimensionData['ratio']
        };
      }

      this.scopeService.$broadcast('dimensionChange', {
        ratio: this.scopeService.dimensions.ratio
      });
    };

    /**
      *
      *
      * @param boundaryData
      */
    defineBoundaries = (boundaryData?:any) => {

      // reset boundaries
      this.scopeService.earliestDeparture = undefined;
      this.scopeService.latestArrival = undefined;

      if(boundaryData) {
        var intervalStart = boundaryData['start'];
        var intervalEnd = boundaryData['end'];

        this.setBoundaries(intervalStart, intervalEnd);
      }
      else {
        this.scopeService.itineraries.forEach((itinerary) => {

          if(itinerary) {
            var departureTime = moment(itinerary['departureTime'], 'YYYY-MM-DDTHH:mm:ss');
            var arrivalTime = moment(itinerary['arrivalTime'], 'YYYY-MM-DDTHH:mm:ss');

            if(departureTime && arrivalTime)
              this.setBoundaries(departureTime, arrivalTime);
            else
              console.error("Itinerary has no departure or arrival time defined.")
          }
        });
      }
    };

    /**
      *
      *
      * @param intervalStart
      * @param intervalEnd
      */
    setBoundaries = (intervalStart: moment.Moment,
                     intervalEnd: moment.Moment) => {

      var appointmentTime =
        moment(this.scopeService.timing['value'], 'YYYY-MM-DDTHH:mm:ss');
      var targetDate = this.scopeService.timing['targetDate'];

      if (targetDate) {
        // optimize towards target date
        if (this.scopeService.earliestDeparture == undefined || intervalStart.isBefore(this.scopeService.earliestDeparture))
          this.scopeService.earliestDeparture = intervalStart.clone();

        // set latest arrival time
        if(!this.scopeService.showDetails)
          this.scopeService.latestArrival = appointmentTime;
        else if (this.scopeService.latestArrival == undefined || intervalEnd.isAfter(this.scopeService.latestArrival))
          this.scopeService.latestArrival = intervalEnd.clone();
      }
      else {
        // optimize from given date
        if (this.scopeService.latestArrival == undefined || intervalEnd.isAfter(this.scopeService.latestArrival))
          this.scopeService.latestArrival = intervalEnd.clone();

        // set earliest departure time
        if(!this.scopeService.showDetails)
          this.scopeService.earliestDeparture = appointmentTime;
        else if (this.scopeService.earliestDeparture == undefined || intervalStart.isBefore(this.scopeService.earliestDeparture))
          this.scopeService.earliestDeparture = intervalStart.clone();
      }
    };

    /**
      * Sets the ratio for the trip time line.
      */
    calculateDimensions = () => {

      if(this.scopeService.latestArrival && this.scopeService.earliestDeparture) {
        var tripDuration =
          this.scopeService.latestArrival.diff(this.scopeService.earliestDeparture, 'minutes');

        this.scopeService.dimensions = {
          ratio: 100 / tripDuration
        };
      }
    };

    /**
      *
      *
      * @param timeString
      * @returns {number}
      */
    defineMarginLeft = (timeString:string) => {

      var time = moment(timeString, 'YYYY-MM-DDTHH:mm:ss');

      var margin = 0;

      if(this.scopeService.earliestDeparture != undefined) {
        margin = this.scopeService.dimensions.ratio *
          time.diff(this.scopeService.earliestDeparture, 'minutes');
      }

      return margin;
    };

    /**
      * Checks if an alternative for a segment was selected and returns the
      * index position in the given container.
      *
      * @param itineraryIndex
      * @param containerIndex
      * @returns {number}
      */
    getAlternativeIndex = (itineraryIndex:number,
                           containerIndex:number) => {

      // check if selection has an entry matching the given arguments
      var selectionKey = itineraryIndex + '-' + containerIndex;

      for(var key in this.scopeService.selection) {
        if(this.scopeService.selection.hasOwnProperty(key)) {

          if(key.indexOf(selectionKey) == 0) {
            // we have a match
            var selection = this.scopeService.selection[key];

            if(selection.hasOwnProperty('alternativeIndex') &&
               selection['alternativeIndex'] != undefined) {

              return selection['alternativeIndex'];
            }
          }
        }
      }

      return 0;
    };

    /**
      * Checks if an alternative timing for a segment was selected and returns
      * the index position in the given segment's timing alternatives array.
      *
      * @param itineraryIndex
      * @param containerIndex
      * @param segmentIndex
      * @returns {number}
      */
    getTimingIndex = (itineraryIndex:number,
                      containerIndex:number,
                      segmentIndex:number) => {

      // check if selection has an entry matching the given arguments
      var selectionKey =
        itineraryIndex + '-' + containerIndex + '-' + segmentIndex;

      if(this.scopeService.selection.hasOwnProperty(selectionKey)) {
        var selection = this.scopeService.selection[selectionKey];

        if(selection.hasOwnProperty('timingIndex') &&
          selection['timingIndex'] != undefined) {
          return selection['timingIndex'];
        }
      }

      return 0;
    };

    /**
     *
     *
     * @param routeIndex
     */
    toggleAlternatives = (routeIndex:number) => {

      if(!this.scopeService.showAlternatives.hasOwnProperty(routeIndex))
        this.scopeService.showAlternatives[routeIndex] = true;
      else
        this.scopeService.showAlternatives[routeIndex] =
          !this.scopeService.showAlternatives[routeIndex];
    };

    /**
     *
     *
     * @param itineraryIndex
     */
    showAlternatives = (itineraryIndex:number) => {

      if(this.scopeService.showAlternatives.hasOwnProperty(itineraryIndex)) {
        if(this.scopeService.showAlternatives[itineraryIndex] === true)
          return true;
      }

      return false;
    };

    /**
     *
     *
     * @param itineraryIndex
     * @returns {string}
     */
    getAnnotation = (itineraryIndex:number) => {

      var self = this;
      var annotationText = "";

      this.scopeService.itineraries[itineraryIndex]['segmentsContainer'].forEach(function(container, containerIndex) {
        container['alternatives'][self.getAlternativeIndex(itineraryIndex, containerIndex)].forEach(function(segment) {
          if(segment['isMajor']) {
            // handle annotations here
            if(segment['type'] == self.VEHICLE_TYPE.car)
              annotationText += segment['information'];
          }
        })
      });

      return annotationText;
    };

    /**
     *
     *
     * @param itineraryIndex
     * @param containerIndex
     * @returns {boolean}
     */
    isPrioritySegment = (itineraryIndex, containerIndex) => {

      var self = this;
      var majorSegments = [];

      this.scopeService.itineraries[itineraryIndex]['segmentsContainer'].forEach(function(container, containerIndex) {
        container['alternatives'][self.getAlternativeIndex(itineraryIndex, containerIndex)].forEach(function(segment) {
          if(segment['isMajor']) {
            majorSegments.push({
              index: containerIndex,
              segment: segment
            });
          }
        })
      });

      if(majorSegments.length === 1) {
        return true;
      }
      else {
        var isPriority = false;

        majorSegments.forEach(function(majorSegment) {
          if(majorSegment.segment['type'] == self.VEHICLE_TYPE.plane) {
            if(majorSegment.index == containerIndex)
              isPriority = true;
          }
        });

        return isPriority;
      }
    };

    /**
     *
     *
     * @param itineraryIndex
     * @returns {boolean}
     */
    hasAlternatives = (itineraryIndex:number) => {

      var self = this;

      var majorSegments = [];

      this.scopeService.itineraries[itineraryIndex]['segmentsContainer'].forEach(function(container, containerIndex) {
        container['alternatives'][self.getAlternativeIndex(itineraryIndex, containerIndex)].forEach(function(segment) {
          if(segment['isMajor']) {
            majorSegments.push({
              index: containerIndex,
              segment: segment
            });
          }
        })
      });

      // temp solution as long as we cannot update a route with two major segments
      if(majorSegments.length > 1) {
        return false;
      }

      return majorSegments.some(function(segment) {
        if(segment.segment['alternatives'] && segment.segment['alternatives'].length > 1) {
          return true;
        }
      });
    };

    /**
     *
     *
     * @param itineraryIndex
     * @param containerIndex
     * @param segmentIndex
     * @param alternativeIndex
     * @param timingIndex
     */
    selectAlternative = (itineraryIndex:number,
                         containerIndex:number,
                         segmentIndex:number,
                         alternativeIndex:number,
                         timingIndex:number) => {
      /*
      console.log("Itinerary: " + itineraryIndex);
      console.log("Container: " + containerIndex);
      console.log("Segment: " + segmentIndex);
      console.log("Alternative: " + alternativeIndex);
      console.log("Timing: " + timingIndex);
      */

      // store alternative in selection data structure
      var selectionKey =
        itineraryIndex + '-' + containerIndex + '-' + segmentIndex;

      this.scopeService.selection[selectionKey] = {
        alternativeIndex: alternativeIndex,
        timingIndex: timingIndex
      };

      this.$q((resolve, reject) => {

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

          var itinerary = this.scopeService.itineraries[itineraryIndex];
          var container = itinerary['segmentsContainer'][containerIndex];
          var segment = container['alternatives'][0][segmentIndex];
          var alternative = segment['alternatives'][timingIndex];

          if(container['isMajor']) {

            var numberOfMajorContainers =
              itinerary['segmentsContainer'].filter((containerItem) => {
                return !!containerItem['isMajor'];
            }).length;

            if(numberOfMajorContainers > 1) {
              // other major container is present
              console.log("Update multi segment itinerary.");

              this.scopeService.updateItinerary({ index: itineraryIndex })
                .then(resolve).catch(reject);
            }
            else {
              // no other major container is present -> update segment data
              console.log("Update single segment itinerary.");

              this.overWriteSegment(segment, alternative);
              this.updateItineraryData(itineraryIndex);

              resolve();
            }
          }
          else {
            // minor container
            var numberOfSegmentsInContainer = container['alternatives'][0].length;

            if(numberOfSegmentsInContainer > 1) {

              var otherPublicTransportSegments =
                container['alternatives'][0].some((segmentItem, index) => {
                  if(segmentItem['type'] == this.VEHICLE_TYPE.bus ||
                    segmentItem['type'] == this.VEHICLE_TYPE.train ||
                    segmentItem['type'] == this.VEHICLE_TYPE.subway) {

                    // check if the segment is different from the one that
                    // the alternative was selected for
                    if(index != segmentIndex) return true;
                  }
                  return false;
                });

              if(otherPublicTransportSegments) {
                // other segments are in the container with type public transport
                this.scopeService.updateItinerary({ index: itineraryIndex })
                  .then(resolve).catch(reject);
              }
              else {
                // only segments with type individual transport are in the container
                this.overWriteSegment(segment, alternative);
                this.adaptTimings(container, segmentIndex);
                this.updateItineraryData(itineraryIndex);
                resolve();
              }
            }
            else {
              // no other segment is in the container
              this.overWriteSegment(segment, alternative);
              this.updateItineraryData(itineraryIndex);
              resolve();
            }
          }
        }
      })
      .catch((err) => {
        console.error("Could not select alternative: " + err);
      })
      .then(() => {
        // no matter what happened, the time line should be refreshed
        this.toggleAlternatives(itineraryIndex);
        this.renderTimeLine();
      });
    };

    /**
      * Overwrites the segment's data with the data from the alternative.
      *
      * @param segment
      * @param alternative
      */
    overWriteSegment = (segment, alternative) => {

      //console.log("Segment: " + JSON.stringify(segment, null, 2));
      //console.log("Alternative: " + JSON.stringify(alternative, null, 2));

      segment['departureTime'] = alternative['departureTime'];
      segment['arrivalTime'] = alternative['arrivalTime'];
      segment['duration'] = alternative['duration'];

      if(alternative['price'])
        segment['price'] = alternative['price'];
    };

    /**
      * Adapts the timings of all segments based on the segment given by the
      * segmentIndex.
      *
      * @param container
      * @param segmentIndex
      */
    adaptTimings = (container, segmentIndex) => {
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

          departureTime = arrivalTime.clone().add(this.TRANSFER_TIME, 'minutes');
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

          arrivalTime = departureTime.clone().subtract(this.TRANSFER_TIME, 'minutes');
          departureTime = arrivalTime.clone().subtract(previousDuration);

          segmentsList[i]['departureTime'] = departureTime.format(timeFormat);
          segmentsList[i]['arrivalTime'] = arrivalTime.format(timeFormat);
        }
      }
    };

    /**
      * Updates itinerary data after changes to the underlying segments have
      * been made. The itinerary data to be updates is:
      * Departure time, arrival time, duration and price
      *
      * @param itineraryIndex
      */
    updateItineraryData = (itineraryIndex) => {

      var itinerary = this.scopeService.itineraries[itineraryIndex];

      // define itinerary price
      var totalPrice =
        itinerary['segmentsContainer'].map((container, containerIndex) => {

          var alternativeIndex =
            this.getAlternativeIndex(itineraryIndex, containerIndex);

          return container['alternatives'][alternativeIndex].map((segment) => {
            return segment.hasOwnProperty('price') ? segment['price']['amount'] : 0;
          }).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
          });
        }).reduce((previousValue, currentValue) => {
          return previousValue + currentValue;
        });


      // define itinerary departure time
      var departureTime:moment.Moment = null;
      var startDuration = 0;

      var i, j;
      var container, alternativeIndex, segment;

      for(i=0; i<itinerary['segmentsContainer'].length; i++) {
        if(departureTime != null) break;

        container = itinerary['segmentsContainer'][i];
        alternativeIndex = this.getAlternativeIndex(itineraryIndex, i);

        for(j=0; j<container['alternatives'][alternativeIndex].length; j++) {
          if(departureTime != null) break;

          segment = container['alternatives'][alternativeIndex][j];

          if(segment.hasOwnProperty("departureTime") && segment['departureTime'] != "") {
            departureTime =
              moment(segment['departureTime'], 'YYYY-MM-DDTHH:mm:ss')
                .subtract(startDuration, 'minutes');
          }
          else {
            startDuration += (segment['duration'] + this.TRANSFER_TIME);
          }
        }
      }

      // define itinerary arrival time
      var arrivalTime:moment.Moment = null;
      var endDuration = 0;

      for(i=itinerary['segmentsContainer'].length - 1; i>=0; i--) {
        if(arrivalTime != null) break;

        container = itinerary['segmentsContainer'][i];
        alternativeIndex = this.getAlternativeIndex(itineraryIndex, i);

        for(j=container['alternatives'][alternativeIndex].length - 1; j>=0; j--) {
          if(arrivalTime != null) break;

          segment = container['alternatives'][alternativeIndex][j];

          if(segment.hasOwnProperty("arrivalTime") && segment['arrivalTime'] != "") {
            arrivalTime =
              moment(segment['arrivalTime'], 'YYYY-MM-DDTHH:mm:ss')
                .add(endDuration, 'minutes');
          }
          else {
            endDuration += (segment['duration'] + this.TRANSFER_TIME);
          }
        }
      }

      itinerary['departureTime'] = departureTime.format('YYYY-MM-DDTHH:mm:ss');
      itinerary['arrivalTime'] = arrivalTime.format('YYYY-MM-DDTHH:mm:ss');
      itinerary['duration'] = arrivalTime.diff(departureTime, 'minutes');
      itinerary['price'] = totalPrice;
    };

    /**
      * Re-renders the time line.
      */
    renderTimeLine = () => {

      this.defineBoundaries();
      this.calculateDimensions();

      this.scopeService.originalRatio = this.scopeService.dimensions.ratio;

      this.scopeService.$broadcast('dimensionChange', {
        ratio: this.scopeService.dimensions.ratio
      });
    };
  }
}
