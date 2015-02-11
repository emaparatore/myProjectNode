angular.module('orderService', [])
.factory('orders', ['$http', function ($http) {
    var o = {
        orders: []
    }

    o.getAll = function () {
        return $http.get('/orders').success(
            function (data) {
                angular.copy(data, o.orders);
            });
    }

    o.create = function (order, callback) {
        order.lastDay = order.date.getTime() -
               (order.client.deliveryTime * 1000 * 3600 * 24);
        return $http.put('/order', order).success(function (data) {
            o.orders.push(data);
            callback();
        });
    }

    o.delete = function (id, callback) {
        return $http.delete('/order/' + id).success(function (data) {
            callback();
        });
    }

    o.update = function (id, order, index, callback) {
        return $http.post('/order/' + id, order).success(function (data) {
            o.orders[index] = angular.copy(data);
            callback();
        });
    }

    o.updateDate = function (id, order, date, index, callback) {
        order.date = date;
        order.lastDay = order.date.getTime() -
               (order.client.deliveryTime * 1000 * 3600 * 24);
        return $http.post('/order/' + id, order).success(function (data) {
            o.orders[index] = angular.copy(data);
            callback();
        });
    }

    o.updateDeleteDetail = function (id, order, indexDetail, index, callback) {
        order.details.splice(indexDetail, 1);
        return $http.post('/order/' + id, order).success(function (data) {
            o.orders[index] = angular.copy(data);
            callback();
        });
    }

    o.updateDetail = function (id, order, indexDetail, index, deltaQuantity ,callback) {
        var orderUpdate = angular.copy(order);
        orderUpdate.details[indexDetail].quantity += deltaQuantity;
        return $http.post('/order/' + id, orderUpdate).success(function (data) {
            o.orders[index] = angular.copy(data);
            callback();
        });
    }

    o.updateInsertDetail = function (id, order, detail, index, callback) {
        order.details.push(detail);
        return $http.post('/order/' + id, order).success(function (data) {
            o.orders[index] = angular.copy(data);
            callback();
        });
    }

    return o;
}])