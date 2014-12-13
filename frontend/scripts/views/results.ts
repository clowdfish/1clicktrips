/// <reference path="../typedefs/translate.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

module App {
  'use strict';

  export class ResultsView extends Backbone.View<Backbone.Model> {
    constructor(viewOptions?: Backbone.ViewOptions<Backbone.Model>) {
      super(viewOptions);
      this.setElement('#results');
    }

    initialize(): void {
      this.events = <any>{
        'click .add-appointment' : 'addAppointment',
        'submit' : 'startSearch',
        'click .box-link.address' : 'addAddress',
        'click .title-link.description' : 'addDescription'
      };

      M.subscribe('search:results', _.bind(this.render, this));
    }

    render(results?: TTG.IRawSearchData): ResultsView {
      var $results: JQuery = this.$el.find('.hook-results').empty();
      if (!results) {
        return this;
      }
      _.each(results[0], function(result) {
        $results.append(
          Tmpl.search_result({
            T: T,
            result: result
          })
        );
      });
      return this;
    }
  }
}
