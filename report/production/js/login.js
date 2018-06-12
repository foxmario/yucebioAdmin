var app = angular.module('myApp', []);
app.controller('loginController', ['$scope', '$http',
    function($scope, $http) {
        $scope.user = {};
        var baseUrl = 'http://192.168.1.211:8000/';
        $scope.login = function() {
            $http({
                method: 'post',
                url: baseUrl+'my_login/',
                data: $scope.user,
                withCredentials: true
            }).then(function successCallback(response) {
                if (response.data.message == '验证通过') {
                    window.location.href = 'home';
                    sessionStorage.setItem('user', JSON.stringify(response.data));
                } else {
                    $scope.message = response.data.message;
                }
            }, function errorCallback(response) {
                console.log('请求失败')
            })
        }
    }
]);