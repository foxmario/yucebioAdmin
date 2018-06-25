(function(angular) {
    var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'ngRoute', 'tool', 'ae-datetimepicker', 'ngFileUpload', 'angularjs-dropdown-multiselect']);
    app.controller('safeCtrl', ['$scope', '$log', '$routeParams', '$rootScope', '$http', '$location', '$timeout', '$uibModal', 'Upload',
        function($scope, $log, $routeParams, $rootScope, $http, $location, $timeout, $uibModal, Upload) {
            $scope.items = null;

            $scope.rowCollection = [];

            //名词解释详情头部切换
            $('#myTab li').on('click', function() {
                $('#myTabContent').children().eq($(this).index()).addClass('active in').siblings().removeClass('active in');
            })


            var href = $location.url();
            var baseUrl = 'http://192.168.1.211:8000/';
            switch (href) {
                case '/task':
                    var url = baseUrl + 'PMTaskHandle/view/';
                    $http({
                        method: 'get',
                        url: baseUrl + 'PMTaskHandle/allocate/'
                    }).then(function(response) {
                        $scope.allotList = response.data;
                    }, function() {});
                    break;
                case '/project':
                    var url = baseUrl + 'ProjectHandle/view/';
                    break;
                case '/product':
                    var url = baseUrl + 'ProductHandle/view/';
                    var upUrl = baseUrl + 'ProductHandle/batchadd/';
                    break;
                case '/patient':
                    var url = baseUrl + 'PatientHandle/view/';
                    var upUrl = baseUrl + 'PatientHandle/batchadd/';
                    break;
                case '/addTask':
                    var url = baseUrl + 'ProjectHandle/init/';
                    break;
            }

            $rootScope.getData = function() {
                $http({
                    method: 'get',
                    url: url

                }).then(function(response) {
                    $timeout(function() {
                        $rootScope.shortData = response.data;
                    }, 100);

                }, function() {})
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
                if (href == '/project') {
                    $scope.data = {};
                    $scope.data.projectid = item.projectid;
                    if($scope.items.isSelected){
                        $http({
                            method: 'post',
                            url: baseUrl + 'ProjectHandle/complementhelp/',
                            data: $scope.data
                        }).then(function(response) {
                            console.log(response.data)
                            $scope.ordersList = response.data;
                            $scope.ordersList.projectid = item.projectid;
                        }, function() {})
                    }else{
                        $scope.ordersList =null;
                    }

                }
                if (!$scope.items.isSelected) {
                    $scope.items = null;
                }
            }


            $scope.ptModify = function(items) {
                delete items.samples;
                delete items.infostatus;
                delete items.isSelected;
                console.log(items);
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




            //实验暂停
            $scope.studyPause = function(size, item, $event) {
                console.log('暂停')
                $event.stopPropagation();
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
                            return item;
                        }

                    }
                });
            }

            //重置
            $scope.reset = function(size, item, $event) {
                console.log('重置')
                $event.stopPropagation();
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
            $scope.stop = function(size, item, $event) {
                console.log('终止')
                $event.stopPropagation();
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
            $scope.anaPause = function(size, item, $event) {
                console.log('分析暂停')
                $event.stopPropagation();
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
            $scope.jieduPause = function(size, item, $event) {
                console.log('解读暂停')
                $event.stopPropagation();
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
            //取消解读
            $scope.jieduCancel = function(size, item, $event) {
                console.log('取消解读')
                $event.stopPropagation();
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
            $scope.studyCancel = function(size, item, $event) {
                console.log('取消实验')
                $event.stopPropagation();
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


            //添加项目
            $scope.addTask = function() {
                if ($scope.project) {
                    $scope.project.start_time = moment($scope.project.start_time).format("YYYY-MM-DD HH:mm:ss");
                    $scope.project.deadline = moment($scope.project.deadline).format("YYYY-MM-DD HH:mm:ss");
                    $scope.project.duty = $scope.project.duty;
                    $scope.project.task_list = $scope.result;
                    console.log($scope.project)
                    $http({
                        method: 'post',
                        url: url,
                        data: $scope.project
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

            //产品管理新增
            $scope.newCreat = function() {
                $scope.items = null;
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
                        url: baseUrl + 'PatientHandle/init/',
                        data: $scope.patient
                    }).then(function(response) {
                        console.log(response.data);
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
                    // console.log($scope.patient)
                }

            }
            //追加下单
            $scope.addOrders = function() {
                $scope.data = {}
                $scope.data.projectid = $scope.ordersList.projectid;
                $scope.data.task_list = $scope.result;

                console.log($scope.data);
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

            //项目订单操作
            $scope.orderOperate = function(size, value, item) {
                $scope.info = '是否' + value;
                var data = {};
                data.projectid = item.projectid;
                data.cmd = value;
                var modalInstance = $uibModal.open({
                    templateUrl: 'orderOperateModal.html',
                    controller: 'ModalInstanceCtrl',
                    backdrop: "static",
                    size: size,
                    resolve: {
                        infos1: function() {
                            return $scope.info;
                        },
                        btnname: function() {
                            return $scope.name = 'orderOperate';
                        },
                        urls: function() {
                            return $scope.urls;
                        },
                        datas: function() {
                            return data;
                        }

                    }
                });
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
                    console.log(item);
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
                    angular.forEach(item, function(value, key) {
                        if (key != 'isChecked') {
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
                items.starttime = moment(items.starttime).format("YYYY-MM-DD HH:mm:ss");
                items.bestuptime = moment(items.bestuptime).format("YYYY-MM-DD HH:mm:ss");
                items.worstuptime = moment(items.worstuptime).format("YYYY-MM-DD HH:mm:ss");
                items.deadline = moment(items.deadline).format("YYYY-MM-DD HH:mm:ss");
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
                    return 'contractRoute/' + $routeParams.name;
                },
                controller: 'safeCtrl'
            }).otherwise({ redirectTo: '/task' });
        // });

    }]);



    app.controller('ModalDemoCtrl', function($scope, $uibModal, $log) {
        $scope.infos = {};




















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
        var baseUrl = 'http://192.168.1.211:8000/';
        var href = $location.url();
        if (href == '/patient') {
            $http({
                method: 'get',
                url: baseUrl + 'PatientHandle/addproject/'
            }).then(function(response) {
                $scope.patientList = response.data;
                $scope.result = [];
                console.log(response.data);
                //添加项目是否选中
                $scope.select = function(item, event) {
                    var action = event.target;
                    if (action.checked && !$scope.result.productid) {
                        console.log(item);
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
                        console.log(response.data)
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
                    console.log($scope.data);
                    $http({
                        method: 'post',
                        url: baseUrl + 'PMTaskHandle/pause/',
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
                        url: baseUrl + 'PMTaskHandle/reset/',
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
                        url: baseUrl + 'PMTaskHandle/stop/',
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
                    $scope.data.cmd = "分析暂停";
                    $http({
                        method: 'post',
                        url: baseUrl + 'PMTaskHandle/pause/',
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
                    $scope.data.cmd = "解读暂停";
                    $http({
                        method: 'post',
                        url: baseUrl + 'PMTaskHandle/pause/',
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
                    $scope.data.cmd = "取消解读";
                    $http({
                        method: 'post',
                        url: baseUrl + 'PMTaskHandle/cancel/',
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
                    $scope.data.cmd = "取消实验";
                    console.log($scope.data);
                    $http({
                        method: 'post',
                        url: baseUrl + 'PMTaskHandle/cancel/',
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
                case 'orders':
                    console.log('下单')

                    $scope.patient.patientid = $scope.rowCollection.patientid;
                    $scope.patient.account = $scope.patient.account;
                    $scope.patient.products = $scope.result;
                    console.log($scope.patient);
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