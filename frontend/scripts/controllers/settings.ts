module App {
  'use strict';

  export class SettingsController {
    profile: App.Profile;
    preferences: App.Preferences;
    privacy: App.Privacy;

    constructor() {
      M.subscribe('settings:profile:update', _.bind(this.updateProfile, this));
      M.subscribe('settings:preferences:update', _.bind(this.updatePreferences, this));
      M.subscribe('settings:privacy:update', _.bind(this.updatePrivacy, this));
      M.subscribe('settings:twitter:unlink', _.bind(this.unlinkTwitter, this));
      M.subscribe('session:login', _.bind(this.fetchSettings, this));
      this.profile = new App.Profile();
      this.preferences = new App.Preferences();
      this.privacy = new App.Privacy();
    }

    fetchSettings(): void {
      this.profile.fetch({
        success: function(profile: App.Profile): void {
          M.publish('settings:profile:fetched');
        }
      });
      this.preferences.fetch({
        success: function(preferences: App.Preferences): void {
          M.publish('settings:preferences:fetched');
        }
      });
      this.privacy.fetch({
        success: function(privacy: App.Privacy): void {
          M.publish('settings:privacy:fetched');
        }
      });
    }

    getProfile(): App.Profile {
      return this.profile;
    }

    getPreferences(): App.Preferences {
      return this.preferences;
    }

    getPrivacy(): App.Privacy {
      return this.privacy;
    }

    updateProfile(update: Object): void {
      M.publish('settings:state:waiting');

      M.publish('notify', 'doing da update');
      this.profile.fetch({
        cache: false,
        success: function (profile: App.Profile) {
          profile.save(update, {
            success: function () {
                M.publish('settings:state:success');
                M.publish('notify', 'SUCCESS');
            },
            error: function (err) {
                M.publish('settings:state:failure', err);
                M.publish('notify', 'FAIL');
            }
          });
        }
      });
    }

    updatePreferences(update: Object): void {
      M.publish('settings:state:waiting');

      M.publish('notify', 'doing da update');
      this.preferences.fetch({
        cache: false,
        success: function (preferences: App.Preferences) {
          preferences.save(update, {
            success: function () {
                M.publish('settings:state:success');
                M.publish('notify', 'SUCCESS');
            },
            error: function (err) {
                M.publish('settings:state:failure', err);
                M.publish('notify', 'FAIL');
            }
          });
        }
      });
    }

    updatePrivacy(update: Object): void {
      M.publish('settings:state:waiting');

      M.publish('notify', 'doing da update');
      this.privacy.fetch({
        cache: false,
        success: function (privacy) {
          privacy.save(update, {
            success: function () {
                M.publish('settings:state:success');
                M.publish('notify', 'SUCCESS');
            },
            error: function (err) {
                M.publish('settings:state:failure', err);
                M.publish('notify', 'FAIL');
            }
          });
        }
      });
    }

    unlinkTwitter(): void {
      var access_token: string = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
      $.get('/unlink/twitter', { 'access_token' : access_token }, function(): void {
        location.reload();
      });
    }

  }
}
