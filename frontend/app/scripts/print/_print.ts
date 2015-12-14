/// <reference path="../_all.ts" />

module Print {

	'use strict';

	angular
		.module('app.print', [
			'app.common',
			'app.core'
		])
		.config(routeConfig)
		.controller('printCtrl', PrintCtrl)
		.service('printApi', PrintApi);

}
