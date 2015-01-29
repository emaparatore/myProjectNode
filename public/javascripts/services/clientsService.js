angular.module('clientsService', [])
.factory('clients', ['$http', function ($http) {
    var o = {
        clients: []
    };

    o.getAll = function () {
        return $http.get('/clients').success(
            function (data) {
                angular.copy(data, o.clients);
            });
    };

    o.create = function (client, callback) {
        return $http.put('/client', client).success(function (data) {
            o.clients.push(data);
            callback();
        });
    };

    o.delete = function (id, callback) {
        return $http.delete('/client/' + id).success(function (data) {
            callback();
        });
    };

    o.update = function (id, client, callback) {
        return $http.post('/client/' + id, client).success(function (data) {
            callback();
        });
    };

    return o;
}])