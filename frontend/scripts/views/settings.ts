/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

module App {
  'use strict';

  interface IInputField {
    name: string;
    value: any;
  }

  export class SettingsView extends Backbone.View<Backbone.Model> {
    private controller: App.SettingsController;
    private sortable: Sortable;

    constructor(viewOptions?: Backbone.ViewOptions<Backbone.Model>) {
      super(viewOptions);

      M.subscribe('settings:privacy:fetched', function(){console.log("FETCHED PRIVACY")});
      M.subscribe('settings:privacy:fetched', _.bind(this.updateRender, this));
      M.subscribe('settings:preferences:fetched', _.bind(this.updateRender, this));
      M.subscribe('settings:profile:fetched', _.bind(this.updateRender, this));
      this.setElement('#settings');
    }

    initialize(controller: App.SettingsController): void {
      this.controller = controller;
      this.events = <any>{
        'submit #settings-profile': 'saveProfile',
        'submit #settings-preferences': 'savePreferences',
        'submit #settings-privacy': 'savePrivacy',
        'change .hook-pref-options': 'updatePriorityList',
        'click #unlink-twitter' : 'unlinkTwitter'
      };
      this.updateRender();
    }

    setController(controller: App.SettingsController) {
      this.controller = controller;
    }

    updatePriorityList(): void {
      function optionFilter(s: string): string {
        return s.indexOf('options_') === 0 ? s.slice(8) : s;
      }
      var $list = $('#sortable').empty();
      $('.hook-pref-options input[type="checkbox"]:checked').each( function(index, el) {
        $list.append('<li data-id=' + optionFilter($(el).attr('name')) + '>' + T.settings.preferences.options[ optionFilter($(el).attr('name')) ] + '</li>');
      });
      if($list.get(0)) {
        var priorities = this.controller.getPreferences().attributes['priority'].split(', ');
        priorities = _.map(priorities, optionFilter);
        this.sortable = new Sortable($list.get(0));
        this.sortable.sort(priorities);
      }
    }

    updateRender(): void {
      var profile: App.Profile = this.controller.getProfile();
      var preferences: App.Preferences = this.controller.getPreferences();
      var privacy: App.Privacy = this.controller.getPrivacy();

      var $profile: JQuery = $('.hook-section-profile').empty();
      $profile.append(Tmpl.settings_profile({
        attributes: profile.attributes,
        T: T
      }));

      var $preferences: JQuery = $('.hook-section-preferences').empty();
      $preferences.append(Tmpl.settings_preferences({
        attributes: preferences.attributes,
        T: T
      }));
      this.updatePriorityList();

      var $privacy: JQuery = $('.hook-section-privacy').empty();
      $privacy.append(Tmpl.settings_privacy({
        attributes: privacy.attributes,
        T: T
      }));
    }

    unlinkTwitter(): void {
      M.publish('settings:twitter:unlink');
    }

    saveProfile(event: JQueryEventObject): void {
      event.preventDefault();
      var values: Object = {};
      $.each($(event.target).serializeArray(), function(i: number, field: IInputField): void {
        values[field.name] = field.value;
      });

      M.publish('settings:profile:update', values);
    }

    savePreferences(event: JQueryEventObject): void {
      function optionFilter(s: string): string {
        return s.slice(8);
      }
      event.preventDefault();
      var values: {priority?: string} = {};
      $.each($(event.target).serializeArray(), function(i: number, field: IInputField): void {
        values[field.name] = field.value;
      });
      values.priority = _.map(this.sortable.toArray(), optionFilter).join(', ');
      M.publish('settings:preferences:update', values);
    }

    savePrivacy(event: JQueryEventObject): void {
      event.preventDefault();
      var values: Object = {};
      $.each($(event.target).serializeArray(), function(i: number, field: IInputField): void {
        values[field.name] = field.value;
      });

      M.publish('settings:privacy:update', values);
    }
  }
}
