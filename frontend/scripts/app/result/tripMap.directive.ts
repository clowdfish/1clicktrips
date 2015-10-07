/// <reference path="../../_all.ts" />

module Result {

	'use strict';

	export class TripMap {
		/**
		 * Directive configuration
		 */
		public restrict = 'E';
		public template = '';
		public scope = {
			itinerary: '=',
			selection: '='
		};

		/**
		 * Class variables
		 */
		public scopeService;
		public $element;
		public map: google.maps.Map;
		public scrollWheel: boolean;
		public displayPath: google.maps.Polyline;

		public static Factory(): any {
			var directive = (browser: Common.Browser, itineraryHelper: Result.ItineraryHelper) => {
				return new TripMap(browser, itineraryHelper);
			}
			directive['$inject'] = ['browser', 'itineraryHelper'];
			return directive;
		}

		constructor(public browser: Common.Browser,
								public itineraryHelper: Result.ItineraryHelper) {

		}

		link = (scope, element, attrs) => {
			this.scopeService = scope;
			this.$element = $(element);
			this.$element.html('<div id="itinerary-map"></div>');

			this.scopeService.$on('zoomSegment', (event, data) => {
				this.drawSegment(data);
			});

			this.scopeService.$on('unzoomSegment', () => {
				this.drawItinerary(this.scopeService.itinerary, this.scopeService.selection);
			});

			this.scopeService.$watch('itinerary', () => {
				this.drawItinerary(this.scopeService.itinerary, this.scopeService.selection);
			});
		}

		/**
		 * Setup google map object
		 */
		initializeMap = (itinerary) => {
			console.log('Initialize map', itinerary);

			var center = new google.maps.LatLng(itinerary.origin.location.latitude, itinerary.origin.location.longitude);

			this.map = new google.maps.Map(this.$element.find('#itinerary-map')[0], {
				center: center,
				zoom: 19,
				scrollwheel: this.browser.isMobileDevice(),
				panControl: false,
				zoomControl: false,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				overviewMapControl: false
			});

			this.displayPath = new google.maps.Polyline({
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 2,
				map: this.map
			});
		}

		/**
		 * Draw single segment
		 */
		drawSegment = (segment) => {
			var path = this.itineraryHelper.getSegmentsPath([segment]);
			this.applyPathToMap(path);
		}

		/**
		 * Get segments from itinerary and draw
		 */
		drawItinerary = (itinerary, selection) => {
			if (!itinerary) {
				return null;
			}

			if (!this.map) {
				this.initializeMap(itinerary);
			}

			var segments = this.itineraryHelper.getActiveSegmentFromItinerary(itinerary, selection);
			var path = this.itineraryHelper.getSegmentsPath(segments);
			this.applyPathToMap(path);
		}

		/**
		 * Draw path and set bounds
		 */
		applyPathToMap = (decodedPath) => {
			this.displayPath.setPath(decodedPath);
			var mapBounds = new google.maps.LatLngBounds();
			for (var i = 0; i < decodedPath.getLength(); i++) {
				mapBounds.extend(decodedPath.getAt(i));
			}
			this.map.fitBounds(mapBounds);
			setTimeout(() => {
				google.maps.event.trigger(this.map, 'resize');
			}, 100);
		}
	}
}