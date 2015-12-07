/// <reference path="../../_all.ts" />

module Common {
  
  'use strict';

  /**
  * Convert a string to date and format
  */
  export function dateFormatter(language) {

    return function(date:any,
                    timezone:string,
                    format?:string,
                    style?:string) {

      if (!date || !timezone) return "";

      if(!format)
        format = language.getActiveLanguage().dateFormat + " HH:mm";

      if(style) {
        if(style === 'long')
          format = "dddd, " + format;
      }

      if (typeof(date) == "string" && date.trim() != '') {
        date =  moment.utc(date, 'YYYY-MM-DDTHH:mm:ss');
      }

      try {
        return date.clone().tz(timezone).format(format);
      }
      catch(ex) {
        return "";
      }
    }
  }
}
