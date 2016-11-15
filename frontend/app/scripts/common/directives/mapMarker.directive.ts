/// <reference path="../../_all.ts" />

/**
* This directive decode address and display a marker on map.
 *
* <map-marker address="address"></map-marker>
*/
module Common {

  'use strict';
	
  export class MapMarker {

    public restrict = 'EA';
    public scope = {
      address: '=',
      displayError: '='
    };
    public link: (scope, element, attrs) => void;
    
    constructor() {
      MapMarker.prototype.link = (scope, element, attrs) => {
        var map, displayError, mapContainer, mapMarker;
        mapContainer = element[0];
        mapContainer.style.display = 'none';
        var geocoder = new google.maps.Geocoder();
        if (scope.displayError == null) {
          displayError = function(){};
        } else {
          displayError = scope.displayError;
        }
  
        scope.$watch('address', watchAddress);
  
        scope.displayMarkerByLatLon = displayMarkerByLatLon;
        scope.displayMarkerByAddress = displayMarkerByAddress;
        
        function watchAddress() {
          //return if address is null
          if (scope.address == null) {
            return
          }
  
          //remove old marker
          if (mapMarker) {
            mapMarker.setMap(null);
          }
  
          //if address is string, try to resolve location and display
          if ( typeof(scope.address) == 'string'
            && scope.address.trim() != '') {
            scope.displayMarkerByAddress(scope.address);
            return;
          }
  
          //just display marker on map
          if (typeof(scope.address) == 'object'
            && scope.address.hasOwnProperty('latitude')
            && scope.address.hasOwnProperty('longitude')) {
            scope.displayMarkerByLatLon(scope.address);
          }
        }

        /**
         *
         *
         * @param location
         */
        function displayMarkerByLatLon(location) {
  
          mapContainer.style.display = 'block';
          if (map == null) {
            map = new google.maps.Map(mapContainer, {
              zoom: 15,
              panControl: false,
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              overviewMapControl: false
            });
          }
          var position = new google.maps.LatLng(location.latitude, location.longitude);
          map.setCenter(position);
          mapMarker = new google.maps.Marker({
            map: map,
            position: position
          });
        }

        /**
         *
         *
         * @param address
         */
        function displayMarkerByAddress(address) {
          geocoder
            .geocode({address: address}, (results, status) => {
              if (status == google.maps.GeocoderStatus.OK) {
                mapContainer.style.display = 'block';
                if (map == null) {
                  map = new google.maps.Map(mapContainer, {
                    zoom: 15
                  });
                }
                map.setCenter(results[0].geometry.location);
                mapMarker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
                });
              } else {
                scope.displayError();
              }
            });
        }
      }
    }
    
    public static Factory() {

      var directive = () => {
        return new MapMarker();
      };

      return directive;
    }
  }
}