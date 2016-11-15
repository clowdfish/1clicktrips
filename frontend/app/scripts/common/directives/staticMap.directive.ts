/// <reference path="../../_all.ts" />

module Common {

	'use strict';

	export interface StaticMapData {
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

      var width = angular.element(document.getElementById('segment-details'))[0].clientWidth;
      width -= 30;

      scope.$watch('start', function() {
        var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?';
        mapUrl += 'size=' + width + 'x' + (width / 1.8).toFixed(0);
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

        $element.text("");
        $element.append('<img width="100%" src="' + mapUrl + '" />');
      });
		};

    public static Factory(): any {
      var directive = () => {
        return new StaticMap();
      };

      return directive;
    }
	}

}
