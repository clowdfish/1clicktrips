/**
* This filter convert duration (minutes) to hours and minutes format
*/
(function() {
  angular
    .module('app.common')
    .filter('durationToTime', durationToTime);

  function durationToTime() {
    return function(duration, format) {
      format = format || '%h hrs %m mins';
      if (duration == null) {
        return '';
      }
      duration = Math.abs(duration);
      if (format.lastIndexOf('%h') == -1 || format.lastIndexOf('%m') == -1) {
        throw new Error('Invalid format, it should have %h and %m');
      }
      var hours = Math.floor(duration / 60);

      var minutes = Math.floor(duration - hours * 60).toString();
      if(minutes.length === 1) {
        minutes = '0' + minutes;
      }

      return format.replace('%h', hours).replace('%m', minutes);
    }
  }
})();
