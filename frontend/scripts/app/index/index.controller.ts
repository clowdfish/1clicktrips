/// <reference path="../../_all.ts" />

module Index {

  'use strict';

  export class IndexCtrl {

    constructor(private $scope,
                private browser: Common.Browser,
                private isOldBrowser) {

      $scope.isMobile = browser.isMobileDevice();
      $scope.isOldBrowser = isOldBrowser;
    }
  }
}
