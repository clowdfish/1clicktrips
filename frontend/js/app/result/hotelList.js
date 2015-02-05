(function() {
  angular
    .module('app.result')
    .directive('hotelList', hotelList);

  function hotelList() {
    return {
      restrict: 'EA',
      templateUrl: 'js/templates/result/hotel-list.html',
      scope: {
        selectHotel: '=',
        segment: '=',
        hotels: '=',
        closeHotelPanel: '='
      },
      link: link
    }

    function link(scope, element, attrs) {

    }
  }
})();