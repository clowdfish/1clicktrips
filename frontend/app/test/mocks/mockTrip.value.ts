/// <reference path="../_test.ts" />

var mockTrip:any = require('../../data/mockTrip.json');

module Mocks {

	'use strict';

	angular
		.module('mocks')
		.value('mockTrip', mockTrip);

}