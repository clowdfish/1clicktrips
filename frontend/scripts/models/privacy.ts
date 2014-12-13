module App {
  'use strict';

  export class Privacy extends Backbone.Model {
    urlRoot = (App.production ? '/api' : '/mock') + '/profile/privacy';

    defaults() {
      return {
        newsletter: 0
      };
    }
  }
}
