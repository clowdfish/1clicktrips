module App {
  'use strict';

  export class Profile extends Backbone.Model {
    urlRoot = (App.production ? '/api' : '/mock') + '/profile/details';

    defaults() {
      return {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        twitter: '',
        address: 'Street // ZIP City'
      };
    }
  }
}
