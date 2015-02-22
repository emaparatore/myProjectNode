angular.module('moduleMainController', [])
.controller('MainController', [
'$scope','$location',
function ($scope, $location) {
    $scope.message = {};
}]);