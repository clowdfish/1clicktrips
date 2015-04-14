(function(){
  angular
    .module('app.common')
    .filter('destinationTypeToIcon', destinationTypeToIcon);

  function destinationTypeToIcon(SUGGESTION_TYPES) {

    return function(destinationType) {
      switch(destinationType) {
        case SUGGESTION_TYPES.events:
          return "fa-rocket";
        case SUGGESTION_TYPES.meetingSpace:
          return "fa-group";
        default:
          return "fa-map-marker";
      }
    }
  }
})();