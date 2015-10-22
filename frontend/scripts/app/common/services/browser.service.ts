/// <reference path="../../../_all.ts" />

module Common {

  'use strict';

  export class Browser {

    constructor() {
    }

    /**
     * Try to figure out, if the user uses a mobile device.
     */
    public isMobileDevice() {
      // the resolution is no good indicator for a mobile device
      if (this.getViewport().width <= 480)
        return true;

      return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Get the resolution of the browser window.
     */
    public getViewport() {
      var e: any = window,
          a = 'inner';
      if ( !( 'innerWidth' in window ) ) {
        a = 'client';
        e = document.documentElement || document.body;
      }
      return {
        width : e[ a + 'Width' ] ,
        height : e[ a + 'Height' ]
      }
    }
  }
}