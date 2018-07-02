(function(angular) {
    var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'ngRoute', 'ngFileUpload', 'tool']);
    app.controller('safeCtrl', ['$scope', '$log', '$routeParams', '$rootScope', '$http', '$location', 'Upload', '$timeout', '$uibModal',
        function($scope, $log, $routeParams, $rootScope, $http, $location, Upload, $timeout, $uibModal) {
            //名词解释详情头部切换
            // $('#myTab li').on('click', function() {
            //     $('#myTabContent').children().eq($(this).index()).addClass('active in').siblings().removeClass('active in');
            // })
            var USER = sessionStorage.getItem('user');
            if (USER) {
                $scope.control = JSON.parse(USER).user_level;
                $scope.user = JSON.parse(USER).user;
            }





            //获取url
            var href = $location.url();

            // if (href) {
            //     $rootScope.getData = function() {
            //         $http({
            //             method: 'get',
            //             url: '',
            //             withCredentials: true
            //         }).then(function successCallback(respons) {
            //             $rootScope.shortData = respons.data;
            //         }, function errorCallback(respons) {
            //             // document.write(respons.data);
            //             console.log('请求失败');
            //         })
            //     }

            // }

            // $rootScope.getData();

            $rootScope.shortData = [{
                number: '001',
                reportType: '',
                upDate: '2018-07-02 09:14:00',
                status: '已上传'
            }, {
                number: '002',
                reportType: '',
                upDate: '2018-07-02 09:14:00',
                status: '已生成报告'
            }, {
                number: '003',
                reportType: '',
                upDate: '2018-07-02 09:14:00',
                status: '报告生成中'
            }, {
                number: '004',
                reportType: '',
                upDate: '2018-07-02 09:14:00',
                status: '已生成报告'
            }]


            //获取表格的值
            $rootScope.getDesc = function(item) {
                $scope.items = {};
                if (item) {
                    angular.forEach(item, function(value, key) {
                        $scope.items[key] = value;
                    })
                }
                $scope.index = 2;
            }
            
            function loading ($scope){
                $scope.index = 1;
                   $scope.load = function(number){
                    $scope.index = number;
                }
            }
            loading($scope);
            //生成报告
            $scope.creatReport = function(size, item) {
                $scope.items =item;
                $scope.index = 1;
                var modalInstance = $uibModal.open({
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.infos;
                        },
                        btnname: function() {
                            return $scope.name = 'creatReport';
                        },
                        datas: function() {
                            return item;
                        },
                        urls: function() {
                            return $scope.urls;
                        }

                    }
                });
            }



            $scope.uploadPic = function(file) {
                $scope.file = file;
                console.log($scope.file);
                var data = { username: $scope.username, file: file, type: $scope.type };
                console.log(data);
                file.upload = Upload.upload({
                    url: '',
                    data: data,
                });

                file.upload.then(function(response) {
                    file.result = response.data;
                    console.log(response.data);
                }, function(response) {
                    // $scope.errorMsg = response.status + ': ' + response.data;
                    $scope.errorMsg = response.status;
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });

            }
            //解读管理详细信息上传
            $scope.upNewPic = function(file){
                $scope.file = file;
                var data = { username: $scope.username, file: file, type: $scope.type };
                console.log(data);
                file.upload = Upload.upload({
                    url: '',
                    data: data,
                });

                file.upload.then(function(response) {
                    file.result = response.data;
                    console.log(response.data);
                }, function(response) {
                    // $scope.errorMsg = response.status;
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }












        }
    ]);





    //路由
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/:name', {
                templateUrl: function($routeParams) {
                    return 'analysisRoute/' + $routeParams.name;
                },
                controller: 'safeCtrl'
            }).otherwise({ redirectTo: '/analysisList' });
        // });

    }]);



    app.controller('ModalDemoCtrl', function($scope, $uibModal, $log, $timeout) {


        $scope.toggleAnimation = function() {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    });

    //$uibModalInstance是模态窗口的实例  
    app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, infos1, btnname, datas, urls, $rootScope, $http, $timeout) {
        $scope.infos = infos1;
        $scope.rowCollection = datas;
        $scope.newCollection = [];

        $scope.ok = function() {
            $uibModalInstance.close();
            switch (btnname) {
                case 'creatReport':
                    $http({
                        method: 'post',
                        url: '',
                        data: ''
                    }).then(function() {
                        console.log('请求成功')
                    }, function() {
                        console.log('请求失败')
                    })
                    break;
            }
        };

        $scope.cancel = function() {
            $uibModalInstance.close();
        };
    });



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





})(angular)