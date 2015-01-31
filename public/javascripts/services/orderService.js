angular.module('orderService', [])
.factory('orders', ['$http', function ($http) {
    var o = {
        orders: []
    };

    o.getAll = function () {
        return $http.get('/orders').success(
            function (data) {
                angular.copy(data, o.orders);
            });
    };

    o.create = function (order, callback) {
        return $http.put('/order', order).success(function (data) {
            o.orders.push(data);
            callback();
        });
    };

    o.delete = function (id, callback) {
        return $http.delete('/order/' + id).success(function (data) {
            callback();
        });
    };

    o.update = function (id, order, callback) {
        return $http.post('/order/' + id, order).success(function (data) {
            callback();
        });
    };

    return o;
}])