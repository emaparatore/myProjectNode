angular.module('productsService', [])
.factory('products', [function () {
    var o = {
        products: []
    };

    return o;
}])