/// <reference path="../../_all.ts" />

module Index {

  'use strict';


  export function routerConfig($stateProvider: angular.ui.IStateProvider) {
    var browser = new Common.Browser();
    var isMobileDevice = browser.isMobileDevice();

    $stateProvider.state('index', {
      abstract: true,
      parent: 'root',
      controller: 'indexCtrl',
      templateUrl: 'scripts/app/templates/index/index.html'
    });

    $stateProvider.state('index.form', {
      url: isMobileDevice ? '/' : '/search',
      templateUrl: 'scripts/app/templates/search/form.html',
      controller: 'searchCtrl',
      resolve: {
        searchFormData: getDefaultSearchFormData
      }
    });

    if (false === isMobileDevice) {
      $stateProvider.state('index.file', {
        url: '/',
        templateUrl: 'scripts/app/templates/search/file.html',
        controller: 'searchCtrl',
        resolve: {
          searchFormData: getDefaultSearchFormData
        }
      });
    }
  }

  /**
   * Creates the default search form data without any pre-populated entries.
   *
   * @returns {*}
   */
  function getDefaultSearchFormData() {

    var startDate = new Date();
    startDate.setDate(startDate.getDate() + 10);

    var startDateObject = moment(startDate);
    var startTimeString = "14:00";

    return {
      originLocation: null,  // the location data
      destinationLocation: null,  // the location data
      startDate: startDateObject,
      origin: null, // the location description
      destination: null, // the location description
      startTimeString: startTimeString,
      targetDate: true
    };
  }
}
