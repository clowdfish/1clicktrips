/// <reference path="../../../_all.ts" />
module Common {
  'use strict';
  
  export class Button {
    public restrict = 'E';
    public template = '';
    public compile: (element, attributes) => any;
    
    constructor() {
      Button.prototype.compile = (element, attributes): any => {
        element.addClass('btn');

        if(attributes.type == 'submit') {
          element.addClass('btn-primary');
        }
        
        if(attributes.size) {
          element.addClass('btn-' + attributes.size);
        }
      }
    }
    
    public static Factory() {
      var directive = () => {
        return new Button();
      }
      directive['$inject'] = [];
      return directive;
    }
  }
  
}
