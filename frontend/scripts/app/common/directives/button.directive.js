angular
  .module('app.common')
  .directive('button', button);

function button() {

  return {
    restrict: 'E',
    template: '',
    compile: function (element, attributes) {

      element.addClass('btn');

      if(attributes.type == 'submit') {
        element.addClass('btn-primary');
      }
      if(attributes.size) {
        element.addClass('btn-' + attributes.size);
      }
    }
  }
}