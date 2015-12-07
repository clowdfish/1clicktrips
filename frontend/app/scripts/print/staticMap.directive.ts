/// <reference path="../_all.ts" />

module Print {

	'use strict';

	export interface StaticMapData{
		start: ILocation;
		end: ILocation;
	}

	export interface ILocation {
		latitude: number;
		longitude: number;
	}

	export class StaticMap {

		public restrict = 'E';
		public template = '';
		public scope = {
			path: '=',
      start: '=',
      end: '='
		};

		private map: google.maps.Map;
		private mapPath: google.maps.Polyline;

		constructor() {

		}

		public link = (scope, element, attrs) => {
			var $element = $(element);

      var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?';
      mapUrl += 'size=500x400';
      mapUrl += '&maptype=roadmap';
      mapUrl += '&path=weight:3|color:0x0000ff80';

      if (false == _.isEmpty(scope.path)) {
        mapUrl += '|enc:' + scope.path;
      } else {
        mapUrl += '|' +
                  scope.start.latitude.toString()  + ',' +
                  scope.start.longitude.toString() + '|' +
                  scope.end.latitude.toString()    + ',' +
                  scope.end.longitude.toString();
      }

      $element.append('<img src="' + mapUrl + '" />');
		}

    public static Factory(): any {
      var directive = () => {
        return new StaticMap();
      }
      return directive;
    }
	}

}
