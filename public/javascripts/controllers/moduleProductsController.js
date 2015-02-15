angular.module('moduleProductsController',[])
.controller('ProductsController', [
'$scope',
'products',
function ($scope, products) {
    $scope.products = products.products;
    $scope.indexDelete = 0;
    this.indexDelete = "";
    this.lastAction = '';
    $scope.message = {};

    //inizializazione dei campi del form
    $scope.productName = '';
    $scope.timeDeposit = '';
    $scope.maxDailyProduction = '';

    //Funzione per settare il focus in modalità di creazione
    $('#insertProduct').on('shown.bs.modal', function () {
        $('#productInput1').focus();

    });

    //Funzione per settare il focus in modalità di modifica
    $('#updateProduct')
      .on('shown.bs.modal', function () {
          $('#updateProductInput1').focus()
      })

    //funzione per settare il focul alla richiesta di cancellazione
    //$("#deleteProduct").on('shown.bs.modal', function () {
    //    $("#noDeleteButton").focus();
    //});

    //Funzione per settare il focus al momento dell'inserimento e della modifica
    //$scope.focusInsertProduct = function () {
    //    $('#productInput1').focus();
    //}

    //Funzione per azzerare il contenuto del modal in inserimento
    $scope.beginInsertProduct = function () {
        if (lastAction == 'modifica') {
            $scope.productName = '';
            $scope.timeDeposit = '';
            $scope.maxDailyProduction = '';
            $scope.colliSuRulli = '';
        }
        lastAction = 'inserimento';
    };

   
    //funzione che produce l'inserimento
    $scope.addProduct = function () {
        $('#insertProduct').modal('hide');
        products.create({
            name: $scope.productName,
            timeDeposit: $scope.timeDeposit,
            maxDailyProduction: $scope.maxDailyProduction,
            colliSuRulli : $scope.colliSuRulli
        }, function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            $scope.message.title = 'Inserimento';
            $scope.message.body = 'Prodotto inserito';
            $scope.message.modalita = 'insert';
            $scope.productName = '';
            $scope.timeDeposit = '';
            $scope.maxDailyProduction = '';
            $scope.colliSuRulli = '';
            
        });
    };

    //funzione che prepara la cancellazione 
    $scope.startDeleteProduct = function (product) {
        $scope.indexDelete = $scope.products.indexOf(product);
        $("#deleteProduct").modal('show');
    };

    //funzione che produce la cancellazione
    $scope.deleteProduct = function () {
        products.delete($scope.products[$scope.indexDelete]._id, function () {
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            $scope.message.title = 'Cancellazione';
            $scope.message.body = 'Prodotto rimosso';
            $scope.message.modalita = 'delete';
            $scope.products.splice($scope.indexDelete, 1);        
        });
        
    }

    //funzione che prepara il form per la modifica
    $scope.startUpdateProduct = function (product) {

        $scope.productName = product.name;
        $scope.timeDeposit = product.timeDeposit;
        $scope.maxDailyProduction = product.maxDailyProduction;
        $scope.colliSuRulli = product.colliSuRulli;

        indexUpdate = $scope.products.indexOf(product);
        lastAction = 'modifica';
    };

    //funzione che produce la modifica
    $scope.updateProduct = function () {
        $('#updateProduct').modal('hide');
        var product = {};
        product.name = $scope.productName;
        product.timeDeposit = $scope.timeDeposit;
        product.maxDailyProduction = $scope.maxDailyProduction;
        product.colliSuRulli = $scope.colliSuRulli;

        products.update($scope.products[indexUpdate]._id, product, function () {
            setTimeout(function () {
                $('#updateConfirm').modal('show');
            }, 500);
            setTimeout(function () {
                $('#modalSuccessMessage').modal('show');
            }, 500);
            $scope.message.title = 'Modifica';
            $scope.message.body = 'Prodotto modificato';
            $scope.message.modalita = 'update';
            $scope.products[indexUpdate].name = $scope.productName;
            $scope.products[indexUpdate].timeDeposit = $scope.timeDeposit;
            $scope.products[indexUpdate].maxDailyProduction = $scope.maxDailyProduction;
            $scope.products[indexUpdate].colliSuRulli = $scope.colliSuRulli;
            //$('#updateProductInput1').focus();
        });

        
    };

    //$scope.a = 0;
    //$scope.b = 0;
    //$scope.c = 0;
    //$scope.d = 0;

    //$scope.calcola = function (prodotto, sottrazione) {
    //    var sommaPerDieci = 0;
    //    for (i = 1; i <= prodotto; ++i)
    //    {   
    //        sommaPerDieci = sommaPerDieci + ($scope.a + $scope.b - $scope.c);
    //    }
    //    sommaPerDieci = sommaPerDieci - (sottrazione * $scope.d) ;
    //    return sommaPerDieci;
    //};

    //$('#successInsert').hide();

}]);