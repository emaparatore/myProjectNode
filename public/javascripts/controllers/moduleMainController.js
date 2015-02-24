angular.module('moduleMainController', [])
.controller('MainController', [
'$scope','$http',
function ($scope, $http) {
    $scope.message = {};

    $scope.beginLogout = function () {
        $scope.message.title = 'Logout';
        $scope.message.body = 'Vuoi uscire da Grill?'
        $('#modalLogoutMessage').modal('show');
    }

    $scope.logout = function () {
        window.location.replace('/signout')
    }
}]);