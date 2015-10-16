/// <reference path="../../_all.ts" />

module Index {

  'use strict';

  export class IndexCtrl {

    constructor(private $scope,
                private $state: angular.ui.IState,
                private INDEX_STATE,
                private browser: Common.Browser,
                private isOldBrowser) {

      $scope.indexState = INDEX_STATE.file;
      $scope.isMobile = browser.isMobileDevice();
      $scope.isOldBrowser = isOldBrowser;
    }
  }
}
