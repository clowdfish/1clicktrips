/// <reference path="../../../_all.ts" />

module Common {

	'use strict';

	export class GoogleMap {
		private geocoder;
		
		constructor(private $q) {
			this.geocoder = new google.maps.Geocoder();
		}		

		/**
		* Use geocoder to get latitude and longitude from address
		* @params {string} address - Address
		* @return {Object} latitude and longitude of address
		*/
		public geocode = (address:string) => {
			var deferred = this.$q.defer();

			this.geocoder
        .geocode({address: address}, function(results, status) {

          if (status == google.maps.GeocoderStatus.OK) {

          	deferred.resolve({
          		latitude: results[0].geometry.location.lat(),
          		longitude: results[0].geometry.location.lng()
          	});
          }
					else {
          	deferred.reject();
          }
        });
      return deferred.promise;
		}
	}
}