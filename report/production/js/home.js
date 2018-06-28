(function(angular) {
    var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'ngRoute', 'tool']);
    app.controller('safeCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {












































    }])

    app.factory("httpInterceptor", ["$q", "$rootScope", function($q, $rootScope) {
        return {
            request: function(config) {
                // 请求成功
                var USER = sessionStorage.getItem('user');
                if (!USER) {
                    window.location.href = 'login';
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