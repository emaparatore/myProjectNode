angular.module('produciFacile', ['ui.router', 'controllers', 'services'])
.config([
'$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('products', {
          url: '/products',
          templateUrl: '/products.html',
          //controller: 'ProductsController'
      })
      .state('home', {
          url: '/home',
          templateUrl: '/home.html'
      })
      .state('clients', {
          url: '/clients',
          templateUrl: '/clients.html'
      });

    
}])

