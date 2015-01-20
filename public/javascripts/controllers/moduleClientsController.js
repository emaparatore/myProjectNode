angular.module('moduleClientsController', [])
.controller('ClientsController', [
'$scope',
'clients',
function ($scope, clients) {
    $scope.clients = clients.clients;

    $scope.indexDelete = 0;
    this.indexDelete = "";
    this.lastAction = '';
    
    //inizializazione dei campi del form
    $scope.companyName = '';
    $scope.address = '';
    $scope.mail = '';
    $scope.telephone='';
    $scope.dayNotice='';
    $scope.paymentMethod='';
    $scope.deliveryMethod='';
    $scope.averageRevenue='';
    $scope.deliveryTime='';

    //Funzione per settare il focus in modalità di creazione
    $('#insertClient').on('shown.bs.modal', function () {
        $('#clientInput1').focus();

    });

    //Funzione per settare il focus in modalità di modifica
    $('#updateClient')
      .on('shown.bs.modal', function () {
          $('#updateClientInput1').focus()
      })

    //funzione per settare il focus alla richiesta di cancellazione
    //$("#deleteClient").on('shown.bs.modal', function () {
    //    $("#noDeleteButton").focus();
    //});

    //Funzione per settare il focus al momento dell'inserimento e della modifica
    $scope.focusInsertClient = function () {
        $('#clientInput1').focus();
    }

    //Funzione per azzerare il contenuto del modal in inserimento
    $scope.beginInsertClient = function () {
        if (lastAction == 'modifica') {
            $scope.companyName = '';
            $scope.address = '';
            $scope.mail = '';
            $scope.telephone='';
            $scope.dayNotice='';
            $scope.paymentMethod='';
            $scope.deliveryMethod='';
            $scope.averageRevenue='';
            $scope.deliveryTime='';
        }
        lastAction = 'inserimento';
    };


    //funzione che produce l'inserimento
    $scope.addClient = function () {
        $scope.clients.push({
            companyName : $scope.companyName,
            address : $scope.address,
            mail : $scope.mail,
            telephone : $scope.telephone,
            dayNotice : $scope.dayNotice,
            paymentMethod : $scope.paymentMethod,
            deliveryMethod : $scope.deliveryMethod,
            averageRevenue : $scope.averageRevenue,
            deliveryTime : $scope.deliveryTime,
        });
        $scope.companyName = '';
        $scope.address = '';
        $scope.mail = '';
        $scope.telephone='';
        $scope.dayNotice='';
        $scope.paymentMethod='';
        $scope.deliveryMethod='';
        $scope.averageRevenue='';
        $scope.deliveryTime='';
        $('#successInsert').show('slide', 'slow');
    };

    //funzione che prepara la cancellazione 
    $scope.startDeleteClient = function (client) {
        $scope.indexDelete = $scope.clients.indexOf(client);
        $("#deleteClient").modal('show');
    };

    //funzione che produce la cancellazione
    $scope.deleteClient = function () {
        $scope.clients.splice($scope.indexDelete, 1);
    }

    //funzione che prepara il form per la modifica
    $scope.startUpdateClient = function (client) {

        $scope.companyName = client.companyName;
        $scope.address = client.address;
        $scope.mail = client.mail;
        $scope.telephone = client.telephone;
        $scope.dayNotice = client.dayNotice;
        $scope.paymentMethod = client.paymentMethod;
        $scope.deliveryMethod = client.deliveryMethod;
        $scope.averageRevenue = client.averageRevenue;
        $scope.deliveryTime = client.deliveryTime;

        indexUpdate = $scope.clients.indexOf(client);
        lastAction = 'modifica';
    };

    //funzione che produce la modifica
    $scope.updateClient = function () {

        $scope.clients[indexUpdate].companyName = $scope.companyName;
        $scope.clients[indexUpdate].address = $scope.address;
        $scope.clients[indexUpdate].mail = $scope.mail;
        $scope.clients[indexUpdate].telephone = $scope.telephone;
        $scope.clients[indexUpdate].dayNotice = $scope.dayNotice;
        $scope.clients[indexUpdate].paymentMethod = $scope.paymentMethod;
        $scope.clients[indexUpdate].deliveryMethod = $scope.deliveryMethod;
        $scope.clients[indexUpdate].averageRevenue = $scope.averageRevenue;
        $scope.clients[indexUpdate].deliveryTime = $scope.deliveryTime;

        $('#updateClientInput1').focus();
    };

    //$('#successInsert').hide();

}]);