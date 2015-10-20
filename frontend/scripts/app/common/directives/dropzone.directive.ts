/// <reference path="../../../_all.ts" />

module Common {

	'use strict';

	interface IDropzoneScope extends ng.IScope {
		schedule: Object;
		error: Object;
		processFile: Function;
	}

	export class Dropzone {

		public restrict = 'E';
		public templateUrl = 'scripts/app/templates/directives/dropzone.html';
		public scope = {
			schedule: '=',
		};

		public scopeService: IDropzoneScope;

		constructor(public googleMap: Common.GoogleMap,
								public $q: ng.IQService) {

		}

		public link = (scope: IDropzoneScope, element, attrs) => {
			this.scopeService = scope;
			this.scopeService.error = null;
			this.scopeService.processFile = this.processFile;
		};

		processFile = (fileObj) => {
			if (fileObj) {
				// the file.type property is not always available
				if (!fileObj.type.length || fileObj.type.indexOf('text') != -1) {

					var reader = new FileReader();

					reader.onerror = this.errorHandler;
					reader.onload = () => {
						// the file is ready
						this.scopeService.$apply(() => {
							this.parseIcsFile(this.scopeService, reader.result)
								.then((parseResult) => {
									this.scopeService.schedule = parseResult;
								}, (err) => {
									this.scopeService.error = err;
								});
						});
					};

					reader.readAsText(fileObj, 'utf-8');
				}
				else
					this.scopeService.error = new Error('File type is not supported.');
			}
			else
				console.warn('The file is null.');
		};

		errorHandler = (evt) => {
			switch(evt.target.error.code) {
				case evt.target.error.NOT_FOUND_ERR:
					alert('File Not Found!');
					break;
				case evt.target.error.NOT_READABLE_ERR:
					alert('File is not readable!');
					break;
				case evt.target.error.ABORT_ERR:
					break;
				default:
					alert('An error occurred reading this file.');
			}
		};

		/**
		 * The parser for the .ics file format.
		 *
		 * @param scope
		 * @param text
		 */
		parseIcsFile = (scope, text) => {
		 	return this.$q((resolve, reject) => {
		 		var linesArray = text.split("\n");

		 		if (linesArray.length < 5) {
		 			return reject(Error('Wrong file structure or encoding.'));
		 		}

		 		var icsHierarchy = [];
		 		var appointmentObject = {};

		 		linesArray.forEach((line) => {
		 			var hierarchy;

		 			if (line.indexOf('BEGIN') == 0) {
		 				hierarchy = line.split(':')[1];
		 				icsHierarchy.push(hierarchy.substr(0, hierarchy.length - 1));
		 			}
		 			else if (line.indexOf('END') == 0) {
		 				hierarchy = line.split(':')[1];
		 				hierarchy = hierarchy.substr(0, hierarchy.length - 1);

		 				if (icsHierarchy[icsHierarchy.length - 1] == hierarchy)
		 					icsHierarchy.pop();
		 				else {
		 					scope.error = new Error('Wrong file structure.');
		 				}
		 			}
		 			else if (icsHierarchy[icsHierarchy.length - 1] == 'VEVENT') {

		 				if (line.indexOf('DTSTART') == 0)
		 					appointmentObject['time'] = this.formatTiming(line.split(':')[1]);

		 				if (line.indexOf('DTEND') == 0)
		 					appointmentObject['appointmentEnd'] = this.formatTiming(line.split(':')[1]);

		 				if (line.indexOf('LOCATION') == 0) {
		 					appointmentObject['destinationAddress'] = this.formatAddress(line.substr(9));
		 				}

		 				if (line.indexOf('SUMMARY') == 0)
		 					appointmentObject['title'] = line.substr(8);

		 				if (line.indexOf('COORDINATES') == 0) {
		 					appointmentObject['destination'] = this.parseGeoCoordinates(line.split(':')[1]);
		 				}
		 			}
		 		});

				if (!appointmentObject.hasOwnProperty('title'))
					appointmentObject['title'] = 'Your appointment data';

				var complete =
					appointmentObject.hasOwnProperty('destination') &&
					appointmentObject['destination'].hasOwnProperty('latitude') &&
					appointmentObject['destination'].hasOwnProperty('longitude') &&
					appointmentObject.hasOwnProperty('destinationAddress') &&
					appointmentObject.hasOwnProperty('time');

				if (complete) {
					return resolve(appointmentObject);
				} else if (!appointmentObject.hasOwnProperty('destination') && appointmentObject.hasOwnProperty('destinationAddress')) {
					this.googleMap
						.geocode(appointmentObject['destinationAddress'])
						.then((location) => {
							appointmentObject['destination'] = location;
							return resolve(appointmentObject);
						}, (err) => {
							return reject(Error('Can not parse destination location'));
						});
				} else {
					return reject(new Error('Wrong file structure.'));
				}
			});
		};

		/**
		 * Replace line breaks with comma.
		 *
		 * @param text
		 * @returns {string}
		 */
		formatAddress = (text) => {
		 	return text.replace('\\n', ', ');
		};

		/**
		 * Create moment object out of datetime string
		 *
		 * @param text
		 * @returns {*}
		 */
		formatTiming = (text) => {
			return moment(text, 'YYYYMMDDTHHmmss').toDate();
		};

		/**
		 * Create geo data object from string.
		 *
		 * @param text
		 * @returns {{latitude: Number, longitude: Number}}
		 */
		parseGeoCoordinates = (text) => {
		 	var textArray = text.split(',');

		 	return {
		 		latitude: parseFloat(textArray[0]),
		 		longitude: parseFloat(textArray[1])
		 	};
		};

		public static Factory(): any {
			 	var directive = (googleMap: Common.GoogleMap, $q: ng.IQService) => {
			 		return new Dropzone(googleMap, $q);
			 	};

			 	directive['$inject'] = ['googleMap', '$q'];
			 	return directive;
		 	}
		}
}
