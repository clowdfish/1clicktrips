/// <reference path="../../_all.ts" />

module Common {

  'use strict';

  /**
  * Convert a string to a distance format
  */
  export function distanceFormatter() {

    return function(distance) {

      if (distance && (typeof(distance) == 'string' && distance.trim() != '') || typeof(distance) == 'number') {
        distance = parseFloat(distance);

        if(distance < 1) {
          distance = distance * 1000;
          return distance.toFixed(0) + "m";
        }
        else {
          return distance.toFixed(2) + "km";
        }
      }
      return '';
    }
  }
}
