/// <reference path="../../../_all.ts" />

module Common {

  'use strict';

  /**
   * Check browser's compatibility
   *
   */
  export class CompatibilityChecker {
    constructor(public $q, public browser) {

    }

    isOldBrowser() {
      if(this.browser.isMobileDevice())
        return false;

      return this.$q((resolve, reject) => {
        var supportsFile = (window['File'] && window['FileReader'] && window['FileList'] && window['Blob']);

        var url = window['webkitURL'] || window['URL']; // Safari 6 uses "webkitURL".
        var svg = new Blob(
            ['<svg xmlns=\'http://www.w3.org/2000/svg\'></svg>'],
            { type: 'image/svg+xml;charset=utf-8' }
        );
        var objectUrl = url.createObjectURL(svg);

        if (/^blob:/.exec(objectUrl) === null || !supportsFile) {
          // `URL.createObjectURL` created a URL that started with something other
          // than "blob:", which means it has been polyfilled and is not supported by
          // this browser.
          resolve(true);
        } else {
          angular
            .element('<img/>')
            .on('load', function () {
                resolve(false);
            })
            .on('error', () => {
              resolve(true);
            })
            .attr('src', objectUrl);
        }
      });
    }

    public static Factory() {
      var service = ($q, browser) => {
        return new CompatibilityChecker($q, browser);
      };

      service['$inject'] = ['$q', 'browser'];
      return service;
    }
  }
}
