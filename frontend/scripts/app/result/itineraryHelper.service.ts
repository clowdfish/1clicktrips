/// <reference path="../../_all.ts" />

module Result {

	'use strict';

	export class ItineraryHelper {
		/**
		 * Get all location from segments
		 */
		public getSegmentsPath = (segments: Array<any>): google.maps.MVCArray => {
			var latlngs = new google.maps.MVCArray();
			for (var segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
				var segment = segments[segmentIndex];
				var path = this.getEncodedPathFromSegment(segment);
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
		public getActiveSegmentFromItinerary = (itinerary, selection) => {
			var segments = [];
			for (var containerIndex = 0; containerIndex < itinerary.segmentsContainer.length; containerIndex++) {
				var container = itinerary.segmentsContainer[containerIndex];
				segments = segments.concat(this.getSegmentsFromContainer(containerIndex, container, selection));
			}
			return segments;
		}

		/**
		 * Get active segment from container and selection
		 */
		public getSegmentsFromContainer = (containerIndex, container, selection) => {
			for (var alternativeIndex = 0; alternativeIndex < container.alternatives.length; alternativeIndex++) {
        if (this._segmentInSelection(containerIndex, alternativeIndex, selection)) {
          return container.alternatives[alternativeIndex];
        }
      }
      return container.alternatives[0];
		}

		/**
		 * Check if segment in selection
		 */
		private _segmentInSelection = (containerIndex, segmentIndex, selection) => {
      var key = '0-' + containerIndex + '-' + segmentIndex;
      return selection.hasOwnProperty(key);
    }

		/**
		 * Get segment 's path
		 */
		public getEncodedPathFromSegment = (segment) => {
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