(function() {

  'use strict';

  angular
    .module('app.booking')
    .directive('bookingPaymentInformation', bookingPaymentInformation);

  function bookingPaymentInformation(dateFilter, session, authApi) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app/templates/booking/booking-payment-information.html',
      scope: {
        bookingData: '=',
        previousStep: '=',
        nextStep: '='
      },
      link: link
    };

    function link(scope, element, attrs) {
      scope.errors = [];
      scope.account = {
        email: null,
        password: null
      };

      scope.back = function() {
        scope.previousStep();
      };

      scope.continue = function() {
        if (session.isLogin() === false) {
          createUserAccount();
        }

        if (false === validateForm()) {
          return;
        }
        scope.nextStep();
      };

      scope.isLogin = session.isLogin();

      /**
      * Prepare months dropdown data
      */
      var months = range(1,12);
      scope.months = [];
      var date = new Date();
      for (var i = 0; i < 12; i++) {
        date.setMonth(i);
        scope.months.push({
          label: dateFilter(date, 'MMM'),
          value: i
        });
      }

      /**
      * Prepare years dropdown data
      */
      date = new Date();
      var startYear = date.getFullYear();
      scope.years = range(startYear, 10);

      function range(start, length) {
        var result = [];
        for (var i = start; i < start + length; i++) {
          result.push(i);
        }
        return result;
      }

      /**
      * Validate form
      */
      function validateForm() {
        scope.error = {};
        return false !== validatePaymentForm();

      }

      function validatePaymentForm() {
        if (false === validateCreditCardNumber(scope.informationForm.cardNumber.$modelValue)) {
          scope.informationForm.cardNumber.$error.invalid = true;
          return false;
        }
      }

      function validateUserForm() {

      }

      function validateCreditCardNumber(number) {
        var regex = new RegExp("^[0-9]{16}$");
        if (!regex.test(number))
          return false;

        return luhnCheck(number);
      }

      function luhnCheck(val) {
        var sum = 0;
        for (var i = 0; i < val.length; i++) {
          var intVal = parseInt(val.substr(i, 1));
          if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
              intVal = 1 + (intVal % 10);
            }
          }
          sum += intVal;
        }
        return (sum % 10) == 0;
      }

      function createUserAccount() {

        if (session.isLogin() === false
          && scope.account.email != null
          && scope.account.password != null) {
          authApi
            .signup(scope.account);
        }
      }
    }
  }
})();
