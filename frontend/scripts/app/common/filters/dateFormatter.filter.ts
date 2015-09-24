/// <reference path="../../../_all.ts" />

module Common {
  
  'use strict';

  /**
  * Convert a string to date and format
  */
  export function dateFormatter() {

    return function(date:any,
                    format?:string) {

      if (date == null) return "";

      if(!format)
        format = "DD.MM.YYYY HH:mm";

      if (typeof(date) == "string" && date.trim() != '') {
        return moment(date, 'YYYY-MM-DDTHH:mm:ss').format(format);
      }

      try {
        return date.format(format);
      }
      catch(ex) {
        return "";
      }
    }
  }
}
