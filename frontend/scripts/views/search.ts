/// <reference path="../typedefs/translate.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />
/// <reference path="../../bower_components/v.js/V.d.ts" />
/// <reference path="../../node_modules/ttg-api/search.api.d.ts" />

module App {
  'use strict';

  export class SearchView extends Backbone.View<Backbone.Model> {
    timepicker: Pikaday;

    constructor(viewOptions?: Backbone.ViewOptions<Backbone.Model>) {
      super(viewOptions);
      this.setElement('#searchForm');
      this.evaluateForm();
    }

    initialize(): void {
      this.events = <any>{
        'submit' : 'startSearch',
        'blur [v-rules]': this.evaluateInput,
        'blur #search-origin': this.geocode,
        'blur [id^=search-destination]': this.geocode
      };

      M.subscribe('search:geocode:success', _.bind(this.geocodeSuccess, this));
      M.subscribe('search:geocode:fail', _.bind(this.geocodeFail, this));

      this.timepicker = new Pikaday({
        field: $('#date-picker').get(0),
        format: 'D MMM YYYY',
        onSelect: function() {
          console.log(this.getMoment().format('Do MMMM YYYY'));
        }
      });

      $('#time-picker-end').timepicker({
        'scrollDefault': 'now',
        timeFormat: 'H:i'
      });

      var timeStartElement: JQuery = $('#time-picker-start');
      timeStartElement.timepicker({
        'scrollDefault': 'now',
        timeFormat: 'H:i'
      });
      timeStartElement.on('changeTime', function(): void {
        console.log("changetime");
        console.log($(this).val());
        $('#time-picker-end').timepicker('option', {
          'minTime': $(this).val(),
          'showDuration': true
        });
      });
    }

    // Return string in the form 2014-11-12T19:05:00
    private getIsoTimeString(date: Moment, time: Moment): string {
      return date
        .hour(time.hour())
        .minute(time.minute())
        .format('YYYY-MM-DDTHH:mm:ss');
    }

    geocode(event: JQueryInputEventObject): void {
      var $input: JQuery = $(event.target);
      var address: string = $input.val();

      $input.parent().removeClass('not-found is-found');
      $input.parent().addClass('is-searching');
      M.publish('search:geocode:fromaddress', address, $(event.target));
    }

    geocodeSuccess(location, $input): void {
      $input.parent().removeClass('not-found is-searching');
      $input.parent().addClass('is-found');
      $input.data('location', location);
    }

    geocodeFail(status, $input): void {
      $input.parent().removeClass('is-found is-searching');
      $input.parent().addClass('not-found');
    }

    evaluateInput(event: JQueryInputEventObject): void {
      $(event.target).validate();
      this.evaluateForm();
    }

    evaluateForm(): void {
      var $submitButton: JQuery = this.$el.find('input[type="submit"]');

      if (this.$el.validate({sideEffects: false})) {
        $submitButton.removeClass('is-disabled');
      } else {
        $submitButton.addClass('is-disabled');
      }
    }

    startSearch(event): void {
      event.preventDefault();

      /*
      var startTime: string = $('#time-picker-start').val();
      var startMoment: Moment = moment(startTime, 'HH:mm');
      var endTime: string = $('#time-picker-end').val();
      var endMoment: Moment = moment(endTime, 'HH:mm');

      var searchData: TTG.IRawSearchData = {
        origin: {
          latitude: $('#search-origin').data('location').lat(),
          longitude: $('#search-origin').data('location').lng()
        },
        appointments: [
          {
            location: {
              latitude: $('#search-destination-0').data('location').lat(),
              longitude: $('#search-destination-0').data('location').lng()
            },
            start: this.getIsoTimeString(this.timepicker.getMoment(), startMoment),
            end: this.getIsoTimeString(this.timepicker.getMoment(), endMoment)
          }
        ],
        oneWay: false,
        settings: {
          currency: 'EUR', // format: "EUR"
          locale: 'de-DE', // format: "de-DE"
          market: 'DE' // format: "DE"
        }
      };

      if (this.$el.validate({})) {
        M.publish('search:search', searchData);
      }
      */
    }
  }
}
