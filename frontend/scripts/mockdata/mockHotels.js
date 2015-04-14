(function() {
  angular
    .module('mockdata')
    .value('mockHotels',
      [
        {
          id: 1,
          name: "The New Yorker hotel",
          imageUrl: 'http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg',
          standard: 5,
          distance: 1.5,
          price: 50
        },
        {
          id: 2,
          name: "Empire Hotel",
          imageUrl: 'http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg',
          standard: 4,
          distance: 2.5,
          price: 30
        },
        {
          id: 3,
          name: "Mave Hotel NYC",
          imageUrl: 'http://www.radissonblu.com/images/hotel-ghaziabad/1369345068525.jpg',
          standard: 3,
          distance: 4,
          price: 10
        },
      ]);
})();
