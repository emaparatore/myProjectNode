angular.module('productsService', [])
.factory('products', ['$http',function ($http) {
    var o = {
        products: []
    };

    o.getAll = function () {
        return $http.get('/products').success(
            function (data) {
                angular.copy(data, o.products);
            });
    };

    o.create = function (product, callback) {
        return $http.put('/product', product).success(function (data) {
            o.products.push(data);
            callback();
        });
    };

    o.delete = function (id, callback) {
        return $http.delete('/product/' + id).success(function (data) {
            callback();
        });
    };

    o.update = function (id, product, callback) {
        return $http.post('/product/' + id, product).success(function (data) {
            callback();
        });
    };

    return o;
}])