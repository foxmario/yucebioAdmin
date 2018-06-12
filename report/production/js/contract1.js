(function(angular) {
    var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'ngRoute', 'tool', 'ae-datetimepicker']);
    app.controller('safeCtrl', ['$scope', '$log', '$routeParams', '$rootScope', '$http', '$location', '$timeout', '$uibModal',
        function($scope, $log, $routeParams, $rootScope, $http, $location, $timeout, $uibModal) {
            $scope.items = null;

            $scope.rowCollection = [];

            //名词解释详情头部切换
            $('#myTab li').on('click', function() {
                $('#myTabContent').children().eq($(this).index()).addClass('active in').siblings().removeClass('active in');
            })
            // $rootScope.shortData = {
            //     data: [{
            //             "_id": {
            //                 "$oid": "5af937b77ac1e11edb2fa382"
            //             },
            //             "product": "MT0030",
            //             "patient": "1",
            //             "starttime": {
            //                 "$date": 1526284404727
            //             },
            //             "bestuptime": 5,
            //             "worstuptime": 12,
            //             "deadline": {
            //                 "$date": 1527494004727
            //             },
            //             "status": "暂停",
            //             "expstatus": "完成",
            //             "anastatus": "wait",
            //             "jiedu_status": "wait",
            //             "reportstatus": "wait",
            //             "info": "账号被封",
            //             "rawdata": "sad",
            //             "productname": "YuceOne Plus",
            //             "book": "test",
            //             "config": "test",
            //             "period": 14,
            //             "normaltype": "血液",
            //             "normalsize": "白细胞1.5G",
            //             "tumortype": "组织",
            //             "tumorsize": "癌组织13.5",
            //             "platform": "NGS",
            //             "chip": "YuceOne Plus",
            //             "strategy": "PE150",
            //             "moletag": "否"
            //         },
            //         {
            //             "_id": {
            //                 "$oid": "5af937b77ac1e11edb2fa383"
            //             },
            //             "product": "MT0031",
            //             "patient": "1",
            //             "starttime": {
            //                 "$date": 1526283954193
            //             },
            //             "bestuptime": 0,
            //             "worstuptime": 0,
            //             "deadline": {
            //                 "$date": 1526975154193
            //             },
            //             "status": "开始",
            //             "expstatus": "开始",
            //             "anastatus": "wait",
            //             "jiedu_status": "wait",
            //             "reportstatus": "wait",
            //             "productname": "YuceOne 56",
            //             "book": "/home/yangjie/test.json",
            //             "config": "test",
            //             "period": 8
            //         },
            //         {
            //             "_id": {
            //                 "$oid": "5af939587ac1e11f4327398c"
            //             },
            //             "product": "MT0030",
            //             "patient": "1",
            //             "starttime": {
            //                 "$date": 1526282653242
            //             },
            //             "bestuptime": 5,
            //             "worstuptime": 12,
            //             "deadline": {
            //                 "$date": 1527492253242
            //             },
            //             "status": "开始",
            //             "expstatus": "开始",
            //             "anastatus": "wait",
            //             "jiedu_status": "wait",
            //             "reportstatus": "wait",
            //             "productname": "YuceOne Plus",
            //             "book": "test",
            //             "config": "test",
            //             "period": 14,
            //             "normaltype": "血液",
            //             "normalsize": "白细胞1.5G",
            //             "tumortype": "组织",
            //             "tumorsize": "癌组织13.5",
            //             "platform": "NGS",
            //             "chip": "YuceOne Plus",
            //             "strategy": "PE150",
            //             "moletag": "否"
            //         },
            //         {
            //             "_id": {
            //                 "$oid": "5af939587ac1e11f4327398d"
            //             },
            //             "product": "MT0031",
            //             "patient": "1",
            //             "starttime": {
            //                 "$date": 1526282584120
            //             },
            //             "bestuptime": 0,
            //             "worstuptime": 0,
            //             "deadline": {
            //                 "$date": 1526282584120
            //             },
            //             "status": "开始",
            //             "expstatus": "开始",
            //             "anastatus": "wait",
            //             "jiedu_status": "wait",
            //             "reportstatus": "wait",
            //             "productname": "YuceOne 56",
            //             "book": "/home/yangjie/test.json",
            //             "config": "test",
            //             "period": 8
            //         },
            //         {
            //             "_id": {
            //                 "$oid": "5af9396f7ac1e11f4a3e5212"
            //             },
            //             "product": "MT0031",
            //             "patient": "1",
            //             "starttime": {
            //                 "$date": 1526282607480
            //             },
            //             "bestuptime": 0,
            //             "worstuptime": 0,
            //             "deadline": {
            //                 "$date": 1526282607480
            //             },
            //             "status": "开始",
            //             "expstatus": "开始",
            //             "anastatus": "wait",
            //             "jiedu_status": "wait",
            //             "reportstatus": "wait",
            //             "productname": "YuceOne 56",
            //             "book": "/home/yangjie/test.json",
            //             "config": "test",
            //             "period": 8
            //         },
            //         {
            //             "_id": {
            //                 "$oid": "5af9396f7ac1e11f4a3e5213"
            //             },
            //             "product": "MT1010",
            //             "patient": "1",
            //             "starttime": {
            //                 "$date": 1526282680930
            //             },
            //             "bestuptime": 5,
            //             "worstuptime": 12,
            //             "deadline": {
            //                 "$date": 1527492280930
            //             },
            //             "status": "开始",
            //             "expstatus": "开始",
            //             "anastatus": "wait",
            //             "jiedu_status": "wait",
            //             "reportstatus": "wait",
            //             "info": "无",
            //             "productname": "朗福递",
            //             "book": "test",
            //             "config": "test",
            //             "period": 14,
            //             "normaltype": "血液",
            //             "normalsize": "白细胞0.2G",
            //             "tumortype": "组织",
            //             "tumorsize": "癌组织1G",
            //             "platform": "NGS",
            //             "chip": "YuceOne Target",
            //             "strategy": "PE150",
            //             "moletag": "无"
            //         },
            //         {
            //             "_id": {
            //                 "$oid": "5af93ed27ac1e11fd8c59abd"
            //             },
            //             "product": "MT0030",
            //             "patient": "2",
            //             "starttime": {
            //                 "$date": 1526283986065
            //             },
            //             "bestuptime": 5,
            //             "worstuptime": 12,
            //             "deadline": {
            //                 "$date": 1527320786065
            //             },
            //             "status": "开始",
            //             "expstatus": "开始",
            //             "anastatus": "wait",
            //             "jiedu_status": "wait",
            //             "reportstatus": "wait",
            //             "productname": "YuceOne Plus",
            //             "book": "test",
            //             "config": "test",
            //             "period": 14,
            //             "normaltype": "血液",
            //             "normalsize": "白细胞1.5G",
            //             "tumortype": "组织",
            //             "tumorsize": "癌组织13.5",
            //             "platform": "NGS",
            //             "chip": "YuceOne Plus",
            //             "strategy": "PE150",
            //             "moletag": "否"
            //         },
            //         {
            //             "_id": {
            //                 "$oid": "5af93ed27ac1e11fd8c59abe"
            //             },
            //             "product": "MT0031",
            //             "patient": "2",
            //             "starttime": {
            //                 "$date": 1526283986065
            //             },
            //             "bestuptime": 0,
            //             "worstuptime": 0,
            //             "deadline": {
            //                 "$date": 1526283986065
            //             },
            //             "status": "开始",
            //             "expstatus": "开始",
            //             "anastatus": "wait",
            //             "jiedu_status": "wait",
            //             "reportstatus": "wait",
            //             "productname": "YuceOne 56",
            //             "book": "/home/yangjie/test.json",
            //             "config": "test",
            //             "period": 8
            //         }
            //     ]
            // };

            // $http({
            //       method:'get',
            //       url:'http://192.168.1.185:8000/lab/taskindex/index/'
            // }).then(function(respons){
            //       console.log(respons.data);
            // },function(){})


            //        $rootScope.shortData = {
            //            data:[
            // {"_id": "h90dUaGi",
            //  "tag": "检测", 
            //  "products": ["MT0031", "MT1010"], 
            //  "patients": [], 
            //  "tasks": [], 
            //  "duty": "", 
            //  "status": "已付费", 
            //  "start_time": {"$date": 1526282607480}, 
            //  "deadline": {"$date": 1527319407480}, 
            //  "delay": "否", 
            //  "duration": 11}, 
            //  {"_id": "ZY8BFAay", 
            //  "tag": "检测", 
            //  "products": ["MT0030", "MT0031"], 
            //  "patients": [], 
            //  "tasks": [], 
            //  "duty": "renqian", 
            //  "status": "已付费", 
            //  "start_time": {"$date": 1526283986065}, 
            //  "deadline": {"$date": 1527320786065}, 
            //  "delay": "否", "duration": 11}
            // ]

            //        };

            // $rootScope.shortData = {
            //  data:[{"_id": "MT0030", 
            // "productname": "YuceOne Plus", 
            // "book": "test", 
            // "config": "test", 
            // "period": 14, 
            // "normaltype": "血液", 
            // "normalsize": "白细胞1.5G", 
            // "tumortype": "组织", 
            // "tumorsize": "癌组织13.5", 
            // "platform": "NGS", 
            // "bestuptime": 5, 
            // "worstuptime": 12, 
            // "chip": "YuceOne Plus", 
            // "strategy": "PE150", 
            // "moletag": "否"}, 
            // {"_id": "MT0031", 
            // "productname": "YuceOne 56", 
            // "book": "/home/yangjie/test.json", 
            // "config": "test", 
            // "period": 8}, 
            // {"_id": "MT0050", 
            // "productname": "MSI", 
            // "book": "test", 
            // "config": "test", 
            // "period": 9, 
            // "normaltype": "血液", 
            // "normalsize": "", 
            // "tumortype": "组织", 
            // "tumorsize": "", 
            // "platform": "多重PCR", 
            // "bestuptime": 1, 
            // "worstuptime": 3, 
            // "chip": "", 
            // "strategy": "", 
            // "moletag": ""}]
            // }


            // $rootScope.shortData = {
            //     data: [{
            //             "_id": "1",
            //             "patientname": "test",
            //             "tumortype": "肺癌",
            //             "age": 2,
            //             "gender": "female",
            //             "infostatus": "未知",
            //             "samplestatus": "未知",
            //             "taskstatus": "有"
            //         },
            //         {
            //             "_id": "2",
            //             "patientname": "测试",
            //             "tumortype": "肺癌",
            //             "age": 3,
            //             "gender": "female",
            //             "infostatus": "未知",
            //             "samplestatus": "未知",
            //             "taskstatus": "有"
            //         }
            //     ]
            // }


            // 添加项目
            // $rootScope.shortData = {
            //     data: [{
            //         "projectid": "Miv5wFlBuR",
            //         "product_list": [{
            //             "_id": "MT1000",
            //             "productname": "YuceOne Plus",
            //             "period": 5,
            //             "normaltype": "血液",
            //             "normalsize": "0.25g",
            //             "tumortype": "癌组织",
            //             "platform": "illumulia",
            //             "bestuptime": 2,
            //             "worstuptime": 4,
            //             "chip": "target",
            //             "strategy": "151",
            //             "moletag": "否",
            //             "productid": "MT1000"
            //         }, {
            //             "_id": "MT1006",
            //             "productname": "YuceOne Plus",
            //             "period": 5,
            //             "normaltype": "血液",
            //             "normalsize": "0.25g",
            //             "tumortype": "癌组织",
            //             "platform": "illumulia",
            //             "bestuptime": 2,
            //             "worstuptime": 4,
            //             "chip": "target",
            //             "strategy": "151",
            //             "moletag": "否",
            //             "productid": "MT1006"
            //         }],
            //         "user_list": [{
            //             "_id": "renqian",
            //             "name": "任前",
            //             "email": "renqian@yucebio.com",
            //             "account": "renqian"
            //         }, {
            //             "_id": "lisi",
            //             "name": "李四",
            //             "email": "renqian@yucebio.com",
            //             "account": "renqian"
            //         }]
            //     }]

            // }






            var href = $location.url();
            var baseUrl = 'http://192.168.1.186:8000/';
            switch (href) {
                case '/task':
                    var url = baseUrl + 'projectmanager/task/index/'
                    break;
                case '/project':
                    var url = baseUrl + 'projectmanager/project/index/'
                    break;
                case '/product':
                    var url = baseUrl + 'projectmanager/product'
                    break;
                case '/patient':
                    var url = baseUrl + 'projectmanager/patient/index/'
                    break;
                case '/addTask':
                    var url = baseUrl + 'projectmanager/project/add/';
                    break;
            }

            console.log(url);
            $rootScope.getData = function() {
                $http({
                    method: 'get',
                    // url:'http://192.168.1.185:8000/projectmanager/patient/index/'
                    // url:'http://192.168.1.185:8000/projectmanager/product'
                    // url:'http://192.168.1.185:8000/projectmanager/task/index/'
                    // url:'http://192.168.1.185:8000/projectmanager/project/index/'
                    // url:'http://192.168.1.185:8000/projectmanager/project/add/'
                    url: url

                }).then(function(response) {
                    $timeout(function() {
                        $rootScope.shortData = response.data;
                    }, 100);

                    if (href == '/addTask') {
                        $scope.project = {};
                        $scope.project.projectid = response.data.data[0].projectid;
                    }
                }, function() {})
            }
            $rootScope.getData();
            //禁用编辑功能
            $rootScope.isdisabled = true;
            $rootScope.ismessage = false;

            //获取表格的值
            $rootScope.getDesc = function(item) {
                console.log(item)
                $scope.items = {};
                if (item) {
                    angular.forEach(item, function(value, key) {
                        $scope.items[key] = value;
                    })
                }
                // $scope.items = item;
                if (!$scope.items.isSelected) {
                    $scope.items = null;
                }
            }









            //实验暂停
            $scope.studyPause = function(size, items) {
                console.log('暂停')
                var modalInstance = $uibModal.open({
                    templateUrl: 'studyPauseModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
                        },
                        btnname: function() {
                            return $scope.name = 'studyPause';
                        },
                        urls: function() {
                            return $scope.urls;
                        },
                        datas: function() {
                            return items;
                        }

                    }
                });
            }

            //重置
            $scope.reset = function(size, item) {
                console.log('重置')
                $scope.info = '是否重置';
                var modalInstance = $uibModal.open({
                    templateUrl: 'resetModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
                        },
                        btnname: function() {
                            return $scope.name = 'reset';
                        },
                        urls: function() {
                            return $scope.urls;
                        },
                        datas: function() {
                            return item;
                        }

                    }
                });
            }
            //终止
            $scope.stop = function(size, item) {
                console.log('终止')
                $scope.info = '是否终止'
                var modalInstance = $uibModal.open({
                    templateUrl: 'resetModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
                        },
                        btnname: function() {
                            return $scope.name = 'stop';
                        },
                        urls: function() {
                            return $scope.urls;
                        },
                        datas: function() {
                            return item;
                        }

                    }
                });
            }
            //分析暂停
            $scope.anaPause = function(size, item) {
                console.log('分析暂停')
                $scope.info = '是否分析暂停'
                var modalInstance = $uibModal.open({
                    templateUrl: 'resetModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
                        },
                        btnname: function() {
                            return $scope.name = 'anaPause';
                        },
                        urls: function() {
                            return $scope.urls;
                        },
                        datas: function() {
                            return item;
                        }

                    }
                });
            }
            //解读暂停
            $scope.jieduPause = function(size, item) {
                console.log('解读暂停')
                $scope.info = '是否解读暂停'
                var modalInstance = $uibModal.open({
                    templateUrl: 'resetModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
                        },
                        btnname: function() {
                            return $scope.name = 'jieduPause';
                        },
                        urls: function() {
                            return $scope.urls;
                        },
                        datas: function() {
                            return item;
                        }

                    }
                });
            }
            //取消分析
            $scope.anaCancel = function(size, item) {
                console.log('取消分析')
                $scope.info = '是否取消分析'
                var modalInstance = $uibModal.open({
                    templateUrl: 'resetModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
                        },
                        btnname: function() {
                            return $scope.name = 'anaCancel';
                        },
                        urls: function() {
                            return $scope.urls;
                        },
                        datas: function() {
                            return item;
                        }

                    }
                });
            }
            //取消解读
            $scope.jieduCancel = function(size, item) {
                console.log('取消解读')
                $scope.info = '是否取消解读'
                var modalInstance = $uibModal.open({
                    templateUrl: 'resetModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
                        },
                        btnname: function() {
                            return $scope.name = 'jieduCancel';
                        },
                        urls: function() {
                            return $scope.urls;
                        },
                        datas: function() {
                            return item;
                        }

                    }
                });
            }
            //取消实验
            $scope.studyCancel = function(size, item) {
                console.log('取消实验')
                var modalInstance = $uibModal.open({
                    templateUrl: 'completeModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
                        },
                        btnname: function() {
                            return $scope.name = 'studyCancel';
                        },
                        urls: function() {
                            return $scope.urls;
                        },
                        datas: function() {
                            return item;
                        }

                    }
                });
            }


            //项目列表缴费
            $scope.fee = function(size, item) {
                console.log('缴费')
                console.log(item);
                var modalInstance = $uibModal.open({
                    templateUrl: 'feeModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
                        },
                        btnname: function() {
                            return $scope.name = 'fee';
                        },
                        urls: function() {
                            return $scope.urls;
                        },
                        datas: function() {
                            return item;
                        }

                    }
                });


            }
            //产品管理修改
            $scope.modify = function() {
                console.log('修改')
            }

            //添加项目
            $scope.addTask = function() {
                if ($scope.project) {
                    $scope.project.start_time = moment($scope.project.start_time).format("YYYY-MM-DD HH:mm:ss");
                    $scope.project.deadline = moment($scope.project.deadline).format("YYYY-MM-DD HH:mm:ss");
                    $scope.project.products = $scope.result;
                    $scope.project.duty = $scope.project.duty.account;
                    $http({
                        method: 'post',
                        url: url,
                        data: $scope.project
                    }).then(function(response) {
                        var data = response.data;
                        $scope.error = data.error;
                        $scope.success = data.success;
                        $scope.warning = data.warning;
                        $timeout(function() {
                            $scope.error = null;
                            $scope.success = null;
                            $scope.warning = null;
                        }, 10000)
                    }, function() {})
                }
            }


            //添加患者
            $scope.addPatient = function() {
                if (!$scope.patient) {
                    $scope.isdisabled = false;
                    $scope.message = '不能为空'
                    $timeout(function() {
                        $scope.isdisabled = true;
                    }, 3000)
                }
                console.log($scope.patient);
                if ($scope.patient) {
                    $http({
                        method: 'post',
                        url: 'http://192.168.1.185:8000/projectmanager/patient/add',
                        // url: 'http://192.168.1.185:8000/projectmanager/product/add',
                        data: $scope.patient
                    }).then(function(response) {
                        console.log(response.data);
                        $scope.warning = response.data.warning;
                        $scope.error = response.data.error;
                        $scope.success = response.data.success;
                        $timeout(function() {
                            $scope.warning = null;
                            $scope.error = null;
                            $scope.success = null;
                        }, 3000)
                    }, function() {
                        $scope.message = '请求失败'
                        $scope.isdisabled = false;
                        $timeout(function() {
                            $scope.isdisabled = true;
                        }, 3000)
                    })
                    // console.log($scope.patient)
                }

            }

            //添加患者id
            $scope.addPatientId = function(items){
                  $scope.data = {}
                  $scope.data.projectid = items._id;
                  $scope.data.patientId = $scope.patientId;
                  $http({
                        method:'post',
                        url:baseUrl+'projectmanager/project/addpatient',
                        data:$scope.data
                  }).then(function(){},function(){})
            }


            //任务管理下单
            $scope.orders = function(size, item) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'ordersModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
                        },
                        btnname: function() {
                            return $scope.name = 'orders';
                        },
                        urls: function() {
                            return $scope.urls;
                        },
                        datas: function() {
                            return item;
                        }

                    }
                });




            }


            //编辑
            $scope.edit = function(size) {
                $scope.infos = '是否启用编辑？';
                // console.log($scope.isdisabled = false);
                var modalInstance = $uibModal.open({
                    templateUrl: 'addModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
                        },
                        btnname: function() {
                            return $scope.name = 'edit';
                        },
                        urls: function() {
                            return $scope.urls;
                        },
                        datas: function() {
                            return;
                        }

                    }
                });
            }
            //添加
            $scope.add = function(size) {
                $scope.infos = '选中为修改，不选中为新增，是否修改/新增该信息';
                var modalInstance = $uibModal.open({
                    templateUrl: 'addModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
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
            $scope.result = [];
            //添加项目是否选中
            $scope.select = function(item, event) {
                var action = event.target;
                if (action.checked && !$scope.result._id) {
                    console.log(item);
                    $scope.result.push(item._id);
                    console.log($scope.result);
                } else {
                    var idx = $scope.result._id;
                    $scope.result.splice(idx, 1);
                    console.log($scope.result);

                }
            }


                 
                    // $rootScope.orders.error = '错误';
        }
    ]);





    //路由
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/:name', {
                templateUrl: function($routeParams) {
                    return 'contractRoute/' + $routeParams.name;
                },
                controller: 'safeCtrl'
            }).otherwise({ redirectTo: '/task' });
        // });

    }]);



    app.controller('ModalDemoCtrl', function($scope, $uibModal, $log) {
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
                        return $scope.info;
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







        $scope.check = function(size) {
            $scope.infos.name = '是否审核该信息';
            var modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                backdrop: "static",
                size: size,
                resolve: {
                    infos1: function() {
                        return $scope.info;
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





        // $scope.toggleAnimation = function() {
        //     $scope.animationsEnabled = !$scope.animationsEnabled;
        // };

    });

    //$uibModalInstance是模态窗口的实例  
    app.controller('ModalInstanceCtrl', function($scope, $location, $uibModalInstance, infos1, btnname, datas, urls, $rootScope, $http, $timeout) {
        $scope.info = infos1;
        $scope.rowCollection = datas;
        $scope.newCollection = [];

        var baseUrl = 'http://192.168.1.186:8000/projectmanager/';
        var href = $location.url();
        if (href == '/patient') {
            $http({
                method: 'get',
                url: baseUrl + 'patient/addtask/'
            }).then(function(response) {
                $scope.patientList = response.data;
            }, function() {})
        }



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

                    }, function errorCallback() {
                        console.log('请求失败');
                    })

                    for (var i = 0; i < $scope.shortData.data.length; i++) {
                        if ($scope.shortData.data[i]._id == $scope.rowCollection._id || ($scope.shortData.data[i].temIndex == $scope.rowCollection.temIndex && $scope.shortData.data[i].temIndex != null)) {
                            $scope.shortData.data.splice(i, 1);
                            $scope.getDesc(null);
                        }
                    }

                    console.log(urls.delUrl)


                    break;
                case 'add':
                    console.log('添加');
                    // console.log(urls.sUrl)
                    $rootScope.isdisabled = true;
                    if (!$scope.rowCollection) {
                        return;
                    }
                    $http({
                        method: 'post',
                        url: baseUrl + 'product/add',
                        data: $scope.rowCollection
                    }).then(function successCallback(response) {
                        console.log(response.data)
                    }, function errorCallback() {
                        console.log('请求失败');
                    })

                    if (!$scope.rowCollection._id && !$scope.rowCollection.temIndex) {
                        //添加
                        $scope.rowCollection.temIndex = $scope.shortData.data.length;
                        $scope.shortData.data.unshift($scope.rowCollection);
                        $scope.getDesc(null);

                    } else {
                        //修改
                        for (var i = 0; i < $scope.shortData.data.length; i++) {
                            if ($scope.shortData.data[i]._id == $scope.rowCollection._id || ($scope.shortData.data[i].temIndex == $scope.rowCollection.temIndex && $scope.shortData.data[i].temIndex != null)) {
                                $scope.shortData.data[i] = $scope.rowCollection;
                                $scope.getDesc($scope.shortData.data[i]);
                                break;
                            }
                        }
                    }

                    break;
                case 'edit':
                    $rootScope.isdisabled = false;
                    console.log('开启编辑');

                    break;
                case 'studyPause':
                    console.log('暂停');
                    $scope.data = {};
                    $scope.data.taskid = $scope.rowCollection.taskid;
                    $scope.data.info = $('#text').val();
                    console.log($scope.data);
                    $http({
                        method: 'post',
                        url: baseUrl + 'task/labpause/',
                        data: $scope.data
                    }).then(function(response) {
                        console.log(response.data);
                        $rootScope.getData();
                        $rootScope.warning = response.data.warning;
                        $rootScope.error = response.data.error;
                        $rootScope.success = response.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    }, function() {

                    })
                    break;
                case 'reset':
                    console.log('重置');
                    $scope.data = {};
                    $scope.task = {};
                    $scope.data.taskid = $scope.rowCollection.taskid;
                    $scope.data.info = '';
                    console.log($scope.data);
                    $http({
                        method: 'post',
                        url: baseUrl + 'task/reset/',
                        data: $scope.data
                    }).then(function(response) {
                        console.log(response.data);
                        $rootScope.getData();
                        $rootScope.warning = response.data.warning;
                        $rootScope.error = response.data.error;
                        $rootScope.success = response.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    }, function() {})
                    break;
                case 'stop':
                    console.log('终止');
                    $scope.data = {};
                    $scope.task = {};
                    $scope.data.taskid = $scope.rowCollection.taskid;
                    $scope.data.info = '';
                    $http({
                        method: 'post',
                        url: baseUrl + 'task/stop/',
                        data: $scope.data
                    }).then(function(response) {
                        console.log(response.data);
                        $rootScope.getData();
                        $rootScope.warning = response.data.warning;
                        $rootScope.error = response.data.error;
                        $rootScope.success = response.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    }, function() {
                        console.log('请求失败');
                    })
                    break;
                case 'anaPause':
                    console.log('分析暂停');
                    $scope.data = {};
                    $scope.task = {};
                    $scope.data.taskid = $scope.rowCollection.taskid;
                    $scope.data.info = '';
                    $http({
                        method: 'post',
                        url: baseUrl + 'task/anapause/',
                        data: $scope.data
                    }).then(function(response) {
                        console.log(response.data);
                        $rootScope.getData();
                        $rootScope.warning = response.data.warning;
                        $rootScope.error = response.data.error;
                        $rootScope.success = response.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    }, function() {
                        console.log('请求失败');
                    })
                    break;
                case 'jieduPause':
                    console.log('解读暂停');
                    $scope.data = {};
                    $scope.task = {};
                    $scope.data.taskid = $scope.rowCollection.taskid;
                    $scope.data.info = '';
                    $http({
                        method: 'post',
                        url: baseUrl + 'task/jiedupause/',
                        data: $scope.data
                    }).then(function(response) {
                        console.log(response.data);
                        $rootScope.getData();
                        $rootScope.warning = response.data.warning;
                        $rootScope.error = response.data.error;
                        $rootScope.success = response.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    }, function() {
                        console.log('请求失败');
                    })
                    break;
                case 'anaCancel':
                    console.log('分析取消');
                    $scope.data = {};
                    $scope.task = {};
                    $scope.data.taskid = $scope.rowCollection.taskid;
                    $scope.data.info = '';
                    $http({
                        method: 'post',
                        url: baseUrl + 'task/stop/',
                        data: $scope.data
                    }).then(function(response) {
                        console.log(response.data);
                        $rootScope.getData();
                        $rootScope.warning = response.data.warning;
                        $rootScope.error = response.data.error;
                        $rootScope.success = response.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    }, function() {
                        console.log('请求失败');
                    })
                    break;
                case 'jieduCancel':
                    console.log('解读取消');
                    $scope.data = {};
                    $scope.task = {};
                    $scope.data.taskid = $scope.rowCollection.taskid;
                    $scope.data.info = '';
                    $http({
                        method: 'post',
                        url: baseUrl + 'task/stop/',
                        data: $scope.data
                    }).then(function(response) {
                        console.log(response.data);
                        $rootScope.getData();
                        $rootScope.warning = response.data.warning;
                        $rootScope.error = response.data.error;
                        $rootScope.success = response.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    }, function() {
                        console.log('请求失败');
                    })
                    break;
                case 'studyCancel':
                    console.log('取消实验');
                    $scope.data = {};
                    $scope.task = {};
                    $scope.data.taskid = $scope.rowCollection.taskid;
                    $scope.data.info = $('#text').val();
                    console.log($scope.data);
                    $http({
                        method: 'post',
                        url: baseUrl + 'task/declarelab/',
                        data: $scope.data
                    }).then(function(response) {
                        console.log(response.data);
                        $rootScope.getData();
                        $rootScope.warning = response.data.warning;
                        $rootScope.error = response.data.error;
                        $rootScope.success = response.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    }, function() {})

                    break;
                case 'fee':
                    console.log($scope.rowCollection.projectid);
                    $http({
                        method: 'get',
                        url: baseUrl + 'project/pay/' + $scope.rowCollection.projectid,
                    }).then(function(response) {
                        $rootScope.getData();
                        console.log(response.data);
                        $rootScope.warning = response.data.warning;
                        $rootScope.error = response.data.error;
                        $rootScope.success = response.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    }, function() {})
                    break;
                case 'orders':
                    console.log('下单')

                    $scope.patient.patientid = $scope.rowCollection.patientid;
                    $scope.patient.account = $scope.patient.account.account;
                    $scope.patient.products = [$scope.patient.products._id];
                    console.log($scope.patient);
                    $http({
                        method: 'post',
                        url: baseUrl + 'patient/addtask/',
                        data: $scope.patient
                    }).then(function(response) {
                        console.log(response.data);
                        $rootScope.ordersInfo={};
                        $rootScope.ordersInfo.warning = response.data.warning;
                        $rootScope.ordersInfo.error = response.data.error;
                        $rootScope.ordersInfo.success = response.data.success;
                        $timeout(function() {
                            $rootScope.ordersInfo= null;
                        }, 3000)
                    }, function() {})
                    break;
                default:

                    $http({
                        method: 'post',
                        url: urls.checkUrl,
                        data: $scope.rowCollection
                    }).then(function successCallback(respons) {

                    }, function errorCallback() {
                        console.log('请求失败')
                    })

                    for (var i = 0; i < $scope.shortData.data.length; i++) {
                        if ($scope.shortData.data[i]._id == $scope.rowCollection._id || ($scope.shortData.data[i].temIndex == $scope.rowCollection.temIndex && $scope.shortData.data[i].temIndex != null)) {
                            for (var key in $scope.rowCollection.update) {
                                $scope.shortData.data[i][key] = $scope.rowCollection.update[key];
                            }

                            $scope.shortData.data[i].update = null;
                            $rootScope.getDesc($scope.shortData.data[i]);
                            break;
                        }
                    }
                    console.log('审核');
                    // console.log($scope.shortData.data);
            }
        };

        $scope.cancel = function() {
            $uibModalInstance.close();
        };
    });

    //任务管理任务状态
    app.filter('unique', function() {
        return function(arr, field) {
            var o = {},
                i, l = arr.length,
                r = [];
            for (i = 0; i < l; i += 1) {
                o[arr[i][field]] = arr[i];
            }
            for (i in o) {
                r.push(o[i]);
            }
            return r;
        };
    })









})(angular)