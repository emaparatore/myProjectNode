angular.module('moduleProduciFacileController', [])
.controller('ProduciFacileController', [
'$scope',
'$filter',
'clients',
'products',
'orders',
'productions',
function ($scope, $filter, clients, products, orders,productions) {
    $scope.clients = clients.clients;
    $scope.products = products.products;
    $scope.orders = orders.orders;
    $scope.productions = productions.productions;

    $scope.indexDelete = 0;
    $scope.indexUpdate = 0;
    $scope.modalita = "";
    var lastAction = '';

    $scope.message = {};
    $scope.update = {};


    //dichiarazione e inizializzazione dell'oggetto detail, 
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

    //dichiarazione e inizializzazione dell'oggetto production
    $scope.production = {};
    $scope.production.product = {};
    $scope.production.date = new Date();
    $scope.production.date.setHours(10, 10, 10, 10);

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

    //funzione che prepara l'inserimento dell'ordine
    $scope.startInsertOrder = function () {
        $('#insertUpdateOrder').modal('show');
        $scope.modalita = 'insert';
        if (lastAction == 'update')
        {
            $scope.order = {};
            $scope.order.date = new Date();
            $scope.order.date.setHours(10, 10, 10, 10);
            $scope.order.client = {};
            $scope.order.details = [];
            lastAction = 'insert'
        }
    };

    var trovaCliente = function(idCliente){
        for (i = 0 ; i <= $scope.clients.length ; ++i) {
            if ($scope.clients[i]._id == idCliente)
                return clients.clients[i];
        }};

    //funzione che prepara la modifica dell'ordine
    $scope.startUpdateOrder = function (order) {
        $scope.modalita = 'update';
        lastAction = 'update';
        $scope.order = angular.copy(order);
        //$scope.order = Object.create(order);
        $scope.order.client = trovaCliente(order.client._id);
        $scope.indexUpdate = $scope.orders.indexOf(order);
        $('#insertUpdateOrder').modal('show');
    };

    //funzione che decide l'operazione di inserimento o modifica
    $scope.addUpdateOrder = function () {
        if ($scope.modalita == 'insert')
            addOrder();
        else if($scope.modalita =='update')
            updateOrder();
    };

    //funzione che produce l'inserimento temporaneo del dettaglio ordine
    $scope.addDetailOrder = function () {
        var orderDetail = {};
        orderDetail.productId = $scope.detail.product._id;
        orderDetail.productName = $scope.detail.product.name;
        orderDetail.timeDeposit = $scope.detail.product.timeDeposit;
        orderDetail.quantity = $scope.detail.quantity;
        $scope.order.details.push(orderDetail);
        $scope.detail = {};
        $('#orderDetailsInput1').focus();
    };

    //funzione che produce la cancellazione del dettaglio ordine
    $scope.deleteDetail = function (detail) {
        $scope.order.details.splice($scope.order.details.indexOf(detail), 1);
    };

    //Funzione che produce l'inserimento dell'ordine
    var addOrder = function () {

        //var date = new String( $filter('date')($scope.order.date, 'yyyy-MM-dd'));

        //$scope.order.lastDay = setLastDay($scope.order.date.getDate(),
        //                            $scope.order.date.getMonth(),
        //                            $scope.order.date.getFullYear(),
        //                            $scope.order.client.deliveryTime);
        
        //$scope.order.client.clientId = $scope.selectClient.client._id;
        //$scope.order.client.companyName = $scope.selectClient.client.companyName;
        //$scope.order.client.dayNotice = $scope.selectClient.client.dayNotice;
        //$scope.order.client.averageRevenue = $scope.selectClient.client.averageRevenue;
        
        $scope.order.lastDay = $scope.order.date.getTime() -
            ($scope.order.client.deliveryTime * 1000 * 3600 * 24);
        $('#insertUpdateOrder').modal('hide');
        orders.create($scope.order, function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            $scope.message.title = 'Inserimento';
            $scope.message.body = 'Ordine inserito';
            $scope.message.modalita = 'insert';
            $scope.order = {};
            $scope.order.date = new Date();
            $scope.order.date.setHours(10, 10, 10, 10);
            $scope.order.client = {};
            $scope.order.details = [];

        });
    };

    //funzione che produce l'update dell'ordine
    var updateOrder = function () {
        $('#insertUpdateOrder').modal('hide');

        orders.update($scope.orders[$scope.indexUpdate]._id, $scope.order, $scope.indexUpdate, function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            $scope.message.title = 'Modifica';
            $scope.message.body = 'Ordine modificato';
            $scope.message.modalita = 'update';

        });
    }
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

    //funzione che prepara la creazione della produzione
    $scope.startInsertProduction = function () {
        $('#insertUpdateProduction').modal('show');
        $scope.modalita = 'insert';
        if (lastAction == 'update') {
            $scope.production = {};
            $scope.production.product = {};
            $scope.production.date = new Date();
            $scope.production.date.setHours(10, 10, 10, 10);
            lastAction = 'insert';
        }
    };

    var trovaProdotto = function (idProdotto) {
        for (i = 0 ; i <= $scope.products.length ; ++i) {
            if ($scope.products[i]._id == idProdotto)
                return products.products[i];
        }
    };

    //funzione che prepara la modifica della produzione
    $scope.startUpdateProduction = function (production) {
        $scope.modalita = 'update';
        lastAction = 'update';
        $scope.production = angular.copy(production);
        //$scope.order = Object.create(order);
        $scope.production.product = trovaProdotto(production.product._id);
        $scope.indexUpdate = $scope.productions.indexOf(production);
        $('#insertUpdateProduction').modal('show');
    };

    //funzione che decide l'operazione di inserimento o modifica
    $scope.addUpdateProduction = function () {
        if ($scope.modalita == 'insert')
            addProduction();
        else if ($scope.modalita == 'update')
            updateProduction();
    };

    //Funzione che produce l'inserimento della produzione
    var addProduction = function () {
        
        $('#insertUpdateProduction').modal('hide');
        productions.create($scope.production, function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            $scope.message.title = 'Inserimento';
            $scope.message.body = 'Produzione inserita';
            $scope.message.modalita = 'insert';
            $scope.production = {};
            $scope.production.product = {};
            $scope.production.date = new Date();
            $scope.production.date.setHours(10, 10, 10, 10);
        });
    };

    //funzione che produce l'update della produzione
    var updateProduction = function () {
        $('#insertUpdateProduction').modal('hide');

        productions.update($scope.productions[$scope.indexUpdate]._id, $scope.production, $scope.indexUpdate, function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            $scope.message.title = 'Modifica';
            $scope.message.body = 'Produzione modificata';
            $scope.message.modalita = 'update';

        });
    }
    //funzione che prepara la cancellazione della produzione 
    $scope.startDeleteProduction = function (production) {
        $scope.indexDelete = $scope.productions.indexOf(production);
        $("#deleteProduction").modal('show');
    };

    //funzione che produce la cancellazione dell'ordine
    $scope.deleteProduction = function () {
        productions.delete($scope.productions[$scope.indexDelete]._id, function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            $scope.message.title = 'Cancellazione';
            $scope.message.body = 'Produzione rimossa';
            $scope.message.modalita = 'delete';
            $scope.productions.splice($scope.indexDelete, 1);
        });

    }

    //funzione che calcola il livello
    $scope.calcolaLivello = function (order) {
        var livello = new Number();
        var index = $scope.orders.indexOf(order);
        for (i = 0; i < $scope.orders.length ; ++i){
            if (i != index) {
                if($scope.orders[i].lastDay < order.lastDay ){}
            }
        }
            
        
        return livello;
    }

    // funzione che prepara la modifica della data dell'ordine
    $scope.beginUpdateOrderDate = function (order) {
        $('#updateDate').modal('show');
        $scope.order = angular.copy(order);
        $scope.update.date = $scope.order.date;
        $scope.indexUpdate = $scope.orders.indexOf(order);
    }

    // funzione che modifica la data dell'ordine
    $scope.updateDateOrder = function () {
        $('#updateDate').modal('hide');
        $scope.order.date = $scope.update.date;
        orders.update($scope.orders[$scope.indexUpdate]._id, $scope.order, $scope.indexUpdate, function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            $scope.message.title = 'Modifica';
            $scope.message.body = 'Ordine modificato';
            $scope.message.modalita = 'update';

        });
    }

}]);
