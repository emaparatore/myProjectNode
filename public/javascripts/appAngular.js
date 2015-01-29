angular.module('produciFacile', ['ui.router', 'controllers', 'services'])
.config([
'$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    //TO DO aggiungere controller allo stateProvider

    $stateProvider
      .state('products', {
          url: '/products',
          templateUrl: '/products.html',
          controller:  'ProductsController',
          resolve : {
              productPromise: ['products', function (products) {
                  return products.getAll();
              }]
          }
      })
      .state('home', {
          url: '/home',
          templateUrl: '/home.html'
      })
      .state('clients', {
          url: '/clients',
          templateUrl: '/clients.html',
          controller: 'ClientsController',
          resolve: {
              clientPromise: ['clients', function (clients) {
                  return clients.getAll();
              }]
          }
      });

    
}])
.directive('myModalMessage', function () {
    return {
        restrict: 'E',
        scope: {
            message: '=myMessage'
        },
        templateUrl: '/modalMessage.html'
    };
});

