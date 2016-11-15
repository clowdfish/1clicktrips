/// <reference path="../../_all.ts" />

module Common {

  'use strict';

  export class Timeline {

    public restrict = 'E';
    public templateUrl = 'app/templates/directives/timeline.html';
    public replace = true;
    public scope = {
      itineraries: '=',
      timing: '=',
      showDetails: '=',
      itineraryIndex: '@',
      getAlternativeIndex: '&',
      getTimingIndex: '&',
      segmentHasPriority: '&'
    };
    public link: (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;

    public static Factory() {

      var directive = ():any => {
        return new Timeline();
      };

      directive['$inject'] = [];
      return directive;
    }

    constructor() {

      Timeline.prototype.link = (scope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) =>  {
        var timelineHelper = new TimelineHelper(scope);

        scope.itinerary = scope.itineraries[scope.itineraryIndex];

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
        scope.defineMarginLeft = timelineHelper.defineMarginLeft;
        scope.setDimensions = timelineHelper.setDimensions;

        // only initialize the trip segment container, when itineraries are available
        scope.$watch('itineraries', () => {
          scope.itinerary = scope.itineraries[scope.itineraryIndex];

          if(scope.itinerary != null) {
            timelineHelper.renderTimeLine();
          }
        });

        scope.$on('renderTimeline', () => {
          timelineHelper.renderTimeLine();
        });

        // the alternative rendering logic
        scope.alternativeIndex = (containerIndex) => {
          return scope.getAlternativeIndex({
            containerIndex: containerIndex
          });
        };

        scope.timingIndex = (containerIndex, segmentIndex) => {
          return scope.getTimingIndex({
            containerIndex: containerIndex,
            segmentIndex: segmentIndex
          });
        };

        scope.isPrioritySegment = (containerIndex) => {
          return scope.segmentHasPriority({
            itineraryIndex: scope.itineraryIndex,
            containerIndex: containerIndex
          });
        };

        timelineHelper.initialize();
      }
    }
  }

  /**
   *
   */
  class TimelineHelper {
    private _scope;

    constructor(scope:any) {
      this._scope = scope;
    }

    /**
     *
     *
     */
    initialize = () => {
      this.defineBoundaries();
      this.calculateDimensions();

      this._scope.originalRatio = this._scope.dimensions.ratio;

      this._scope.$broadcast('dimensionChange', {
        ratio: this._scope.dimensions.ratio
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

        this._scope.dimensions = {
          ratio: this._scope.originalRatio
        };
      }
      else {
        // set new dimensions
        var boundaryData = {
          start: dimensionData['interval']['start'],
          end: dimensionData['interval']['end']
        };

        this.defineBoundaries(boundaryData);

        this._scope.originalRatio = this._scope.dimensions.ratio;
        this._scope.dimensions = {
          ratio: dimensionData['ratio']
        };
      }

      this._scope.$broadcast('dimensionChange', {
        ratio: this._scope.dimensions.ratio
      });
    };

    /**
     *
     *
     * @param boundaryData
     */
    defineBoundaries = (boundaryData?:any) => {

      // reset boundaries
      this._scope.earliestDeparture = undefined;
      this._scope.latestArrival = undefined;

      if(boundaryData) {
        var intervalStart = boundaryData['start'];
        var intervalEnd = boundaryData['end'];

        this.setBoundaries(intervalStart, intervalEnd);
      }
      else {
        this._scope.itineraries.forEach((itinerary) => {

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
        moment(this._scope.timing['value'], 'YYYY-MM-DDTHH:mm:ss');
      var targetDate = this._scope.timing['targetDate'];

      //console.log("Appointment Time: " + this._scope.timing['value']);

      if (targetDate) {
        // optimize towards target date
        if (this._scope.earliestDeparture == undefined || intervalStart.isBefore(this._scope.earliestDeparture))
          this._scope.earliestDeparture = intervalStart.clone();

        // set latest arrival time
        if(!this._scope.showDetails)
          this._scope.latestArrival = appointmentTime;
        else if (this._scope.latestArrival == undefined || intervalEnd.isAfter(this._scope.latestArrival))
          this._scope.latestArrival = intervalEnd.clone();
      }
      else {
        // optimize from given date
        if (this._scope.latestArrival == undefined || intervalEnd.isAfter(this._scope.latestArrival))
          this._scope.latestArrival = intervalEnd.clone();

        // set earliest departure time
        if(!this._scope.showDetails)
          this._scope.earliestDeparture = appointmentTime;
        else if (this._scope.earliestDeparture == undefined || intervalStart.isBefore(this._scope.earliestDeparture))
          this._scope.earliestDeparture = intervalStart.clone();
      }
    };

    /**
     * Sets the ratio for the trip time line.
     */
    calculateDimensions = () => {

      if(this._scope.latestArrival && this._scope.earliestDeparture) {

        /*
        console.log("Boundaries:");
        console.log(this._scope.earliestDeparture.format('DD.MM.YYYY HH:mm'));
        console.log(this._scope.latestArrival.format('DD.MM.YYYY HH:mm'));*/

        var tripDuration =
          this._scope.latestArrival.diff(this._scope.earliestDeparture, 'minutes');

        this._scope.dimensions = {
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

      if(this._scope.earliestDeparture != undefined) {
        margin = this._scope.dimensions.ratio *
          time.diff(this._scope.earliestDeparture, 'minutes');
      }

      return margin;
    };

    /**
     * Re-renders the time line.
     */
    renderTimeLine = () => {
      this.defineBoundaries();
      this.calculateDimensions();

      this._scope.originalRatio = this._scope.dimensions.ratio;

      this._scope.$broadcast('dimensionChange', {
        ratio: this._scope.dimensions.ratio
      });
    };
  }
}
