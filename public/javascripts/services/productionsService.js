angular.module('productionService', [])
.factory('productions', ['$http','$filter', function ($http, $filter) {
    var o = {
        productions: []
    };

    var orderBy = $filter('orderBy');
    var orderProductions = function (array) {
        return orderBy(array, 'date');
    }

    o.getAll = function () {
        return $http.get('/productions').success(
            function (data) {
                angular.copy(orderProductions(data), o.productions);
            });
    };

    o.create = function (production, callback) {
        return $http.put('/production', production).success(function (data) {
            o.productions.push(data);
            angular.copy(orderProductions(o.productions), o.productions);
            callback();
        });
    };

    o.delete = function (id, index, callback) {
        return $http.delete('/production/' + id).success(function (data) {
            o.productions.splice(index, 1);
            callback();
        });
    };

    o.update = function (id, production, index, callback) {
        return $http.post('/production/' + id, production).success(function (data) {
            angular.copy(data, o.productions[index]);
            angular.copy(orderProductions(o.productions), o.productions);
            callback();
        });
    };

    o.updateQuantity = function (id, index, quantity, callback) { 
        var productionCopy = angular.copy(o.productions[index]);
        productionCopy.quantity += quantity;
        return $http.post('/production/' + id, productionCopy).success(function (data) {
            o.productions[index] = angular.copy(data);
            callback();
        });
    }

    o.updateDate = function (id, index, date, callback) {
        var productionCopy = angular.copy(o.productions[index]);
        productionCopy.date = new Date(date);
        return $http.post('/production/' + id, productionCopy).success(function (data) {
            o.productions[index] = angular.copy(data);
            callback();
        });
    }
    

    return o;
}])