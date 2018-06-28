(function(angular) {
    var app = angular.module('myApp', ['ui.bootstrap', 'ngRoute', 'tool']);
    app.controller('resetController', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {
        $scope.submitted = false;
        var baseUrl = 'http://192.168.1.139:8000/'
        $scope.changePassword = function(user) {
            if ($scope.changeForm.$valid) {
                //正常提交表单

                user.uname = $('.name').eq(0).html()
                delete user.password_again;
                $http({
                    method: 'post',
                    url: baseUrl + 'modify_password/',
                    data: user
                }).then(function(response) {
                	$scope.message = response.data.message;
                }, function() {})

            } else {
                $scope.submitted = true;
                console.log('修改失败')
            }
        }






























    }])

    app.directive('pwCheck', function() {
        var FOCUS_CLASS = "ng-focused";
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function($scope, element, attrs, ctrl) {
                ctrl.$focused = false;
                var firstPassword = '#' + attrs.pwCheck;
                element.add(firstPassword).on('keyup', function() {
                    var v = element.val() === $(firstPassword).val();
                    $scope.$apply(function() {
                        ctrl.$setValidity('pwmatch', v);
                    })
                });
                element.bind('focus', function(evt) {
                    element.addClass(FOCUS_CLASS);
                    $scope.$apply(function() {
                        ctrl.$focused = true;
                    });
                }).bind('blur', function() {
                    element.removeClass(FOCUS_CLASS);
                    $scope.$apply(function() {
                        ctrl.$focused = false;
                    })
                })




            }
        }
    })

    app.factory("httpInterceptor", ["$q", "$rootScope", function($q, $rootScope) {
        return {
            request: function(config) {
                // 请求成功
                var USER = sessionStorage.getItem('user');
                if (!USER) {
                    window.location.href = 'login.html';
                }
                return config || $q.when(config);
            },
            　　requestError: function(rejection) {　　　　 // 请求失败
                　　　　
                return $q.reject(rejection)　　
            },
            response: function(response) {
                // do something on response success
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                // do something on response error
                return $q.reject(rejection);
            }
        };
    }]);

    app.config(["$httpProvider", function($httpProvider) {　　
        $httpProvider.interceptors.push("httpInterceptor");
    }]);

})(angular);