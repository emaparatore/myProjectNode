angular.module('moduleProduciFacileController', [])
.controller('ProduciFacileController', [
'$scope',
'clients',
'products',
'orders',
function ($scope, clients, products, orders) {
    $scope.clients = clients.clients;
    $scope.products = products.products;
    $scope.orders = orders.orders;

    $scope.order = {};
    $scope.order.date = new Date();
    $scope.order.client = {};
    $scope.order.client._clientId = '';
    $scope.order.client.companyName = '';
    $scope.order.client.dayNotice = '';
    $scope.order.client.averageRevenue = '';
    $scope.order.client.deliveryTime = '';
    

    
    //$scope.today = function () {
    //    $scope.dt = new Date();
    //};
    //$scope.today();

    //$scope.clear = function () {
    //    $scope.dt = null;
    //};

    //// Disable weekend selection
    //$scope.disabled = function (date, mode) {
    //    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    //};

    //$scope.toggleMin = function () {
    //    $scope.minDate = $scope.minDate ? null : new Date();
    //};
    //$scope.toggleMin();

    //$scope.open = function ($event) {
    //    $event.preventDefault();
    //    $event.stopPropagation();

    //    $scope.opened = true;
    //};

    //$scope.dateOptions = {
    //    formatYear: 'yy',
    //    startingDay: 1
    //};

    //$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    //$scope.format = $scope.formats[0];



}]);
