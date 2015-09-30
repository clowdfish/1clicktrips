/// <reference path="../../_all.ts" />

module Booking {
	
	'use strict';
	
	export class SegmentDetails {
		public restrict = 'E';
		public scope = {
			segment: '='
		};
		public templateUrl = 'scripts/app/templates/bookings/segment-details.html';
		private instanceScope;
		constructor() {
			
		}
		
		public link = (scope, element, attrs) => {
			this.instanceScope = scope;
		}
		
		
	}
}