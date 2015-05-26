(function() {

  'use strict';

  angular
    .module('app.index')
    .service('newsletterApi', newsletterApi);

  function newsletterApi($q, $http) {
    this.subscribe = subscribe;

    function subscribe(email) {
      return $q(function(resolve, reject) {
        $http
          .post('/api/subscribe-newsletter', {
            email: email
          })
          .success(function(message) {
            resolve(message);
          })
          .error(function(message) {
            reject(message);
          });
      });
    }
  }

})();
