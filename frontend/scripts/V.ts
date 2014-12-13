/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/underscore/underscore.d.ts" />

module V {
  'use strict';

  export interface IVConfig {
    sideEffects?: boolean;
    affectsParent?: string;
    rulesSelector?: string;
    rulesDivider?: string;
  };

  var defaults: IVConfig = {
    sideEffects: true,
    affectsParent: 'fieldset',
    rulesSelector: 'v-rules',
    rulesDivider: '|'
  };

  var validationRules: Object = {
    required: function(s: string): boolean {
        return s.length > 0;
    },
    email: function(s: string): boolean {
        return s.length === 0 || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(s);
    },
    url: function(s: string): boolean {
        return /((https?):\/\/)?[^ "]+$/.test(s);
    }
  };

  export function validate($element: JQuery, opts: IVConfig): boolean {
    var options: IVConfig = $.extend({}, defaults, opts);

    if ($element.is('form')) {
      return validateForm($element, options);
    } else if ($element.is('input')) {
      return validateInput($element, options);
    }
  }

  function validateInput($input: JQuery, options: IVConfig): boolean {
    // Assuming true, until we find a rule that doesn't match

    var result: boolean = true;
    var value: string;
    var rules: string[] = $input.attr(options.rulesSelector).split('|');

    if ($input.is('input[type="checkbox"]')) {
      value = $input.prop('checked') ? 'x' : '';
     } else {
      value  = $input.val();
     }

    _.each(rules, function(rule: string): void {
      if (validationRules[rule] && validationRules[rule]( value ) !== true) {
        result = false;
      }
    });

    if (options.sideEffects) {
      $input.parents(options.affectsParent)
        .addClass( result ? 'is-valid' : 'is-invalid' )
        .removeClass( result ? 'is-invalid' : 'is-valid' );
    }

    return result;
  }

  function validateForm($form: JQuery, options: IVConfig): boolean {
    var result: boolean = true;

    // Validation rules
    $form.find('[' + options.rulesSelector + ']').each(function(index: number, el: HTMLElement): void {
      var valid: boolean = validateInput($(el), options);
      if ( !valid ) {
        result = false;
      }
    });

    return result;
  }
};

interface JQuery {
  validate(): boolean;
}

$.fn.validate = function(opts: V.IVConfig = {}): boolean {
  var result: boolean;

  // Meh: result is result of last validation; should be used with only one!
  this.each(function(): void {
    result = V.validate($(this), opts);
  });

  return result;
};
