/// <reference path="../../../_all.ts" />

module Common {
  
  'use strict';

  /**
  * Convert an itinerary into a route title
  */
  export function titleExtractor() {

    return function(itinerary:any) {

      return "Test title from somewhere to somewhere";
    }
  }
}
