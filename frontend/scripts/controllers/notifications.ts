/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />

module App {
  'use strict';

  export class NotificationsController {

    constructor() {
      M.subscribe('notify', _.bind(this.notify, this));
    }

    private notify(notification: string): void {
      console.log('Notification: ' + notification);
    }
  }
}
