/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />

module App {
  'use strict';

  export class SessionController {
    access_token: string;
    expires: string;

    constructor() {
      M.subscribe('session:signin', _.bind(this.signin, this));
      M.subscribe('session:do:logout', _.bind(this.logout, this));
      M.subscribe('session:do:login', _.bind(this.login, this));

      this.access_token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
      console.log(this);
      if (this.isLoggedIn()) {
        this.updateSync();
        M.publish('session:login', this);
      }
    }

    isLoggedIn(): boolean {
      return !!this.access_token;
    }

    getAccessToken(): string {
      return this.access_token;
    }

    private updateSync(): void {
      $.ajaxSetup({
        headers: { 'x-access-token': this.access_token }
      });
    }

    /* Save access_token after login */
    private login(email: string, access_token: string, expires: string, remember: boolean = false): void {
      this.access_token = access_token;
      this.expires = expires;

      if (remember) {
        // store the access token in the local storage
        localStorage.setItem('username', email);
        localStorage.setItem('access_token', access_token);
      } else {
        // store the access token in the session storage
        sessionStorage.setItem('username', email);
        sessionStorage.setItem('access_token', access_token);
      }
      M.publish('notify', 'Session was saved');
      M.publish('session:login:success', this);
    }

    private logout(): void {
      localStorage.removeItem('access_token');
      sessionStorage.removeItem('access_token');

      // clear session in passport
      // $.get('/logout');

      // TODO show feedback to the user
      Utils.doRedirect('index.html');
    }

    private signin(signinData: ILogin): void {
      console.log(signinData);
      App.ajax.login(signinData)
        .done(function (data: ISession, textStatus: string, jqXHR): void {
          M.publish('notify', 'Login was successful');
          M.publish('session:do:login', signinData.email, data.token, data.expires, signinData.remember);
        }).fail(function (): void {
          M.publish('notify', 'Login failed');
          M.publish('session:login:success', this);
        });
    }
  }
}
