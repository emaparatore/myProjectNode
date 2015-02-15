angular.module('moduleProduciFacileController', [])
.controller('ProduciFacileController', [
'$scope',
'$filter',
'clients',
'products',
'orders',
'productions',
function ($scope, $filter, clients, products, orders, productions) {
    $scope.clients = clients.clients;
    $scope.products = products.products;
    $scope.orders = orders.orders;
    
    $scope.productions = productions.productions;

    $scope.indexDelete = -1;
    $scope.indexUpdate = -1;
    $scope.modalita = "";
    var lastAction = '';

    $scope.message = {};

    $scope.date = new Date();

    $scope.indexSelectedDetail = -1;
    $scope.alertOrderDetail = false;
    $scope.alertProductionQuantity = false;
    $scope.indexDuplicateDetail = -1;

    $scope.deltaQuantity = null;
    $scope.productionDeltaQuantity = null;


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
            $scope.detail = {};
            $scope.detail.product = {};
            $scope.detail.quantita = 0;
            $scope.alertOrderDetail = false;

            lastAction = 'insert'
        }
    };

    //funzione che verifica che un cliente sia stato selezionato durante l'inserimento
    //non utilizzata
    $scope.clientSelected = function () {
        return (!($.isEmptyObject($scope.order.client)));
    }

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

    //funzione che controlla se un prodotto è già presente nei dettagli
    //TO DO
    //var checkDetail = function () {

    //}

    //funzione che produce l'inserimento temporaneo del dettaglio ordine
    $scope.addDetailOrder = function () {

        var productDuplicate = false;
        for(i=0; i<$scope.order.details.length;++i){
            if ($scope.order.details[i].product.name == $scope.detail.product.name){
                productDuplicate = true;
                $scope.indexDuplicateDetail = i;
                $scope.alertOrderDetail = true;
                break;
            }
        }
        if (!productDuplicate) {
            $scope.order.details.push($scope.detail);
        $scope.detail = {};
        }
        $('#orderDetailsInput1').focus();
    };

    //funzione che produce la cancellazione temporanea del dettaglio ordine
    $scope.deleteDetail = function (detail) {
        $scope.order.details.splice($scope.order.details.indexOf(detail), 1);
    };

    //funzione che nasconde l'alert del dettaglio prodotto
    $scope.hideAlertOrderDetail = function () {
        $scope.alertOrderDetail = false;
    }

    

    //Funzione che produce l'inserimento dell'ordine
    var addOrder = function () {

        if (!($.isEmptyObject($scope.order.client)) && ($scope.order.details.length != 0)) {

           
            $('#insertUpdateOrder').modal('hide');
            orders.create($scope.order, function () {
                setTimeout(function () {
                    $('#modalSuccessMessage').modal('show');
                }, 500);
                produciFacile();
                $scope.message.title = 'Inserimento';
                $scope.message.body = 'Ordine inserito';
                $scope.message.modalita = 'insert';
                $scope.order = {};
                $scope.order.date = new Date();
                $scope.order.date.setHours(10, 10, 10, 10);
                $scope.order.client = {};
                $scope.order.details = [];

            });
        }
    };

    //funzione che produce l'update dell'ordine
    var updateOrder = function () {
        $('#insertUpdateOrder').modal('hide');
        $scope.order.lastDay = $scope.order.date.getTime() -
            ($scope.order.client.deliveryTime * 1000 * 3600 * 24);
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
        orders.delete($scope.orders[$scope.indexDelete]._id,
            $scope.indexDelete,
            function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            produciFacile();
            $scope.message.title = 'Cancellazione';
            $scope.message.body = 'Ordine rimosso';
            $scope.message.modalita = 'delete';
            
        });

    }

    // funzione che prepara la modifica della data dell'ordine
    $scope.beginUpdateOrderDate = function (order) {
        //$scope.order = angular.copy(order);
        //$scope.order.client = trovaCliente(order.client._id);
        $scope.indexUpdate = $scope.orders.indexOf(order);
        $scope.date = order.date;
        lastAction = 'update';
        $('#updateDate').modal('show');
    }

    // funzione che modifica la data dell'ordine
    $scope.updateDateOrder = function () {
        $('#updateDate').modal('hide');
        //$scope.order.lastDay = $scope.order.date.getTime() -
        //    ($scope.order.client.deliveryTime * 1000 * 3600 * 24);
        orders.updateDate($scope.orders[$scope.indexUpdate]._id,
            $scope.orders[$scope.indexUpdate],
            $scope.date,
            $scope.indexUpdate,
            function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            produciFacile();
            $scope.message.title = 'Modifica';
            $scope.message.body = 'Ordine modificato';
            $scope.message.modalita = 'update';
        });
    }

    //funzione che prepara la cancellazione di un dettaglio ordine
    $scope.startDeleteOrderDetail = function (order, detail) {
        if(order.details.length==1){

        }else{
            lastAction = 'update';
            $scope.indexUpdate = $scope.orders.indexOf(order);
            $scope.indexSelectedDetail = order.details.indexOf(detail);
            //$scope.order = angular.copy(order);
            $('#deleteOrderDetail').modal('show');
        }
    }

    //funzione che produce la cancellazione di un dettaglio ordine
    $scope.deleteOrderDetail = function () {
        orders.updateDeleteDetail($scope.orders[$scope.indexUpdate]._id,
            $scope.orders[$scope.indexUpdate],
            $scope.indexSelectedDetail,
            $scope.indexUpdate,
            function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            produciFacile();
            $scope.message.title = 'Cancellazione';
            $scope.message.body = 'Dettaglio rimosso';
            $scope.message.modalita = 'delete';

        });
    }

    //funzione che setta il focus in modalità modifica dettaglio ordine
    $('#updateOrderDetail').on('shown.bs.modal', function () {
        $('#updateOrderDetailFormInput1').focus();
    });

    //funzione che prepara la modifica di un dettaglio ordine
    $scope.beginUpdateOrderDetail = function (order, detail) {
        lastAction = 'update';
        $scope.indexUpdate = $scope.orders.indexOf(order);
        $scope.indexSelectedDetail = order.details.indexOf(detail);
        //$scope.order = angular.copy(order);
        $scope.deltaQuantity = null;
        $('#updateOrderDetail').modal('show');
    }

    //funzione che produce la modifica di un dettaglio ordine
    $scope.updateOrderDetail = function () {
        $('#updateOrderDetail').modal('hide');
        orders.updateDetail($scope.orders[$scope.indexUpdate]._id,
            $scope.orders[$scope.indexUpdate],
            $scope.indexSelectedDetail,
            $scope.indexUpdate,
            $scope.deltaQuantity,
            function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            produciFacile();
            $scope.message.title = 'Modifica';
            $scope.message.body = 'Dettaglio modificato';
            $scope.message.modalita = 'update';

        });
    }

    //funzione che prepara la creazione di un dettaglio ordine
    $scope.beginAddOrderDetail = function (order) {
        $('#insertDetailOrder').modal('show');
        $scope.indexUpdate = $scope.orders.indexOf(order);
        $scope.details = angular.copy(order.details);
    }

    //funzione che produce l'inserimento permanente di un nuovo dettaglio ordine
    $scope.addNewDetailOrder = function () {
        var productDuplicate = false;
        for (i = 0; i < $scope.details.length; ++i) {
            if ($scope.details[i].product.name == $scope.detail.product.name) {
                productDuplicate = true;
                $scope.indexDuplicateDetail = i;
                $scope.alertOrderDetail = true;
                break;
            }
        }
        if (!productDuplicate) {
            //$scope.order.details.push($scope.detail);
            $('#insertDetailOrder').modal('hide');
            orders.updateInsertDetail($scope.orders[$scope.indexUpdate]._id,
                $scope.orders[$scope.indexUpdate],
                $scope.detail,
                $scope.indexUpdate,
                function () {
                    setTimeout(function () {
                        $('#modalSuccessMessage').modal('show');
                    }, 500);
                    produciFacile();
                    $scope.message.title = 'Modifica';
                    $scope.message.body = 'Dettaglio inserito';
                    $scope.message.modalita = 'update';
                    $scope.detail = {};
                });
           
        }
        $('#orderDetailsInput1').focus();
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


    //funzione che nasconde l'alert della quantità produzione
    $scope.hideAlertProductionQuantity = function () {
        $scope.alertProductionQuantity = false;
    }

    $('#insertUpdateProduction').on('hide.bs.modal', function () {
        $scope.alertProductionQuantity = false;
    })

    //funzione che assegna alla quantità di produzione la quantità massima
    $scope.fillProduction = function () {
        //angular.copy($scope.production.product.maxDailyProduction, $scope.production.quantity);
        $scope.production.quantity = $scope.production.product.maxDailyProduction
    }

    //Funzione che produce l'inserimento della produzione
    var addProduction = function () {
        if($scope.production.quantity > $scope.production.product.maxDailyProduction){
            $scope.alertProductionQuantity = true;
            $scope.production.quantity = 0;
        }else{
            $('#insertUpdateProduction').modal('hide');
            productions.create($scope.production, function () {
                setTimeout(function () {
                    $('#modalSuccessMessage').modal('show');
                }, 500);
                produciFacile();
                $scope.message.title = 'Inserimento';
                $scope.message.body = 'Produzione inserita';
                $scope.message.modalita = 'insert';
                $scope.production = {};
                $scope.production.product = {};
                $scope.production.date = new Date();
                $scope.production.date.setHours(10, 10, 10, 10);
            });
        }
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

    //funzione che produce la cancellazione della produzione
    $scope.deleteProduction = function () {
        productions.delete($scope.productions[$scope.indexDelete]._id, function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            produciFacile();
            $scope.message.title = 'Cancellazione';
            $scope.message.body = 'Produzione rimossa';
            $scope.message.modalita = 'delete';
            $scope.productions.splice($scope.indexDelete, 1);
        });

    }
    
    //funzione che setta il focus  in modalità modifica quantità produzione 
    $('#updateQuantityProduction').on('shown.bs.modal', function () {
        $('#updateQuantityProductionFormInput1').focus();
    });

    //funzione che prepara la modifica di una produzione (quantità)
    $scope.beginUpdateProductionQuantity = function (production) {
        $scope.indexUpdate = $scope.productions.indexOf(production);
        $scope.productionDeltaQuantity = null;
        $('#updateQuantityProduction').modal('show');
    }

    //funzione che assegna al deltaProduction la quantità massima da aggiungere 
    $scope.fillDeltaProduction = function () {
        $scope.productionDeltaQuantity = $scope.productions[$scope.indexUpdate].product.maxDailyProduction - $scope.productions[$scope.indexUpdate].quantity;
    }

    //funzione che produce la modifica di una produzione (quantità)
    $scope.updateProductionQuantity = function () {
        $('#updateQuantityProduction').modal('hide');
        productions.updateQuantity(
            $scope.productions[$scope.indexUpdate]._id,
            $scope.indexUpdate,
            $scope.productionDeltaQuantity,
            function () {
                setTimeout(function () {
                    $('#modalSuccessMessage').modal('show');
                }, 500);
                produciFacile();
                $scope.message.title = 'Modifica';
                $scope.message.body = 'Produzione modificata';
                $scope.message.modalita = 'update';
            });
    }

    //funzione che prepara la modifica di una produzione (data)
    $scope.beginUpdateDateProduction = function (production) {
        $scope.indexUpdate = $scope.productions.indexOf(production);
        $scope.date = production.date;
        $('#updateDateProduction').modal('show');
    }

    //funzione che produce la modifica di una produzione (data)
    $scope.updateDateProduction = function(){
        $('#updateDateProduction').modal('hide');
        productions.updateDate(
            $scope.productions[$scope.indexUpdate]._id,
            $scope.indexUpdate,
            $scope.date,
            function () {
                setTimeout(function () {
                    $('#modalSuccessMessage').modal('show');
                }, 500);
                produciFacile();
                $scope.message.title = 'Modifica';
                $scope.message.body = 'Produzione modificata';
                $scope.message.modalita = 'update';
            });
    }

    //funzione che calcola le quantità dei prodotti disponibili in produzione
    // e la quantità di prodotto soddisfatta degli ordini
    var produciFacile = function () {
        var orders = [];
        //orders[0] = {};
        //orders[0].date = new Date();
        //orders[0].lastDay = new Date();
        //orders[0].client = {};
        //orders[0].client.dayNotice = 0;
        //orders[0].details = [];


        angular.copy($scope.orders, orders);

        var productions = [];
        //productions[0] = {};
        //productions[0].date = new Date();

        angular.copy($scope.productions, productions);

        angular.forEach(orders, function (order, key) {
            angular.forEach(order.details, function(detail,key){
                detail.satisfiedQuantity = 0;
                detail.dateSatisfaction = "";
            });
            
        });
        angular.forEach(productions, function (production, key) {
            production.leftQuantity = production.quantity;
        });

        //per ogni ordine order
        angular.forEach(orders, function (order, key) {
            //per ogni dettaglio ordine detail
            angular.forEach(order.details, function (detail, key) {
                    //per ogni produzione
                for (i = 0; i < productions.length ; ++i) {
                    //se la quantità soddisfatta != dalla quantità richiesta (altrimenti ho finito il controllo del dettaglio)
                    if (detail.satisfiedQuantity != detail.quantity) {
                        //se i prodotti coincidono
                        if (detail.product.name == productions[i].product.name)
                        {
                            //se la data di produzione è minore della data di scadenza (altrimenti interrompo il ciclo sulla produzione per questo ordine)
                            if ((new Date(productions[i].date) <= new Date(order.lastDay))){
                                //se inoltre la data di scadenza del dettaglio è minore di quella di permanenza del prodotto in magazzino 
                                if ((new Date(order.lastDay).getTime() <= new Date(productions[i].date).getTime() + detail.product.timeDeposit * 1000 * 3600 * 24)) {
                                    //se è rimasto ancora qualcosa di disponibile in produzione (altrimenti non faccio nulla)
                                    if (productions[i].leftQuantity != 0) {
                                        //se la quantità mancante dell'ordine è minore di quella disponibile in produzione 
                                        //me la prendo tutta e lascio quello che rimane
                                        if ((detail.quantity - detail.satisfiedQuantity) <= productions[i].leftQuantity) {
                                            productions[i].leftQuantity = productions[i].leftQuantity
                                                - detail.quantity
                                                + detail.satisfiedQuantity;
                                            detail.satisfiedQuantity = detail.quantity;
                                            detail.dateSatisfaction = new Date(productions[i].date);
                                            //altrimenti mi prendo quel che resta e azzero la produzione disponibile
                                        } else {
                                            detail.satisfiedQuantity += productions[i].leftQuantity;
                                            productions[i].leftQuantity = 0;
                                        }
                                    }
                                }
                            }
                            else {
                                break;
                            }
                        } 
                    } else {
                        break;
                    }
                }
            });
        });
        angular.copy(orders, $scope.orders);
        angular.copy(productions, $scope.productions);
    }

    //funzione che setta la classe nel dettaglio ordine
    $scope.setDetailClass = function (detail) {
        var status = "";
        if (detail.quantity == detail.satisfiedQuantity) {
            status = "success";
        }
        else if (detail.satisfiedQuantity == 0) {
            status = "danger";
        } else if (detail.quantity > detail.satisfiedQuantity) {
            status = "warning";
        }
        return status;
    }

    //funzione che setta la classe della quantità in eccesso produzione
    $scope.setProductionClass = function (production) {
        var status = "";
        if (production.leftQuantity > 50) {
            status = "info";
        }
        return status;
    }

    //funzione che mostra la data minima del dettaglio
    $scope.minDateDetail = function (order, detail) {
        var minDate = new Date();
        minDate = new Date(order.lastDay).getTime() - detail.product.timeDeposit * 1000 * 3600 * 24;
        return minDate;
    }


    produciFacile();

}]);
