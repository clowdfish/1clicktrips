(function(){
  angular
    .module('app.common')
    .filter('destinationTypeToIcon', destinationTypeToIcon);

  function destinationTypeToIcon() {
    return function(destinationType) {

      switch(destinationType) {
        case "Event":
          return "fa-rocket";
        case "Meeting Space":
          return "fa-group";
        default:
          return "fa-map-marker";
      }
    }
  }
})();