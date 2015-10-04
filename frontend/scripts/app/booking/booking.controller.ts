/// <reference path="../../_all.ts" />

module Booking {

  'use strict';

  export class BookingCtrl {

    private bookingData;
    private selectionArray: Array<any>;

		constructor(private $scope,
								private $state,
                private bookingApi: BookingApi,
                private VEHICLE_TYPE) {

      this.bookingData = bookingApi.getBookingData();

			window['MY_SCOPE'] = $scope; // DEBUG FROM CONSOLE

	    /**
	    * Booking price before booking fee
	    */
	    $scope.bookingPrice = 0;

	    /**
	    * Booking price after booking fee
	    */
	    $scope.totalBookingPrice = 0;

	    /**
	    * Booking fee, calculate from booking rate and booking price
	    */
	    $scope.bookingFee = 0;

	    /**
	    * Booking step ( total 3 steps )
	    */
	    $scope.step = 1;

	    /**
	    * Initialize bookingData
	    */


      $scope.tripDetails = this.bookingData['trip'];
      $scope.searchParams = this.bookingData.searchParams;
	    $scope.mapView = this.mapView;

      $scope.segmentInSelection = this.segmentInSelection;
      $scope.getSegments = this.getSegments;

      $scope.getSegmentPath = this.getSegmentPath;
      $scope.getActionVerbBySegmentType = this.getActionVerbBySegmentType;

      $scope.printPage = this.printPage;
		}

    public printPage = ($event) => {
      $event.preventDefault();
      print();
      return false;
    }

    private segmentInSelection = (containerIndex, segmentIndex) => {
      var key = '0-' + containerIndex + '-' + segmentIndex;
      return this.bookingData.selection.hasOwnProperty(key);
    }

    private getSegments = (containerIndex, container) => {
      for (var segmentIndex = 0; segmentIndex < container.alternatives.length; segmentIndex++) {
        if (this.segmentInSelection(containerIndex, segmentIndex)) {
          return container.alternatives[segmentIndex];
        }
      }
      return container.alternatives[0];
    }

    private getSegmentPath = (segment) => {
      if (_.isEmpty(segment.path)) {
        return null;
      }

      if (_.isString(segment.path) || _.isString(segment.path)) {
        return segment.path;
      }

      if (_.isObject(segment.path) || segment.path.points) {
        return segment.path.points;
      }

      return null;

    }

    public mapView = () => {
      this.$state.go('search_result', this.bookingData['searchParams'])
    }

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

};
