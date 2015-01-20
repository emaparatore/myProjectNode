angular.module('clientsService', [])
.factory('clients', [function () {
    var o = {
        clients: []
    };

    return o;
}])