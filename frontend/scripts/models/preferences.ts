module App {
  'use strict';

  export class Preferences extends Backbone.Model {
    urlRoot = (App.production ? '/api' : '/mock') + '/profile/preferences';

    defaults() {
      return {
        options_plane: 1,
        options_public: 1,
        options_taxi: 1,
        options_rental: 1,
        priority: 'plane, rental, taxi, public',
        arrival: 0, // 0: arrival on the same say, 1: arrival on the day before
        breakfast: 1,
        buffer: 30,
        transfer: 1 // 0: short, 1: medium, 2: long
      };
    }
  }
}
