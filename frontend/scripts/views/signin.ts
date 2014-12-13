/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

module App {
  'use strict';

  export class SigninView extends Backbone.View<Backbone.Model> {

    constructor(viewOptions?: Backbone.ViewOptions<Backbone.Model>) {
        super(viewOptions);
        this.setElement('#signinForm');
    }

    initialize(): void {
      this.events = <any>{
        'submit': this.checkForm
      };
      M.subscribe('session:login', _.bind(this.close, this));
    }

    close(): void {
      this.$el.parents('[modal]').find('[modal-close]').trigger('click');
    }

    checkForm(event: JQueryInputEventObject): void {
      event.preventDefault();
      // do magic form validation here

      if (this.$el.validate()) {
        var email: string = this.$el.find('[name=email]').val();
        var password: string = this.$el.find('[name=password]').val();

        M.publish('session:signin', {
          email: email,
          password: password,
          agreement: true
        });
      }
    }

    forgotPassword(): void {
      M.publish('notify', T.toasts.notimplemented);
    }
  }
}
