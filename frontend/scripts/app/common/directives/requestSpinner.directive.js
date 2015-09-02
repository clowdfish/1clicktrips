(function() {

  'use strict';

  angular
    .module('app.common')
    .directive('requestSpinner', requestSpinner);

  function requestSpinner($timeout, requestSpinnerEvents) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/common/request-spinner.html',
      link: link,
      scope: {}
    };

    function link(scope, element, attrs) {
      var activeMessages = null;
      var activeMessageIndex = 0;
      /**
      * @type boolean - directive visiblity
      */
      scope.isShowing = false;

      /**
      * Receive show spinner event
      */
      scope.$on(requestSpinnerEvents.show, function(e, data) {
        scope.isShowing = true;
        activeMessageIndex = 0;

        if (_.has(data, 'title')) {
          scope.title = data.title;
        }
        else if (_.has(data, 'activeMessages')) {
          activeMessages = data.activeMessages;

          if (activeMessages.length == 0) {
            throw new Error("Can not provide empty messages.");
          }

          nextActiveMessages(activeMessages);
        }
      });

      /**
      * Receive hide spinner event
      */
      scope.$on(requestSpinnerEvents.hide, function(e, data) {
        scope.isShowing = false;
      });

      function nextActiveMessages() {
        var messageItem = activeMessages[activeMessageIndex];

        if (typeof(messageItem) !== 'undefined') {
          scope.title = messageItem.title;
        }

        var nextMessageItem = activeMessages[activeMessageIndex++];

        if (typeof(nextMessageItem) !== 'undefined') {
          $timeout(function() {
            nextActiveMessages();
          }, messageItem.time);
        }
      }
    }
  }
})();
