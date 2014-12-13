/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

module App {
  'use strict';

  export class SignupView extends Backbone.View<Backbone.Model> {
    constructor(viewOptions?: Backbone.ViewOptions<Backbone.Model>) {
      super(viewOptions);
      this.setElement('#signupForm');
    }

    initialize(): void {
      this.events = <any> {
        'submit' : 'signup'
      };
    }

    private signup(event: JQueryInputEventObject): void {
        event.preventDefault();
        // TODO: do validation here

        if (this.$el.validate()) {
          var email: string = this.$el.find('[name=email]').val();
          var password: string = this.$el.find('[name=password]').val();

          M.publish('signup', {
            email: email,
            password: password,
            agreement: true
          });
        }
    }
  }
}
