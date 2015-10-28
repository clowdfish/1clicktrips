/// <reference path="../../_all.ts" />

module Result {

  'use strict';

  export function resultMap(browser: Common.Browser,
                            itineraryHelper: Result.ItineraryHelper,
                            $anchorScroll) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/result/result-map.html',
      scope: {
        itinerary: '=',
        toggleMap: '=',
        destinationDescription: '='
      },
      link: link
    };

    function link(scope, element, attrs) {
      var isInitialized: boolean = false;
      var map: google.maps.Map;
      var displayPath: google.maps.Polyline;
      var $element = $(element);
      var destination;
      var destinationMaker;
      var DEFAULT_ZOOM_LEVEL: number = 17;
      var LARGE_MAP_HEIGHT: number = 28;
      var isIncreasedMapSize: boolean = false;

      if (scope.itinerary) {
        initializeMap(scope.itinerary);
      }

      scope.$watch('itinerary', () => {
        if (!scope.itinerary) return;
        initializeMap(scope.itinerary);
      });

      /**
       * Add show/hide map handler to controller
       */
      scope.toggleMap((itinerary) => {
        drawItinerary(itinerary, {});
      }, (itinerary) => {
        drawDestinationMarker(itinerary);
      });

      /**
       * Clean up
       */
      scope.$on('$destroy', () => {
        destroyDirective();
      });

      /**
      * Setup google map object
      */
		  function initializeMap(itinerary) {
        console.log(itinerary);
        if (true === isInitialized) {
          return;
        }
        isInitialized = true;

        map = new google.maps.Map($('#itinerary-map')[0], {
          zoom: DEFAULT_ZOOM_LEVEL,
          scrollwheel: browser.isMobileDevice(),
          panControl: false,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false
        });

        displayPath = new google.maps.Polyline({
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: null
        });

        destinationMaker = drawDestinationMarker(itinerary);

        google.maps.event.trigger(map, 'resize');
      }

      function drawItinerary(itinerary, selection) {
        //Only increase map height at once
        if (!isIncreasedMapSize) {
          changeMapHeight(LARGE_MAP_HEIGHT);
          isIncreasedMapSize = true;
        }

        destinationMaker.setMap(null);
        destinationMaker.remove();
        var segments = itineraryHelper.getActiveSegmentFromItinerary(itinerary, selection);
        var path = itineraryHelper.getSegmentsPath(segments);
        applyPathToMap(path);
        scrollTop();
      }

      /**
      * Draw path and set bounds
      */
      function applyPathToMap(decodedPath) {
        displayPath.setMap(map);
        displayPath.setPath(decodedPath);
        var mapBounds = new google.maps.LatLngBounds();
        for (var i = 0; i < decodedPath.getLength(); i++) {
          mapBounds.extend(decodedPath.getAt(i));
        }
        map.fitBounds(mapBounds);

      }

      function getDestination(itinerary) {
        var segments = itineraryHelper.getActiveSegmentFromItinerary(itinerary, {});
        return segments[segments.length - 1];
      }

      /**
       * Create a html marker
       */
      function drawDestinationMarker(itinerary) {
        destination = getDestination(itinerary);
        var destinationImage = getStreetViewAtLocation(destination.start.location);
        var time = moment(itinerary.arrivalTime).format('YYYY/MM/DD hA');
        var html = [
          '<div class="marker-wrapper">',
            '<div class="marker-description">',
              '<div class="marker-location clearfix">',
                '<div class="marker-location-image">',
                  '<img src="' + destinationImage + '" />',
                '</div>',
                '<div class="marker-location-data">',
                  '<div class="marker-location-data-title">',
                    scope.destinationDescription,
                  '</div>',
                  '<div class="marker-location-data-address">',
                    'Example Address',
                  '</div>',
                '</div>',
              '</div>',
              '<div class="marker-time">',
                time,
              '</div>',
            '</div>',
            '<img class="marker-image" src="../images/marker.png"/>',
          '</div>'
        ].join('');
        var location = new google.maps.LatLng(destination.end.location.latitude, destination.end.location.longitude);
        var marker = new CustomMarker(map, location, {
          htmlContent: html
        });
        marker.setMap(map);
        map.setCenter(location);
        map.setZoom(DEFAULT_ZOOM_LEVEL);
        displayPath.setMap(null);
        return marker;
      }

      /**
       * Get streetview image from location
       */
      function getStreetViewAtLocation(location) {
        var imageUrl = 'https://maps.googleapis.com/maps/api/streetview?';
        imageUrl += 'location=' + location.latitude + ',' + location.longitude;
        imageUrl += '&size=100x75';
        return imageUrl;
      }

      function destroyDirective() {
        if (isInitialized) {
          displayPath.setMap(null);
          destinationMaker.setMap(null);
          destinationMaker.remove();
        }
      }

      /**
       * Scroll to the map
       */
      function scrollTop() {
        var top = $element.position().top - 5;
        $('html, body').animate({
          scrollTop: top
        }, 500, () => {
          google.maps.event.trigger(map, 'resize');
        });
      }

      /**
       * Change map height
       */
      function changeMapHeight(value: number) {
        $element.parent('.result-map').animate({
          height: value.toString() + 'em'
        }, 500, () => {
          google.maps.event.trigger(map, 'resize');
        });
      }

    }
  }
}