(function() {

	'use strict';

	angular
		.module('app.common')
		.service('googleMap', googleMap);

	function googleMap($q) {

		var geocoder = new google.maps.Geocoder();

		this.geocode = geocode;

		/**
		* Use geocoder to get latitude and longitude from address
		* @params {string} address - Address
		* @return {Object} latitude and longitude of address
		*/
		function geocode (address) {
			var deferred = $q.defer();
			geocoder
        .geocode({address: address}, function(results, status) {
        	console.log(results);
          if (status == google.maps.GeocoderStatus.OK) {          	
          	deferred.resolve({
          		latitude: results[0].geometry.location.lat(),
          		longitude: results[0].geometry.location.lng()
          	});
          } else {
          	deferred.reject();
          }
        });
      return deferred.promise;
		}

		return this;

	};

})();