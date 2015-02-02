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

    $scope.message = {};

    //dichiarazione e inizializzazione degli oggetti client, product, detail, 
    $scope.client = {}
    $scope.detail = {};
    $scope.detail.product = {};
    $scope.detail.quantita = 0;
   
    //$scope.client._clientId = '';
    //$scope.client.companyName = '';
    //$scope.client.dayNotice = '';
    //$scope.client.averageRevenue = '';
    //$scope.client.deliveryTime = '';

    //dichiarazione e inizializzazione dell'oggetto order e orderDetail
    $scope.order = {};
    $scope.order.date = new Date();
    $scope.order.client = {};
    $scope.order.details = [];


    //associazione ordine - oggetti dello scope
    $scope.order.client._clientId = $scope.client._clientId;
    $scope.order.client.companyName = $scope.client.companyName;
    $scope.order.client.dayNotice = $scope.client.dayNotice;
    $scope.order.client.averageRevenue = $scope.client.averageRevenue;
    $scope.order.client.deliveryTime = $scope.client.deliveryTime;

    

    //funzione che produce l'inserimento temporaneo del dettaglio ordine
    $scope.addDetailOrder = function () {
        var orderDetail = {};
        orderDetail._productId = $scope.detail.product._productId;
        orderDetail.productName = $scope.detail.product.name;
        orderDetail.timeDeposit = $scope.detail.product.timeDeposit;
        orderDetail.quantity = $scope.detail.quantity;
        $scope.order.details.push(orderDetail);
        $scope.detail = {};
        $('#orderDetailsInput1').focus();
    };

    //Funzione che produce l'inserimento dell'ordine
    $scope.addOrder = function () {
        $('#insertOrder').modal('hide');
        orders.create($scope.order, function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            $scope.message.title = 'Inserimento';
            $scope.message.body = 'Ordine inserito';
            $scope.message.modalita = 'insert';
            $scope.order = {};

        });
    };
    
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
