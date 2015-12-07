/// <reference path="../_all.ts" />

module Print {

  'use strict';

  export class PrintCtrl {

    private printData;
    private selectionArray: Array<any>;

		constructor(private $scope,
								private $state,
                private $window,
                private printApi: PrintApi,
                private VEHICLE_TYPE,
                private tripApi: Result.TripApi,
                private itineraryHelper: Result.ItineraryHelper) {

      this.printData = printApi.getPrintData();

			window['MY_SCOPE'] = $scope; // DEBUG FROM CONSOLE

	    /**
	    * Print price before Print fee
	    */
	    $scope.printPrice = 0;

	    /**
	    * Print price after Print fee
	    */
	    $scope.totalPrintPrice = 0;

	    /**
	    * Print fee, calculate from Print rate and Print price
	    */
	    $scope.printFee = 0;

	    /**
	    * Print step ( total 3 steps )
	    */
	    $scope.step = 1;

	    /**
	    * Initialize PrintData
	    */

      $scope.tripDetails = this.printData['trip'];
      $scope.searchParams = this.printData.searchParams;

	    $scope.mapView = this.mapView;
	    $scope.goBack = this.goBack;

      $scope.getSegments = this.getSegments;

      $scope.getSegmentPath = this.getSegmentPath;
      $scope.getActionVerbBySegmentType = this.getActionVerbBySegmentType;

      $scope.printPage = this.printPage;
      $scope.downloadIcsFile = this.downloadIcsFile;
		}

    /**
     *
     *
     * @param $event
     * @returns {boolean}
     */
    public printPage = ($event) => {
      $event.preventDefault();
      print();
      return false;
    };

    /**
     *
     *
     */
    public downloadIcsFile = () => {
      return this
        .tripApi
        .downloadTripPlan(this.printData.searchParams);
    };

    private getSegments = () => {
      return this.itineraryHelper.getActiveSegmentFromItinerary(this.printData.trip, this.printData.selection);
    };

    private getSegmentPath = (segment) => {
      return this.itineraryHelper.getEncodedPathFromSegment(segment);
    };

    public mapView = () => {
      this.$state.go('search_result', this.printData['searchParams'])
    };

    public goBack = () => {
      this.$window.history.back();
    };

    public getActionVerbBySegmentType = (segment) => {
      switch (segment.type) {
        case this.VEHICLE_TYPE.bed:
          return 'Sleep';
        case this.VEHICLE_TYPE.street_view:
          return 'Walk';
        case this.VEHICLE_TYPE.car:
          return 'Drive';
        case this.VEHICLE_TYPE.bus:
          return 'Bus';
        case this.VEHICLE_TYPE.subway:
          return 'Drive';
        case this.VEHICLE_TYPE.train:
          return 'Train';
        case this.VEHICLE_TYPE.plane:
          return 'Fly';
        case this.VEHICLE_TYPE.cab:
          return 'Cab';
        case this.VEHICLE_TYPE.ship:
          return 'Ship';
      }
    }
  }
}
