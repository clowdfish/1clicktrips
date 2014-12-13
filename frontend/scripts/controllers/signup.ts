/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />

module App {
  'use strict';

  export class SignupController {
    constructor() {
      M.subscribe('signup', _.bind(this.submit, this));
    }

    private submit(signupData: ILogin): void {
      App.ajax.signup(signupData)
        .done(function (data: ISession, textStatus: string, jqXHR): void {
          console.log(data);
          M.publish('notify', 'Signup was successful');
          M.publish('session:do:login', signupData.email, data.token, data.expires);
        })
        .fail(function(): void {
          M.publish('notify', 'Signup failed hard');
          'status.user.error.signup.exists';
        });
    }
  }
}
