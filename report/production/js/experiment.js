(function(angular) {
    var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'ngRoute', 'tool', 'ae-datetimepicker', 'ngFileUpload', 'angularjs-dropdown-multiselect','ngJsonExportExcel']);
    app.controller('safeCtrl', ['$scope', '$log', '$routeParams', '$rootScope', '$http', '$location', '$timeout', '$uibModal', 'Upload',
        function($scope, $log, $routeParams, $rootScope, $http, $location, $timeout, $uibModal, Upload) {

            //名词解释详情头部切换
            $('#myTab li').on('click', function() {
                $('#myTabContent').children().eq($(this).index()).addClass('active in').siblings().removeClass('active in');
            })


            var href = $location.url();
            var baseUrl = 'http://192.168.1.211:8000/';
            // var baseUrl = 'http://192.168.11.101:8000/';
            switch (href) {
                case '/expPatient':
                    var url = baseUrl +'PatientHandle/view/';
                    break;
                case '/expSample':
                    var url = baseUrl + 'SampleHandle/view/';
                    var upUrl = baseUrl + 'SampleHandle/upload/';
                    break;
                case '/expOrder':
                    var url = baseUrl + 'LabTaskHandle/order/';
                    var viewUrl = baseUrl +'LabTaskHandle/view/';
                    $http({
                        method:'get',
                        url:viewUrl
                    }).then(function(response){
                        $scope.viewData = response.data;
                    },function(){})
                    break;
                case '/expManage':
                    var url = baseUrl + 'ExperimentHandle/view/';
                    break;
                case '/expExtraction':
                    var url = baseUrl + 'ExtractHandle/view/';
                    var upUrl = baseUrl + 'ExtractHandle/upload/';
                    break;
                case '/expLibrary':
                    var url = baseUrl + 'LibraryHandle/view/';
                    var upUrl = baseUrl + 'LibraryHandle/upload/';
                    break;
                case '/expHybrid':
                    var url = baseUrl + 'HybridHandle/view/';
                    var upUrl = baseUrl + 'HybridHandle/upload/';
                    break;
                case '/expQuality':
                    var url = baseUrl + 'LabQCHandle/view/';
                    var upUrl = baseUrl + 'LabQCHandle/upload/';
                    break;
                case '/expSeq':
                    var url = baseUrl + 'SeqHandle/view/';
                    var upUrl = baseUrl + 'SeqHandle/upload/';
            }

            $rootScope.getData = function() {
                $http({
                    method: 'get',
                    url: url
                }).then(function(response) {
                        $rootScope.shortData = response.data;
                }, function() {})
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
                if (href == '/project') {
                    $scope.data = {};
                    $scope.data.projectid = item.projectid;
                    $http({
                        method: 'post',
                        url: baseUrl + 'ProjectHandle/complementhelp/',
                        data: $scope.data
                    }).then(function(response) {
                        $scope.ordersList = response.data;
                        $scope.ordersList.projectid = item.projectid;
                    }, function() {})

                }

                if (!$scope.items.isSelected) {
                    $scope.items = null;
                }
            }

            if (href == '/task') {

                $http({
                    method: 'get',
                    url: baseUrl + 'PMTaskHandle/allocate/'
                }).then(function(response) {
                    $scope.allotList = response.data;
                }, function() {})
            }
            $scope.ptModify = function(items) {
                delete items.samples;
                delete items.infostatus;
                delete items.isSelected;
                $http({
                    method: 'post',
                    url: baseUrl + 'PatientHandle/modify/',
                    data: items
                }).then(function(response) {
                    $rootScope.getData();
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

            //任务分配
            $scope.allotSubmit = function(items) {
                $scope.allot.taskid = items.taskid;
                $http({
                    method: 'post',
                    url: baseUrl + 'PMTaskHandle/allocate/',
                    data: $scope.allot
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
                }, function() {
                    console.log('请求失败')
                })
            }







            //添加项目
            $scope.expOrder = function() {
                if ($scope.result) {
                    $http({
                        method: 'post',
                        url: url,
                        data: $scope.result
                    }).then(function(response) {
                        var data = response.data;
                        $rootScope.getData();
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

            //添加样本
            $scope.addSample = function(sample) {
                if (sample) {
                    sample.recievetime = moment(sample.recievetime).format("YYYY-MM-DD HH:mm:ss");
                    $http({
                        method: 'post',
                        url: baseUrl + 'SampleHandle/init/',
                        // url: 'http://192.168.1.185:8000/projectmanager/product/add',
                        data: sample
                    }).then(function(response) {
                        $rootScope.getData();
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
                }

            }
            //追加下单
            $scope.addOrders = function() {
                $scope.data = {}
                $scope.data.projectid = $scope.ordersList.projectid;
                $scope.data.task_list = $scope.result;
                $http({
                    method: 'post',
                    url: baseUrl + 'ProjectHandle/complement/',
                    data: $scope.data
                }).then(function(response) {
                    $rootScope.getData();
                    $scope.warning = response.data.warning;
                    $scope.error = response.data.error;
                    $scope.success = response.data.success;
                    $timeout(function() {
                        $scope.warning = null;
                        $scope.error = null;
                        $scope.success = null;
                    }, 3000)
                }, function() {})
            }


            //产品选择
            $scope.stringSettings = {
                template: '{{option}}',
                smartButtonTextConverter(skip, option) {
                    return option;
                }
            };








            //添加
            $scope.add = function(size) {
                $scope.info = '是否添加该信息';
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
                if (action.checked && !$scope.result.productid) {
                    $scope.result.push(item.productid);
                    console.log($scope.result);
                } else {
                    var idx = $scope.result.productid;
                    $scope.result.splice(idx, 1);
                    console.log($scope.result);

                }
            }
            //批量勾选
            $scope.batchCheck = function(item, event) {
                var action = event.target;
                var newItem = {};
                if (action.checked) {
                    angular.forEach(item,function(value,key){
                        if(key!='isChecked'&&key!='samples'&&key!='patientname'){
                            newItem[key] = item[key];
                        }
                    })
                    $scope.result.push(newItem);
                    console.log($scope.result);
                } else {
                    var idx = $scope.result.productid;
                    $scope.result.splice(idx, 1);
                    console.log($scope.result);
                }
            }


            //订单管理修改
            $scope.odModify = function(items) {
                delete items.patient;
                delete items.patientname;
                delete items.patient;
                delete items.productname;
                delete items.product;
                delete items.age;
                delete items.gender;
                delete items.isSelected;
                $http({
                    method: 'post',
                    url: baseUrl + 'PMTaskHandle/modify/',
                    data: items
                }).then(function(response) {
                    $rootScope.getData();
                    $scope.warning = response.data.warning;
                    $scope.error = response.data.error;
                    $scope.success = response.data.success;
                    $timeout(function() {
                        $scope.warning = null;
                        $scope.error = null;
                        $scope.success = null;
                    }, 6000)
                }, function() {})
            }

            //文件上传

            $scope.uploadPic = function(file) {
                $scope.file = file;
                file.upload = Upload.upload({
                    url: upUrl,
                    data: { username: $scope.username, file: file }
                });

                file.upload.then(function(response) {
                    file.result = response.data;
                    $rootScope.getData();
                    $scope.warning = response.data.warning;
                    $scope.error = response.data.error;
                    $scope.success = response.data.success;
                    $timeout(function() {
                        $scope.warning = null;
                        $scope.error = null;
                        $scope.success = null;
                    }, 6000)

                }, function(response) {
                    $scope.errorMsg = response.status;
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
                    return 'experimentRoute/' + $routeParams.name;
                },
                controller: 'safeCtrl'
            }).otherwise({ redirectTo: '/expSample' });
        // });

    }]);



    app.controller('ModalDemoCtrl', function($scope, $uibModal, $log) {
        $scope.infos = {};








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
        var baseUrl = 'http://192.168.1.211:8000/';
        var href = $location.url();
        if (href == '/patient') {
            $http({
                method: 'get',
                url: baseUrl + 'PatientHandle/addproject/'
            }).then(function(response) {
                $scope.patientList = response.data;
                $scope.result = [];
                //添加项目是否选中
                $scope.select = function(item, event) {
                    var action = event.target;
                    if (action.checked && !$scope.result.productid) {
                        $scope.result.push(item.productid);
                        console.log($scope.result);
                    } else {
                        var idx = $scope.result.productid;
                        $scope.result.splice(idx, 1);
                        console.log($scope.result);

                    }
                }
            }, function() {})
        }



        $scope.ok = function() {
            $uibModalInstance.close();
            switch (btnname) {
                case 'add':
                    console.log('添加');
                    // $rootScope.isdisabled = true;
                    if (!$scope.rowCollection) {
                        return;
                    }
                    delete $scope.rowCollection.isSelected;
                    delete $scope.rowCollection._id;
                    $http({
                        method: 'post',
                        url: baseUrl + 'ProductHandle/add/',
                        data: $scope.rowCollection
                    }).then(function successCallback(response) {
                        $rootScope.getData();
                        $rootScope.warning = response.data.warning;
                        $rootScope.error = response.data.error;
                        $rootScope.success = response.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    }, function errorCallback() {
                        console.log('请求失败');
                    })

                    break;
                case 'studyPause':
                    console.log('暂停');
                    $scope.data = {};
                    $scope.data.taskid = $scope.rowCollection.taskid;
                    $scope.data.info = $('#text').val();
                    $scope.data.cmd = "实验暂停";
                    $http({
                        method: 'post',
                        url: baseUrl + 'PMTaskHandle/pause/',
                        data: $scope.data
                    }).then(function(response) {
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
                    $http({
                        method: 'post',
                        url: baseUrl + 'PMTaskHandle/reset/',
                        data: $scope.data
                    }).then(function(response) {
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
                        url: baseUrl + 'PMTaskHandle/stop/',
                        data: $scope.data
                    }).then(function(response) {
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
                    $scope.data.cmd = "分析暂停";
                    $http({
                        method: 'post',
                        url: baseUrl + 'PMTaskHandle/pause/',
                        data: $scope.data

                    }).then(function(response) {
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
                    $scope.data.cmd = "解读暂停";
                    $http({
                        method: 'post',
                        url: baseUrl + 'PMTaskHandle/pause/',
                        data: $scope.data
                    }).then(function(response) {
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
                    $scope.data.cmd = "取消解读";
                    $http({
                        method: 'post',
                        url: baseUrl + 'PMTaskHandle/cancel/',
                        data: $scope.data
                    }).then(function(response) {
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
                    $scope.data.cmd = "取消实验";
                    $http({
                        method: 'post',
                        url: baseUrl + 'PMTaskHandle/cancel/',
                        data: $scope.data
                    }).then(function(response) {
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
                case 'orders':
                    console.log('下单')

                    $scope.patient.patientid = $scope.rowCollection.patientid;
                    $scope.patient.account = $scope.patient.account;
                    $scope.patient.products = $scope.result;
                    $http({
                        method: 'post',
                        url: baseUrl + 'PatientHandle/addproject/',
                        data: $scope.patient
                    }).then(function(response) {

                        $rootScope.ordersInfo = {};
                        $rootScope.ordersInfo.warning = response.data.warning;
                        $rootScope.ordersInfo.error = response.data.error;
                        $rootScope.ordersInfo.success = response.data.success;
                        $timeout(function() {
                            $rootScope.ordersInfo = null;
                        }, 5000)
                    }, function() {})
                    break;
                case 'orderOperate':

                    $http({
                        method: 'post',
                        url: baseUrl + 'ProjectHandle/cmd/',
                        data: $scope.rowCollection
                    }).then(function(response) {
                        $rootScope.getData();
                        $rootScope.ordersInfo = {};
                        $rootScope.ordersInfo.warning = response.data.warning;
                        $rootScope.ordersInfo.error = response.data.error;
                        $rootScope.ordersInfo.success = response.data.success;
                        $timeout(function() {
                            $rootScope.ordersInfo.warning = null;
                            $rootScope.ordersInfo.error = null;
                            $rootScope.ordersInfo.success = null;
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