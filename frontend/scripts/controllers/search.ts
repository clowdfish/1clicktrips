/// <reference path="../../node_modules/ttg-api/search.api.d.ts" />
/// <reference path="../../typings/googlemaps/google.maps.d.ts" />

module App {
  'use strict';

  export class SearchController {
    geocoder: any;

    constructor() {
      this.geocoder = new google.maps.Geocoder();
      M.subscribe('search:geocode:fromaddress', _.bind(this.geocode, this));
      M.subscribe('search:search', _.bind(this.search, this));

      var searchResults: string = localStorage.getItem('search');
      if (searchResults) {
        try {
          M.publish('search:results', JSON.parse(searchResults));
        } catch (e) {
          M.publish('notify', 'Cached search results are malformed.');
        }
      }
    }

    geocode(address: string, input: JQuery): void {
      console.log('Looking for ' + address);
      this.geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          M.publish('search:geocode:success', results[0].geometry.location, input);
          console.log('Found');
          console.log(results);
        } else {
          M.publish('search:geocode:fail', status, input);
          console.log('Found nothing');
        }
      });
    }

    search(searchData: TTG.IRawSearchData): void {

      App.ajax.search(searchData)
        .done(function (data: Object, textStatus: string): void {
          M.publish('notify', 'Search was successful');
          localStorage.setItem('search', JSON.stringify(data));
          Utils.doRedirect('results.html');
        }).fail(function (): void {
          M.publish('notify', 'Search failed');
        });
    }
  }
}
