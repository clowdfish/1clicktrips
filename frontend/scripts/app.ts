/// <reference path="typedefs/mediator.d.ts" />
/// <reference path="../node_modules/ttg-api/search.api.d.ts" />
/// <reference path="../typings/handlebars/handlebars.d.ts" />
/// <reference path="../typings/backbone/backbone.d.ts" />
/// <reference path="../typings/moment/moment.d.ts" />

module App {
  'use strict';

  export var production: boolean = false;

  declare class SearchController {}

  export function initialize(): void {

    /*
    Handlebars.registerHelper('key', function(arr: Array<string>, key: string): hbs.SafeString {
      return new Handlebars.SafeString(arr[key]);
    });
    Handlebars.registerHelper('time', function(value: number): hbs.SafeString {
      return new Handlebars.SafeString(moment.unix(value).format('HH:ss'));
    });
    Handlebars.registerHelper('date', function(value: number): hbs.SafeString {
      return new Handlebars.SafeString(moment.unix(value).format('L'));
    });
    */

    Handlebars.registerHelper('transportType', function(value: TTG.TravelOption): string {
      switch (value) {
        case TTG.TravelOption.Walk:
          return 'Walk';
        case TTG.TravelOption.Taxi:
          return 'Taxi';
        case TTG.TravelOption.Car:
          return 'Drive';
        case TTG.TravelOption.Train:
          return 'Train';
        case TTG.TravelOption.Plane:
          return 'Flight';
      }
    });
    Handlebars.registerHelper('transportIcon', function(value: TTG.TravelOption): string {
      switch (value) {
        case TTG.TravelOption.Walk:
          return 'walk';
        case TTG.TravelOption.Taxi:
          return 'taxi';
        case TTG.TravelOption.Car:
          return 'car';
        case TTG.TravelOption.Train:
          return 'train';
        case TTG.TravelOption.Plane:
          return 'flight';
      }
    });
    Handlebars.registerHelper('tripTypeIcon', function(value: TTG.TripResultType): string {
      switch (value) {
        case TTG.TripResultType.Budget:
          return 'usd';
        case TTG.TripResultType.Time:
          return 'clock-o';
        case TTG.TripResultType.Comfort:
          return 'cog';
      }
    });
    Handlebars.registerHelper('tripType', function(value: TTG.TripResultType): string {
      switch (value) {
        case TTG.TripResultType.Budget:
          return 'budget';
        case TTG.TripResultType.Time:
          return 'time';
        case TTG.TripResultType.Comfort:
          return 'comfort';
      }
    });
    Handlebars.registerHelper('currency', function(value: number, currency: string): string {
      if (currency === 'EUR') {
        return value.toFixed(2).toString() + ' €';
      }
    });
    Handlebars.registerHelper('equal', function(lvalue: any, rvalue: any, options: any) {
      if (arguments.length < 3) {
        throw new Error('Handlebars Helper equal needs 2 parameters');
      }
      if (lvalue != rvalue ) {
          return options.inverse(this);
      } else {
          return options.fn(this);
      }
    });

    var navBar: App.NavView = new App.NavView();

    var notificationsController: App.NotificationsController = new App.NotificationsController();
    var searchView: App.SearchView = new App.SearchView();
    var signupView: App.SignupView = new App.SignupView();
    var signinView: App.SigninView = new App.SigninView();
    var resultsView: App.ResultsView = new App.ResultsView();

    var searchController: App.SearchController = new App.SearchController();
    var signupController: App.SignupController = new App.SignupController();
    var settingsController: App.SettingsController = new App.SettingsController();
    var settingsView: App.SettingsView = new App.SettingsView(settingsController);

    // Initialize SessionController last!
    var sessionController: App.SessionController = new App.SessionController();

    // tell jQuery to watch for any 401 or 403 errors and handle them appropriately
    $(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
      switch ( jqxhr.status ) {
        case 401:
          // check if the user is still logged in
          if(jqxhr.responseText === 'status.user.error.token.expired' && true/*Utils.isUserLoggedIn()*/) {
            // Utils.logoutUser();
          }
          // redirect the to the login page.
          // Utils.doRedirect('/#/signin');
          break;
        case 403:
          //Utils.doRedirect('/#/error?message=status.user.error.access.denied');
          break;
        default:
          //Utils.doRedirect('/#/error?message=status.user.error.server');
      }
    });

    // overwrite Backbone sync function to include auth token
    var backboneSync = Backbone.sync;

    Backbone.sync = function (method, model, options) {

        // "options" represents the options passed to the underlying $.ajax call
        var access_token: string = sessionController.getAccessToken(); // Utils.getAccessToken();

        if (access_token) {
            options.headers = {
                'x-access-token': access_token
            };
        }
        // call the original function
        backboneSync(method, model, options);
    };

    // attach event handlers
    var body: JQuery = $('body');

    // do App.Router.initialize();
  }
}

var M: Mediator = new Mediator();

