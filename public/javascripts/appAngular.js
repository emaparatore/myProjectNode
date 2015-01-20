angular.module('produciFacile', ['ui.router', 'controllers', 'services'])
.config([
'$stateProvider',
'$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/notFound');

    $stateProvider
      .state('products', {
          url: '/products',
          templateUrl: '/products.html',
          //controller: 'ProductsController'
      })
      .state('notFound', {
          url: '/notFound',
          templateUrl: '/notFound.html'
      })
      .state('clients', {
          url: '/clients',
          templateUrl: '/clients.html'
      });

    
}])

