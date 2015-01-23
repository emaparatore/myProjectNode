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

    o.create = function (product) {
        return $http.post('/product', product).success(function (data) {
            o.products.push(data);
        });
    };

    return o;
}])