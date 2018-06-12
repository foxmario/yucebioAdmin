(function(angular) {
    var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'ngRoute', 'ngFileUpload', 'tool']);
    app.controller('safeCtrl', ['$scope', '$log', '$routeParams', '$rootScope', '$http', '$location', 'Upload', '$timeout',
        function($scope, $log, $routeParams, $rootScope, $http, $location, Upload, $timeout) {
            //名词解释详情头部切换
            $('#myTab li').on('click', function() {
                $('#myTabContent').children().eq($(this).index()).addClass('active in').siblings().removeClass('active in');
            })
            var USER = sessionStorage.getItem('user');
            if (USER) {
                $scope.control = JSON.parse(USER).user_level;
                $scope.user = JSON.parse(USER).user;
            }
          




            //获取url
            var href = $location.url();

            if (href) {
                $rootScope.getData = function() {
                    $http({
                        method: 'get',
                        url: '',
                        withCredentials: true
                    }).then(function successCallback(respons) {
                        $rootScope.shortData = respons.data;
                    }, function errorCallback(respons) {
                        // document.write(respons.data);
                        console.log('请求失败');
                    })
                }

            }

            $rootScope.getData();

            //获取表格的值
            $rootScope.getDesc = function(item) {
                console.log(item)
                $scope.items = {};
                if (item) {
                    angular.forEach(item, function(value, key) {
                        $scope.items[key] = value;
                    })
                }
                $scope.isUser = $scope.items.last_operetion === $scope.user;
                if (!$scope.items.isSelected) {
                    $scope.items = null;
                }
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
        $scope.infos = {
            name: ''
        };
        $scope.delete = function(size, items) {
            $scope.infos.name = '是否删除该信息，删除该信息需要通过审核';
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
                        return $scope.name = 'delete';
                    },
                    datas: function() {
                        return items;
                    },
                    urls: function() {
                        return $scope.urls;
                    },
                    disable: function() {
                        return;
                    }
                }
            });





        }




        $scope.add = function(size) {
            $scope.infos.name = '是否添加该信息';
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
                        return $scope.name = 'add';
                    },
                    datas: function() {
                        return $scope.items;
                    },
                    urls: function() {
                        return $scope.urls;
                    },
                    disable: function() {
                        return $scope.isdisabled;
                    }

                }
            });
        }


        $scope.check = function(size) {
            $scope.infos.name = '是否审核该信息';
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
                        return $scope.name = 'check';
                    },
                    datas: function() {
                        return $scope.items;
                    },
                    urls: function() {
                        return $scope.urls;
                    },
                    disable: function() {
                        return $scope.isdisabled;
                    }
                }
            });
        }

        $scope.rejectCheck = function(size, itmes) {
            $scope.infos.name = '原因';
            var modalInstance = $uibModal.open({
                templateUrl: 'rejectCheckModal.html',
                controller: 'ModalInstanceCtrl',
                backdrop: "static",
                size: size,
                resolve: {
                    infos1: function() {
                        return $scope.infos;
                    },
                    btnname: function() {
                        return $scope.name = 'rejectCheck';
                    },
                    datas: function() {
                        return $scope.items;
                    },
                    urls: function() {
                        return $scope.urls;
                    },
                    disable: function() {
                        return $scope.isdisabled;
                    }
                }
            });
        }


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
                case 'delete':
                    console.log('删除');
                    console.log($scope.rowCollection);
                    $rootScope.isdisabled = true;
                    $http({
                        method: 'post',
                        url: urls.delUrl,
                        data: $scope.rowCollection
                    }).then(function successCallback() {

                        $timeout(function() {
                            $rootScope.getData();

                        }, 25)
                    }, function errorCallback() {
                        console.log('请求失败');
                    })



                    break;

                case 'add':
                    console.log('添加');
                    console.log(urls.sUrl)
                    $rootScope.isdisabled = true;
                    console.log($scope.rowCollection);
                    if (!$scope.rowCollection) {
                        alert('内容不能为空')
                        return;
                    }
                    $http({
                        method: 'post',
                        url: urls.sUrl,
                        data: $scope.rowCollection
                    }).then(function successCallback() {
                        $timeout(function() {
                            $rootScope.getData();

                        }, 25)
                    }, function errorCallback() {
                        console.log('请求失败');
                    })

                    break;
                case 'rejectCheck':
                    console.log();
                    $scope.data = {};
                    $scope.data.mid = $scope.rowCollection.mid;
                    $scope.data.remarks = $scope.remarks;
                    $http({
                        method: 'post',
                        url: urls.reUrl,
                        data: $scope.data
                    }).then(function(response) {
                        $timeout(function() {
                            $rootScope.getData();

                        }, 25)
                    }, function() {})
                    break;
                default:

                    $http({
                        method: 'post',
                        url: urls.checkUrl,
                        data: $scope.rowCollection
                    }).then(function successCallback(response) {
                        $timeout(function() {
                            $rootScope.getData();

                        }, 25)
                    }, function errorCallback() {
                        console.log('请求失败')
                    })

            }
        };

        $scope.cancel = function() {
            $uibModalInstance.close();
        };
    });









})(angular)