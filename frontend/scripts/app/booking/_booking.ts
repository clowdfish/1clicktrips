/// <reference path="../../_all.ts" />

module Booking {

	'use strict';

	angular
		.module('app.booking', [
			'app.common',
			'app.core'
		])
		.config(routeConfig)
    .directive('staticMap', StaticMap.Factory())
		.controller('bookingCtrl', BookingCtrl)
		.service('bookingApi', BookingApi);

}
