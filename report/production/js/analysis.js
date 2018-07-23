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
            var baseUrl = 'http://192.168.1.211:8000/';
            // var baseUrl = 'http://192.168.1.138:8000/';
           


            switch (href) {
                case '/reportCheck':
                    // $rootScope.shortData = [{
                    //     number: 'MT005020180314M001',
                    //     testType: 'YuceOne Plus',
                    //     buildDate: '2018-07-02 09:14:00',
                    //     status: '待审核',
                    //     pdfLink: ''
                    // }, {
                    //     number: 'MT005020180314M002',
                    //     testType: 'YuceOne ICIs',
                    //     buildDate: '2018-07-02 09:14:00',
                    //     status: '已审核',
                    //     pdfLink: 'http://localhost:8080/测试/pdf/web/compressed.tracemonkey-pldi-09.pdf'
                    // }, {
                    //     number: 'MT005020180314M003',
                    //     testType: 'YuceOne ICIs',
                    //     buildDate: '2018-07-02 09:14:00',
                    //     status: '已发布'
                    // }, {
                    //     number: 'MT005020180314M004',
                    //     testType: 'YuceOne ICIs',
                    //     buildDate: '2018-07-02 09:14:00',
                    //     status: '待审核',
                    //     pdfLink: 'http://localhost:8080/测试/pdf/web/compressed.tracemonkey-pldi-09.pdf'
                    // }]
                    var show = baseUrl + 'report_states/';
                    break;
                case '/analysisAllot':
                    // $rootScope.shortData = [{
                    //     number: '001',
                    //     reportType: '',
                    //     upDate: '2018-07-02 09:14:00',
                    //     status: '已上传'
                    // }, {
                    //     number: '002',
                    //     reportType: '',
                    //     upDate: '2018-07-02 09:14:00',
                    //     status: '已生成报告',
                    //     pdfLink: 'http://localhost:8080/测试/pdf/web/compressed.tracemonkey-pldi-09.pdf'
                    // }, {
                    //     number: '003',
                    //     reportType: '',
                    //     upDate: '2018-07-02 09:14:00',
                    //     status: '报告生成中'
                    // }, {
                    //     number: '004',
                    //     reportType: '',
                    //     upDate: '2018-07-02 09:14:00',
                    //     status: '已生成报告'
                    // }]
                    var show = baseUrl + 'report_showW/';
                    break;
                case '/selfTest':
                    // $rootScope.shortData = [{
                    //     number: '18A00051AZ01',
                    //     testType: 'YuceOne Plus',
                    //     buildDate: '2018-07-02 09:14:00',
                    //     status: '分析中',
                    //     pdfLink: ''
                    // }, {
                    //     number: '18A00051AZ02',
                    //     testType: 'YuceOne ICIs',
                    //     buildDate: '2018-07-02 09:14:00',
                    //     status: '分析完毕',
                    //     pdfLink: 'http://localhost:8080/测试/pdf/web/compressed.tracemonkey-pldi-09.pdf'
                    // }, {
                    //     number: '18A00051AZ03',
                    //     testType: 'YuceOneTarget',
                    //     buildDate: '2018-07-02 09:14:00',
                    //     status: '报告生成中'
                    // }, {
                    //     number: '18A00051AZ04',
                    //     testType: 'YuceOneTarget',
                    //     buildDate: '2018-07-02 09:14:00',
                    //     status: '报告已生成',
                    //     pdfLink: 'http://localhost:8080/测试/pdf/web/compressed.tracemonkey-pldi-09.pdf'
                    // }]
                    var show = baseUrl + 'report_showZ/';
                    break;
            }


             if (href) {
                console.log(show);
                $rootScope.getData = function() {
                    $http({
                        method: 'get',
                        url: show,
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
                $scope.items = {};
                if (item) {
                    angular.forEach(item, function(value, key) {
                        $scope.items[key] = value;
                    })
                }
                $scope.index = 2;
            }

            function loading($scope) {
                $scope.index = 1;
                $scope.load = function(number) {
                    $scope.index = number;
                }
            }
            loading($scope);
            //生成报告
            $scope.creatReport = function(size, item) {
                // $scope.items =item;
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


            //解读管理列表文件上传
            $scope.uploadPic = function(file) {
                $scope.file = file;
                console.log($scope.file);
                var data = { username: $scope.username, file: file, type: $scope.type };
                console.log(data);
                file.upload = Upload.upload({
                    url: '',
                    data: data
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
            $scope.upNewPic = function(items) {
                console.log(items);
                if (items.newFile) {
                    $scope.file = items.newFile;
                    items.newFile.upload = Upload.upload({
                        url: '',
                        data: items
                    });

                    items.newFile.upload.then(function(response) {
                        items.newFile.result = response.data;
                        console.log(response.data);
                    }, function(response) {
                        // $scope.errorMsg = response.status;
                    }, function(evt) {
                        // Math.min is to fix IE which reports 200% sometimes
                        items.newFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                } else {
                    $http({
                        method: 'post',
                        url: '',
                        data: items
                    }).then(function(response) {
                        // console.log(response.data);
                    }, function() {
                        console.log('请求失败')
                    })
                }


            }

            //外包报告上传
            $scope.reportUp = function(file) {
                $scope.data ={};
                $scope.data.file = file;
                $scope.file = file;
                $scope.data.number = $scope.items.number;
                $scope.data.reportType = $scope.reportType;
                console.log($scope.data);
                $scope.file.upLoad = Upload.upload({
                    url: 'http://192.168.1.138:8000/report_buildW/',
                    data: $scope.data,
                    withCredentials: true
                })
                $scope.file.upLoad.then(function(response) {

                }, function(response) {
                    console.log('请求失败')
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 + evt.loaded / evt.total));
                })
            }


            //报告审核
            //查看详细信息
            $scope.getDetailed = function(item) {
                $scope.items = item;
                $scope.index = 2;
            }


            //在线预览
            $scope.live = function() {
                var pdfText = $scope.items.pdfLink;
                var pdfUrl = encodeURI("pdf/web/viewer.html?pdfText=" + pdfText)
                window.open(pdfUrl)
                console.log($scope.items);
            }

            //报告发布
            $scope.issueReprot = function(item) {
                $scope.index = 3;
                $scope.items = item;
            }
            //确认审核
            $scope.auditPass = function(size, item) {
                // $scope.items =item;
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
                            return $scope.name = 'auditPass';
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
            //确认发布
            $scope.affirmIssue = function(size, item) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'affirmModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.infos;
                        },
                        btnname: function() {
                            return $scope.name = 'affirmIssue';
                        },
                        datas: function() {
                            item.method = $scope.method;
                            if (item.method == '发送邮件') {
                                item.eAddress = $scope.eAddress;
                            }
                            return item;
                        },
                        urls: function() {
                            return $scope.urls;
                        }

                    }
                });
            }

            //自检解读生成报告
            $scope.testReport = function(item) {
                $scope.index = 3;
                $scope.items = item;
            }
            //详细信息
            $scope.tesDetail = function() {
                $scope.index = 2;
            }
        }
    ]);


    //自动报告解读


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
                    console.log($scope.rowCollection);
                    $http({
                        method: 'post',
                        url: '',
                        data: ''
                    }).then(function() {
                        console.log('请求成功')
                    }, function() {
                        console.log('请求失败');
                    })
                    break;
                case 'auditPass':
                    $http({
                        method: 'post',
                        url: '',
                        data: ''
                    }).then(function() {
                        console.log('请求成功')
                    }, function() {
                        console.log('请求失败');
                    });
                    break;
                case 'affirmIssue':
                    console.log($scope.rowCollection);
                    $http({
                        method: 'post',
                        url: '',
                        data: ''
                    }).then(function() {

                    }, function() {
                        console.log('请求失败');
                    });
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