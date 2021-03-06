﻿angular.module('orderService', [])
.factory('orders', ['$http','$filter', function ($http,$filter) {
    var o = {
        orders: []
    }

    var orderBy = $filter('orderBy');
    var orderOrders = function (array) {
        return orderBy(array, ['lastDay', 'client.dayNotice', '-client.averageRevenue']);
    }


    o.getAll = function () {
        return $http.get('/orders').success(
            function (data) {
                angular.copy(orderOrders(data), o.orders);
            });
    }

    o.create = function (order, callback) {
        order.lastDay = order.date.getTime() -
               (order.client.deliveryTime * 1000 * 3600 * 24);
        return $http.put('/order', order).success(function (data) {
            o.orders.push(data);
            angular.copy(orderOrders(o.orders), o.orders);
            callback();
        });
    }

    o.delete = function (id, index, callback) {
        return $http.delete('/order/' + id).success(function (data) {
            o.orders.splice(index, 1);
            callback();
        });
    }

    o.update = function (id, order, index, callback) {
        return $http.post('/order/' + id, order).success(function (data) {
            o.orders[index] = angular.copy(data);
            angular.copy(orderOrders(o.orders), o.orders);
            callback();
        });
    }

    o.updateDate = function (id, order, date, index, callback) {
        order.date = date;
        order.lastDay = order.date.getTime() -
               (order.client.deliveryTime * 1000 * 3600 * 24);
        return $http.post('/order/' + id, order).success(function (data) {
            angular.copy(data, o.orders[index]);
            angular.copy(orderOrders(o.orders), o.orders);
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

    o.updateDetail = function (id, order, indexDetail, index, deltaQuantity, type ,callback) {
        var orderUpdate = angular.copy(order);
        if (type == 'plus') {
            orderUpdate.details[indexDetail].quantity += deltaQuantity;
        } else {
            orderUpdate.details[indexDetail].quantity -= deltaQuantity;
        }
        return $http.post('/order/' + id, orderUpdate).success(function (data) {
            angular.copy(data, o.orders[index]);
            callback();
        });
    }

    o.updateInsertDetail = function (id, order, detail, index, callback) {
        order.details.push(detail);
        return $http.post('/order/' + id, order).success(function (data) {
            angular.copy(data, o.orders[index]);
            callback();
        });
    }

    return o;
}])