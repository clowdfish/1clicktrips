/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

module App {
  'use strict';

  export class NavView extends Backbone.View<Backbone.Model> {

    constructor(viewOptions?: Backbone.ViewOptions<Backbone.Model>) {
        super(viewOptions);
        this.setElement('nav');
    }

    initialize(): void {
      this.events = <any>{
        'click .js-logout': this.logout
      };
      M.subscribe('session:login', _.bind(this.update, this));
      this.update();
    }

    logout(event): void {
      event.preventDefault();
      M.publish('session:do:logout');
    }

    update(session?: any): void {

      if (session && session.isLoggedIn()) {
        console.log('the nav knows we are :) Logged in');
      }
      var $navbar: JQuery = $('#navigation').empty();
      $navbar.html(Tmpl.navigation({
        loggedin: session ? session.isLoggedIn() : false,
        T: T
      }));
    }
  }
}
