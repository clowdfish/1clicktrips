(function() {

  'use strict';

  angular
    .module('app.index')
    .service('newsletterApi', newsletterApi);

  function newsletterApi($q, $http, $translate) {
    this.subscribe = subscribe;

    function subscribe(email) {
      return $q(function(resolve, reject) {
        $http
          .post('/api/subscribe-newsletter', {
            email: email
          }, {
            waitingMessage: $translate.instant('newsletter_subscribing')
          })
          .success(function(message) {
            resolve(getSubscriptionMessage(message));
          })
          .error(function(message) {
            reject(getSubscriptionMessage(message));
          });
      });
    }

    function getSubscriptionMessage(response) {
      switch(response) {
        case "subscription.email.invalid":
          return "newsletter_subscription_invalidemail";
          break;
        case "subscription.email.duplicate":
          return "newsletter_subscription_duplicate";
          break;
        case "subscription.success":
          return "newsletter_subscription_success";
          break;
        case "subscription.api.error":
        case "subscription.error":
        default:
          return "newsletter_subscription_error";
          break;
      }
    }
  }

})();
