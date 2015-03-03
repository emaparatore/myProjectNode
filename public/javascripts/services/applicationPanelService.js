angular.module('applicationPanelService', [])
.factory('applicationPanels', ['$http', function ($http) {
    var o = {
        applicationPanels: []
    };

    o.getAll = function () {
        return $http.get('/applicationPanel').success(
            function (data) {
                angular.copy(data, o.applicationPanels);
            });
    };


    o.update = function (id, applicationPanel, callback) {
        return $http.post('/applicationPanel/' + id, applicationPanel).success(function (data) {
            o.applicationPanels[0] = data;
            callback();
        });
    };

    return o;
}])