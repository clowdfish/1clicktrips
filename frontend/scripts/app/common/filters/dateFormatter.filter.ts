/// <reference path="../../../_all.ts" />

module Common {
  
  'use strict';

  /**
  * Convert a string to date and format
  */
  export function dateFormatter(language) {

    return function(date:any,
                    format?:string,
                    style?:string) {

      if (date == null) return "";

      if(!format)
        format = language.getActiveLanguage().dateFormat + " HH:mm";

      if(style) {
        if(style === 'long')
          format = "dddd, " + format;
      }

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
