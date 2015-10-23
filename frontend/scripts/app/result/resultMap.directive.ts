/// <reference path="../../_all.ts" />

module Result {

  'use strict';

  export function resultMap(browser: Common.Browser, itineraryHelper: Result.ItineraryHelper) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/result/result-map.html',
      scope: {
        itinerary: '='
      },
      link: link
    };

    function link(scope, element, attrs) {
      var map: google.maps.Map;
      var displayPath: google.maps.Polyline;
      var $element = $(element);
      var destination;
			$element.html('<div id="itinerary-map"></div>');

      if (scope.itinerary) {
        initializeMap(scope.itinerary);
      }
      scope.$watch(scope.itinerary, () => {
        if (!scope.itinerary) return;
        initializeMap(scope.itinerary);
      });

      scope.$on('showItinerary', (data) => {
        drawItinerary(data.itinerary, data.selection);
      });
      
      /**
      * Setup google map object
      */
		  function initializeMap(itinerary) {
        console.log(itinerary);
        destination = getDestination(itinerary);
        console.log(destination);
        var center = new google.maps.LatLng(destination.end.location.latitude, destination.end.location.longitude);

        map = new google.maps.Map($element.find('#itinerary-map')[0], {
          center: center,
          zoom: 17,
          scrollwheel: browser.isMobileDevice(),
          panControl: false,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false
        });

        displayPath = new google.maps.Polyline({
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map
        });

        drawCustomMarkerAtSegment(destination);
      }

      function drawItinerary(itinerary, selection) {
        var segments = itineraryHelper.getActiveSegmentFromItinerary(itinerary, selection);
        var path = itineraryHelper.getSegmentsPath(segments);
        applyPathToMap(path);
      }

      /**
      * Draw path and set bounds
      */
      function applyPathToMap(decodedPath) {
        displayPath.setPath(decodedPath);
        var mapBounds = new google.maps.LatLngBounds();
        for (var i = 0; i < decodedPath.getLength(); i++) {
          mapBounds.extend(decodedPath.getAt(i));
        }
        map.fitBounds(mapBounds);
        setTimeout(() => {
          google.maps.event.trigger(map, 'resize');
        }, 100);
      }

      function getDestination(itinerary) {
        var segments = itineraryHelper.getActiveSegmentFromItinerary(itinerary, {});
        return segments[segments.length - 1];
      }

      function drawCustomMarkerAtSegment(segment) {
        var destinationImage = getStreetViewAtLocation(segment.start.location);
        var html = [
          '<div class="marker-wrapper">',
            '<img class="marker-image" src="../images/marker.png"/>',
            '<div class="marker-destination-info clearfix">',
              '<div class="marker-destination-image">',
                '<img src="' + destinationImage + '" />',
              '</div>',
              '<div class="marker-destination-description">',
                '<div class="marker-destination-description-title">',
                  'Destination name',
                '</div>',
                '<div class="marker-destination-description-address">',
                  'Example Address',
                '</div>',
                '<div class="marker-destination-description-time">',
                  'Example time',
                '</div>',
              '</div>',
            '</div>',
          '</div>'
        ].join('');
        var location = new google.maps.LatLng(segment.end.location.latitude, segment.end.location.longitude);
        var locationMarker = new CustomMarker(map, location, {
          htmlContent: html
        });
      }

      function getStreetViewAtLocation(location) {
        var imageUrl = 'https://maps.googleapis.com/maps/api/streetview?';
        imageUrl += 'location=' + location.latitude + ',' + location.longitude;
        imageUrl += '&size=100x75';
        return imageUrl;
      }
    }
  }
}