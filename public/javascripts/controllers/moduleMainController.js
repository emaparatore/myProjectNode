angular.module('moduleMainController', [])
.controller('MainController', [
'$scope','$http','$location',
function ($scope, $http, $location) {
    $scope.message = {};

    $scope.beginLogout = function () {
        $scope.message.title = 'Logout';
        $scope.message.body = 'Voui uscire da Grill?'
        $('#modalLogoutMessage').modal('show');
    }

    $scope.logout = function () {
        return $http.get('/signout').success(
            function () {
                return;
            });
    }
}]);