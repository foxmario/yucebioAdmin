(function(angular) {
    var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'ngRoute','tool','ngFileUpload']);
    app.controller('safeCtrl', ['$scope', '$log', '$routeParams', '$rootScope', '$http', '$location', '$timeout', '$uibModal','Upload',
        function($scope, $log, $routeParams, $rootScope, $http, $location, $timeout, $uibModal,Upload) {

            //详情头部切换
            $('#myTab li').on('click', function() {
                $('#myTabContent').children().eq($(this).index()).addClass('active in').siblings().removeClass('active in');
            })
           
            var href = $location.url();
            var baseUrl = 'http://192.168.1.186:8000/';
            var url;
            switch (href){
                case '/patientManage':
                    url = 'PatientHandle/view/';
                break;
                case '/sample':
                    url = 'SampleHandle/view/'; 
                break;
                case '/allTask':
                    url = 'LabTaskHandle/view/';
                break;
            }
            $rootScope.getData = function(){
                $http({
                      method:'get',
                      // url:'http://192.168.1.186:8000/LabTaskHandle/view/'
                      url:baseUrl+url
                }).then(function(respons){
                      $rootScope.data = respons.data;
                },function(){})
            }

            $rootScope.getData();














            //获取表格的值
            $rootScope.getDesc = function(item) {
                $scope.items = {};
                console.log(item);
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





            //禁用编辑功能
            $rootScope.isdisabled = true;




            //暂停
            $scope.pause = function(size, item) {
                console.log('暂停')
                $scope.infos = '暂停的原因';
                var modalInstance = $uibModal.open({
                    templateUrl: 'pauseModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.infos;
                        },
                        btnname: function() {
                            return $scope.name = 'pause';
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

            //重置
            $scope.reset = function(size,items) {
                console.log('重置')
                $scope.infos = '重置的原因';
                var modalInstance = $uibModal.open({
                    templateUrl: 'pauseModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.infos;
                        },
                        btnname: function() {
                            return $scope.name = 'reset';
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


            //完成
            $scope.complete = function(size, items) {
                console.log('完成')
                $scope.infos = '完成的原因';
                var modalInstance = $uibModal.open({
                    templateUrl: 'pauseModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.infos;
                        },
                        btnname: function() {
                            return $scope.name = 'complete';
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

            //终止
            $scope.end = function(size,items) {
                console.log('终止')
                $scope.infos = '终止的原因';
                var modalInstance = $uibModal.open({
                    templateUrl: 'pauseModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.infos;
                        },
                        btnname: function() {
                            return $scope.name = 'end';
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


              //单个添加患者
            $scope.addPatient = function() {
                console.log($scope.patient);
                if ($scope.patient) {
                    $http({
                        method: 'post',
                        url: baseUrl+'PatientHandle/init/',
                        data: $scope.patient
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
                    })
                }

            }


                //文件上传

            $scope.uploadPic = function(file) {
                $scope.file = file;               
                file.upload = Upload.upload({
                    url: baseUrl+'PatientHandle/batchadd/',
                    data: { username: $scope.username, file: file },
                });

                file.upload.then(function(response) {
                    file.result = response.data;
                }, function(response) {
                        $scope.errorMsg = response.status + ': ' + response.data;
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
                    return 'sequenceRoute/' + $routeParams.name;
                },
                controller: 'safeCtrl'
            }).otherwise({ redirectTo: '/allTask' });
        // });

    }]);



    app.controller('ModalDemoCtrl', function($scope, $uibModal, $log) {
        $scope.infos = {
            name: ''
        };




















        $scope.modif = function(size, items) {
            $scope.infos.name = '是否修改该信息';
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
                        return $scope.name = 'modif';
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

        $scope.add = function(size,items) {
            $scope.infos.name = '是否提交';
            $scope.arr = [];
                if(!$scope.table1){
                    return;
                }
               if($scope.table1&&!$scope.table2&&!$scope.table3){
                    $scope.arr.push($scope.table1);
               }else if($scope.table1&&$scope.table2&&!$scope.table3){
                     $scope.arr.push($scope.table1,$scope.table2);
               }else if($scope.table1&&$scope.table2&&$scope.table3){
                     $scope.arr.push($scope.table1,$scope.table2,$scope.table3);
               }
               $scope.submitData = {};
               $scope.submitData.taskid = items.taskid;
               $scope.submitData.samples = $scope.arr;
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
                        
                        return $scope.submitData;
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


    });

    //$uibModalInstance是模态窗口的实例  
    app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, infos1, btnname, datas, urls, $rootScope, $http,$timeout) {
        $scope.infos = infos1;
        $scope.rowCollection = datas;
        $scope.newCollection = [];
        var baseUrl = 'http://192.168.1.186:8000/';
        $scope.ok = function() {
            $uibModalInstance.close();
            switch (btnname) {
                case 'add':
                    console.log('添加');
                    $http({
                        method: 'post',
                        url: baseUrl+'LabTaskHandle/loadsample/',
                        data: $scope.rowCollection
                    }).then(function successCallback(respons) {
                            console.log(respons.data);
                            $scope.$apply(function(){
                                $rootScope.getData();
                            })
                    }, function errorCallback() {
                        console.log('请求失败');
                    })


                    break;
                case 'modif':
                console.log('修改')
                console.log($scope.rowCollection);
                delete $scope.rowCollection.isSelected;
                $http({
                    method:'post',
                    url:baseUrl+'SampleHandle/modify/',
                    data:$scope.rowCollection
                }).then(function(respons){
                        $rootScope.getData();
                        $rootScope.warning = respons.data.warning;
                        $rootScope.error = respons.data.error;
                        $rootScope.success = respons.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                },function(){})
                break;
                case 'pause':
                    console.log('暂停');
                    $scope.postData = {};
                    $scope.postData.taskid = $scope.rowCollection.taskid;
                    $scope.postData.info = $scope.info;
                    $scope.postData.cmd = '暂停';
                    $http({
                        method:'post',
                        url:baseUrl+'LabTaskHandle/cmd/',
                        data:$scope.postData
                    }).then(function(respons){
                        console.log(respons.data);
                        $rootScope.getData();
                        $rootScope.warning = respons.data.warning;
                        $rootScope.error = respons.data.error;
                        $rootScope.success = respons.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    },function(){})
                    break;
                    case 'reset':
                        $scope.postData = {};
                        $scope.postData.taskid = $scope.rowCollection.taskid;
                        $scope.postData.info = $scope.info;
                        $scope.postData.cmd = '重置';
                    $http({
                        method:'post',
                        url:baseUrl+'LabTaskHandle/cmd/',
                        data:$scope.postData
                    }).then(function(respons){
                        $rootScope.getData();
                        $rootScope.warning = respons.data.warning;
                        $rootScope.error = respons.data.error;
                        $rootScope.success = respons.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    },function(){})
                    break;
                  case 'complete':
                        $scope.postData = {};
                        $scope.postData.taskid = $scope.rowCollection.taskid;
                        $scope.postData.info = $scope.info;
                        $scope.postData.cmd = '完成';
                    $http({
                        method:'post',
                        url:baseUrl+'LabTaskHandle/cmd/',
                        data:$scope.postData
                    }).then(function(respons){
                        $rootScope.getData();
                        $rootScope.warning = respons.data.warning;
                        $rootScope.error = respons.data.error;
                        $rootScope.success = respons.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    },function(){})

                  break;
                  case 'end':
                        $scope.postData = {};
                        $scope.postData.taskid = $scope.rowCollection.taskid;
                        $scope.postData.info = $scope.info;
                        $scope.postData.cmd = '终止';
                    $http({
                        method:'post',
                        url:baseUrl+'LabTaskHandle/cmd/',
                        data:$scope.postData
                    }).then(function(respons){
                        $rootScope.getData();
                        $rootScope.warning = respons.data.warning;
                        $rootScope.error = respons.data.error;
                        $rootScope.success = respons.data.success;
                        $timeout(function() {
                            $rootScope.warning = null;
                            $rootScope.error = null;
                            $rootScope.success = null;
                        }, 3000)
                    },function(){})

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