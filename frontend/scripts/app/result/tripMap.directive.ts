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
			var directive = (browser: Common.Browser) => {
				return new TripMap(browser);
			}
			directive['$inject'] = ['browser'];
			return directive;
		}

		constructor(public browser: Common.Browser) {

		}

		link = (scope, element, attrs) => {
			this.scopeService = scope;
			this.$element = $(element);
			this.$element.html('<div id="itinerary-map"></div>');

			this.scopeService.$on('segmentChange', (data) => {
				this.drawSegment(data);
			});

			this.scopeService.$watch('itinerary', () => {
				this.drawItinerary(this.scopeService.itinerary);
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
			var latlngs = this.getSegmentsLocations([segment]);
			this.applyLocationsToMap(latlngs);
		}

		/**
		 * Get segments from itinerary and draw
		 */
		drawItinerary = (itinerary) => {
			if (!itinerary) {
				return null;
			}

			if (!this.map) {
				this.initializeMap(itinerary);
			}

			var segments = this.getActiveSegmentFromItinerary(itinerary, this.scopeService.selection);
			var latlngs = this.getSegmentsLocations(segments);
			this.applyLocationsToMap(latlngs);
		}

		/**
		 * Draw path and set bounds
		 */
		applyLocationsToMap = (locations) => {
			this.displayPath.setPath(locations);
			var mapBounds = new google.maps.LatLngBounds();
			for (var i = 0; i < locations.getLength(); i++) {
				mapBounds.extend(locations.getAt(i));
			}
			this.map.fitBounds(mapBounds);
			setTimeout(() => {
				google.maps.event.trigger(this.map, 'resize');
			}, 100);
		}

		/**
		 * Get all location from segments
		 */
		getSegmentsLocations = (segments: Array<any>) => {
			var latlngs = new google.maps.MVCArray();
			for (var segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
				var segment = segments[segmentIndex];
				var path = this.getSegmentPath(segment);
				if (path) {
					var encodedPath = google.maps.geometry.encoding.decodePath(path);
					for (var pathIndex = 0; pathIndex < encodedPath.length; pathIndex++) {
						latlngs.push(encodedPath[pathIndex]);
					}
				} else {
					latlngs.push(new google.maps.LatLng(segment.start.location.latitude, segment.start.location.longitude));
					latlngs.push(new google.maps.LatLng(segment.end.location.latitude, segment.end.location.longitude));
				}
			}
			return latlngs;
		}

		/**
		 * Get active segments from selection
		 */
		getActiveSegmentFromItinerary = (itinerary, selection) => {
			var segments = [];
			for (var containerIndex = 0; containerIndex < itinerary.segmentsContainer.length; containerIndex++) {
				var container = itinerary.segmentsContainer[containerIndex];
				segments = segments.concat(this.getSegmentsFromContainer(containerIndex, container));
			}
			return segments;
		}

		/**
		 * Get active segment from container and selection
		 */
		getSegmentsFromContainer = (containerIndex, container) => {
			for (var alternativeIndex = 0; alternativeIndex < container.alternatives.length; alternativeIndex++) {
        if (this.segmentInSelection(containerIndex, alternativeIndex)) {
          return container.alternatives[alternativeIndex];
        }
      }
      return container.alternatives[0];
		}

		/**
		 * Check if segment in selection
		 */
		segmentInSelection = (containerIndex, segmentIndex) => {
      var key = '0-' + containerIndex + '-' + segmentIndex;
      return this.scopeService.selection.hasOwnProperty(key);
    }

		/**
		 * Get segment 's path
		 */
		getSegmentPath = (segment) => {
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

	}
}