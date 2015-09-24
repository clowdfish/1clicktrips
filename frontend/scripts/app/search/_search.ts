/// <reference path="../../_all.ts" />

module Search {

  'use strict';

  angular
    .module('app.search', [
      'app.core'
    ])
    .service('suggestionAdapter', SuggestionAdapter.Factory())
    .controller('searchCtrl', SearchCtrl)    
    .controller('searchDateTimeSelectCtrl', SearchDateTimeSelectCtrl)
    .controller('searchDestinationFormCtrl', SearchDestinationFormCtrl)
    .controller('searchOriginCtrl', SearchOriginCtrl);
}