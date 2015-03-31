/**
 *PureJS
 */

angular.module("MyApp", ['ngResource'])
    .controller("Test", function($scope, $timeout) {
        $scope.checkMe = false;
        $scope.exampleTypes = ["Додавання","Віднімання","Множення", "Ділення"];
        $scope.humans = ["Сашка", "Толік", "Дімон", "Стас", "Артурчик"];
    })