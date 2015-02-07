angular.module('productionService', [])
.factory('productions', ['$http', function ($http) {
    var o = {
        productions: []
    };

    o.getAll = function () {
        return $http.get('/productions').success(
            function (data) {
                angular.copy(data, o.productions);
            });
    };

    o.create = function (production, callback) {
        return $http.put('/production', production).success(function (data) {
            o.productions.push(data);
            callback();
        });
    };

    o.delete = function (id, callback) {
        return $http.delete('/production/' + id).success(function (data) {
            callback();
        });
    };

    o.update = function (id, production, index, callback) {
        return $http.post('/production/' + id, production).success(function (data) {
            o.productions[index] = angular.copy(data);
            callback();
        });
    };

    return o;
}])