/// <reference path="../../../_all.ts" />

module Common {
  'use strict';
  
  export class WaitingAnimation {
    public restrict = 'E';
    public templateUrl = 'scripts/app/templates/directives/waiting-animation.html';
    public link: (scope, element, attrs) => void;
    public scope = {}
    
    constructor(private $timeout, 
                private requestSpinnerEvents) {
      WaitingAnimation.prototype.link = (scope, element, attrs): void => {
        var activeMessages = null;
        var activeMessageIndex = 0;
        /**
        * @type boolean - directive visibility
        */
        scope.isShowing = false;
  
        /**
        * Receive show spinner event
        */
        scope.$on(this.requestSpinnerEvents.show, (e, data) => {
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
        scope.$on(requestSpinnerEvents.hide, (e, data) => {
          scope.isShowing = false;
        });
  
        function nextActiveMessages(activeMessages) {
          var messageItem = activeMessages[activeMessageIndex];
  
          if (typeof(messageItem) !== 'undefined') {
            scope.title = messageItem.title;
          }
  
          var nextMessageItem = activeMessages[activeMessageIndex++];
  
          if (typeof(nextMessageItem) !== 'undefined') {
            $timeout(() => {
              nextActiveMessages(activeMessages);
            }, messageItem.time);
          }
        }
      }
    }
    
    public static Factory() {
      var directive = ($timeout, requestSpinnerEvents): any => {
        return new WaitingAnimation($timeout, requestSpinnerEvents);
      }
      directive['$inject'] = ['$timeout', 'requestSpinnerEvents'];
      return directive;
    }
  }
  
};
