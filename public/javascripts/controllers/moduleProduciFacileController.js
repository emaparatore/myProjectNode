angular.module('moduleProduciFacileController', [])
.controller('ProduciFacileController', [
'$scope',
'$filter',
'clients',
'products',
'orders',
function ($scope, $filter, clients, products, orders) {
    $scope.clients = clients.clients;
    $scope.products = products.products;
    $scope.orders = orders.orders;

    $scope.indexDelete = 0;
    $scope.modalita = "";
    var lastAction = '';

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
    $scope.order.date.setHours(10, 10, 10, 10)
    $scope.order.client = {};
    $scope.order.details = [];

    //associazione ordine - oggetti dello scope
    $scope.order.client._clientId = $scope.client._clientId;
    $scope.order.client.companyName = $scope.client.companyName;
    $scope.order.client.dayNotice = $scope.client.dayNotice;
    $scope.order.client.averageRevenue = $scope.client.averageRevenue;
    $scope.order.client.deliveryTime = $scope.client.deliveryTime;

    //var setLastDay = function (giorno,mese,anno,deliveryTime) {
    //    alert(giorno + '/' + mese + '/' + anno);
    //    alert(deliveryTime);
        
    //    var date = new Date();
    //    date.setDate(new Number(giorno));
    //    date.setMonth(new Number(mese));
    //    date.setFullYear(new Number(anno));
    //    date = date.getTime() - (deliveryTime *( 1000 * 3600 * 24));

    //    //var deliveryTimeNumber = new Number(deliveryTime);
    //    //date.setDate(date.getDate() - deliveryTimeNumber);
    //    alert (date);
    //    return date;
    //};

    

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

        //var date = new String( $filter('date')($scope.order.date, 'yyyy-MM-dd'));

        //$scope.order.lastDay = setLastDay($scope.order.date.getDate(),
        //                            $scope.order.date.getMonth(),
        //                            $scope.order.date.getFullYear(),
        //                            $scope.order.client.deliveryTime);
        
        $scope.order.lastDay = $scope.order.date.getTime() -
            ($scope.order.client.deliveryTime * 1000 * 3600 * 24);

        orders.create($scope.order, function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            $scope.message.title = 'Inserimento';
            $scope.message.body = 'Ordine inserito';
            $scope.message.modalita = 'insert';
            $scope.order = {};
            $scope.order.date = new Date();
            $scope.order.date.setHours(10, 10, 10, 10)
            $scope.order.client = {};
            $scope.order.details = [];

        });
    };

    //funzione che produce la cancellazione del dettaglio ordine
    $scope.deleteDetail = function (detail) {
        $scope.order.details.splice($scope.order.details.indexOf(detail), 1);  
    };

    //funzione che prepara la cancellazione dell'ordine 
    $scope.startDeleteOrder = function (order) {
        $scope.indexDelete = $scope.orders.indexOf(order);
        $("#deleteOrder").modal('show');
    };
    
    //funzione che produce la cancellazione dell'ordine
    $scope.deleteOrder = function () {
        orders.delete($scope.orders[$scope.indexDelete]._id, function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            $scope.message.title = 'Cancellazione';
            $scope.message.body = 'Ordine rimosso';
            $scope.message.modalita = 'delete';
            $scope.orders.splice($scope.indexDelete, 1);
        });

    }

    //$scope.dataScadenza = function (dataConsegna) {
    //    var date = new Date(dataConsegna);
    //    date.setDate(date.getDate() + 3);
    //    return date;
    //};

    
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
