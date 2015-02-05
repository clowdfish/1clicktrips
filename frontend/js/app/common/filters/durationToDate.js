(function(){
  angular
    .module('app.common')
    .filter('durationToDate', durationToDate);

  function durationToDate() {
    return function(duration, format) {
      format = format || '%d days %n night';

      if (duration == null) {
        return '';
      }

      if (format.lastIndexOf('%d') == -1 || format.lastIndexOf('%n') == -1) {
        throw new Error('Invalid format, it should have %d and %n');
      }

      var days = 0;
      var night = 0;
      var isDays = true;
      var hours = Math.floor(duration / 60);
      while (hours >= 12) {
        if (isDays) {
          days++;
          isDays = false;
        } else {
          night++;
          isDays = true;
        }
        hours -= 12;
      }

      var result = format.replace('%d', days);
      result = result.replace('%n', night);
      return result;
    }
  }
})();