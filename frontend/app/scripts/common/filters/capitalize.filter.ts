/// <reference path="../../_all.ts" />

module Common {

  'use strict';

  /**
   * Capitalizes a given string or all words within that string, if all is set
   * to true.
   */
  export function capitalize() {

    return function(input:string, all:boolean) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }) : '';
    }
  }
}