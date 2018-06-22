(function(angular) {
    var app = angular.module('myApp', ['smart-table', 'ui.bootstrap', 'ngRoute', 'ngFileUpload', 'tool']);
    app.controller('safeCtrl', ['$scope', '$log', '$routeParams', '$rootScope', '$http', '$location', 'Upload', '$timeout',
        function($scope, $log, $routeParams, $rootScope, $http, $location, Upload, $timeout) {
            //名词解释详情头部切换
            $('#myTab li').on('click', function() {
                $('#myTabContent').children().eq($(this).index()).addClass('active in').siblings().removeClass('active in');
            })
            $scope.items = null;

            $scope.rowCollection = [];
            // //名词解释





            //获取url
            var href = $location.url();
            var baseUrl = 'http://192.168.1.211:8000/';
            // var url, sUrl, delUrl, checkUrl, upUrl;
            // switch (href) {
            //     case '/abbr':
            //         url = baseUrl + 'siglashow/';
            //         sUrl = baseUrl + 'siglasubmit/';
            //         delUrl = baseUrl + 'sigladel/';
            //         checkUrl = baseUrl + 'siglastate/';
            //         upUrl = baseUrl + 'siglaup/';
            //         // downUrl = baseUrl + 'sigladown/';
            //         reUrl = baseUrl + 'state_reject/';
            //         break;
            //     case '/refer':
            //         url = baseUrl + 'refdocumentshow/';
            //         sUrl = baseUrl + 'refdocumentsubmit/';
            //         delUrl = baseUrl + 'refdocumentdel/';
            //         checkUrl = baseUrl + 'refdocumentstate/';
            //         upUrl = baseUrl + 'refdocumentup/';
            //         // downUrl = baseUrl + 'refdocumentdown/';
            //         reUrl = baseUrl + 'refdocument_reject/';

            //         break;
            //     case '/dnaInfo':
            //         url = baseUrl + 'gennewsshow/';
            //         sUrl = baseUrl + 'gennewssubmit/';
            //         delUrl = baseUrl + 'gennewsdel/';
            //         checkUrl = baseUrl + 'gennewsstate/';
            //         upUrl = baseUrl + 'gennewsup/';
            //         // downUrl = baseUrl + 'gennewsdown/';
            //         reUrl = baseUrl + 'gennews_reject/';
            //         break;
            //     case '/bianyiInfo':
            //         url = baseUrl + 'variationewsshow/';
            //         sUrl = baseUrl + 'variationewssubmit/';
            //         delUrl = baseUrl + 'variationewsdel/';
            //         checkUrl = baseUrl + 'variationewsstate/';
            //         upUrl = baseUrl + 'variationewsup/';
            //         // downUrl = baseUrl + 'variationewsdown/';
            //         reUrl = baseUrl + 'variationews_reject/';
            //         break;
            //     case '/indications':
            //         url = baseUrl + 'diseasenewsshow/';
            //         sUrl = baseUrl + 'diseasenewssubmit/';
            //         delUrl = baseUrl + 'diseasenewsdel/';
            //         checkUrl = baseUrl + 'diseasenewsstate/';
            //         upUrl = baseUrl + 'diseasenewsup/';
            //         // downUrl = baseUrl + 'diseasenewsdown/';
            //         reUrl = baseUrl + 'diseasenews_reject/';
            //         break;
            //     case '/immune':
            //         url = baseUrl + 'immuneshow/';
            //         sUrl = baseUrl + 'immunesubmit/';
            //         delUrl = baseUrl + 'immunedel/';
            //         checkUrl = baseUrl + 'immunestate/';
            //         upUrl = baseUrl + 'immuneup/';
            //         // downUrl = baseUrl + 'immunedown/';
            //         reUrl = baseUrl + 'immune_reject/';
            //         break;
            //     case '/drugInfo':
            //         url = baseUrl + 'drugnewsshow/';
            //         sUrl = baseUrl + 'drugnewssubmit/';
            //         delUrl = baseUrl + 'drugnewsdel/';
            //         checkUrl = baseUrl + 'drugnewsstate/';
            //         upUrl = baseUrl + 'drugnewsup/';
            //         // downUrl = baseUrl + 'drugnewsdown/';
            //         reUrl = baseUrl + 'drugnews_reject/';
            //         break;
            //     case '/yiganSite':
            //         url = baseUrl + 'siteshow/';
            //         sUrl = baseUrl + 'sitesubmit/';
            //         delUrl = baseUrl + 'sitedel/';
            //         checkUrl = baseUrl + 'sitestate/';
            //         upUrl = baseUrl + 'siteup/';
            //         // downUrl = baseUrl + 'sitedown/';
            //         reUrl = baseUrl + 'site_reject/';
            //         break;
            //     case '/chemoSite':
            //         url = baseUrl + 'chemotherapyshow/';
            //         sUrl = baseUrl + 'chemotherapysubmit/';
            //         delUrl = baseUrl + 'chemotherapydel/';
            //         checkUrl = baseUrl + 'chemotherapystate/';
            //         upUrl = baseUrl + 'chemotherapyup/';
            //         // downUrl = baseUrl + 'chemotherapydown/';
            //         reUrl = baseUrl + 'chemotherapy_reject/';
            //         break;
            //     case '/targetSite':
            //         url = baseUrl + 'targetshow/';
            //         sUrl = baseUrl + 'targetsubmit/';
            //         delUrl = baseUrl + 'targetdel/';
            //         checkUrl = baseUrl + 'targetstate/';
            //         upUrl = baseUrl + 'targetup/';
            //         // downUrl = baseUrl + 'targetdown/';
            //         reUrl = baseUrl + 'target_reject/';
            //         break;
            // }
            // // console.log(url+'--'sUrl+'--'delUrl+'--'checkUrl+'--'+downUrl+'upUrl');
            // $rootScope.urls = { url: url, sUrl: sUrl, delUrl: delUrl, checkUrl: checkUrl, upUrl: upUrl, reUrl: reUrl };

            // if (href) {
            $rootScope.getData = function() {
                // console.log(baseUrl+'AnaTaskHandle/view/');
                $http({
                    method: 'post',
                    url: baseUrl + 'AnaTaskHandle/view/'
                }).then(function(respons) {
                    $rootScope.showData = respons.data;
                }, function() {})


            }

            // }

            $rootScope.getData();

            //获取表格的值
            $rootScope.getDesc = function(item, url) {
                console.log(item)
                $scope.items = {};
                if (item) {
                    angular.forEach(item, function(value, key) {
                        $scope.items[key] = value;
                    })
                }
                if (!$scope.items.isSelected) {
                    $scope.items = null;
                }

                if (href == '/projectList' && $scope.items) {
                    $scope.data = {};
                    $scope.data.taskid = $scope.items.taskid;
                    $http({
                        method: 'post',
                        url: baseUrl + 'AnaTaskHandle/qcview/',
                        data: $scope.data
                    }).then(function(response) {
                        $scope.quality = response.data;
                        if ($scope.quality.mutation) {
                            $http({
                                method: 'post',
                                url: baseUrl + ($scope.quality.mutation).substring(1)
                            }).then(function(response) {
                                $scope.mutationData = response.data;
                            }, function() {})

                        }else{
                        	$scope.mutationData =null;
                        }
                    }, function() {})

                }
            }




     







        }
    ]);





    //路由
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/:name', {
                templateUrl: function($routeParams) {
                    return 'projectRoute/' + $routeParams.name;
                },
                controller: 'safeCtrl'
            }).otherwise({ redirectTo: '/projectList' });
        // });

    }]);



    app.controller('ModalDemoCtrl', function($scope, $uibModal, $log, $timeout) {
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
        var baseUrl = 'http://192.168.1.211:8000/';
        $scope.ok = function() {
            $uibModalInstance.close();
            switch (btnname) {
                case 'delete':
                    console.log('删除');
                    console.log($scope.rowCollection);
                    $rootScope.error = '123'
                    // $http({
                    //     method: 'post',
                    //     url: urls.delUrl,
                    //     data: $scope.rowCollection
                    // }).then(function successCallback() {
                    // 	$rootScope.getData();
                    // 	$rootScope.warning = respons.data.warning;
                    //     $rootScope.error = respons.data.error;
                    //     $rootScope.success = respons.data.success;
                    //     $timeout(function() {
                    //         $rootScope.warning = null;
                    //         $rootScope.error = null;
                    //         $rootScope.success = null;
                    //     }, 3000)
                    // }, function errorCallback() {
                    //     console.log('请求失败');
                    // })


                    break;

                case 'modif':
                    console.log('修改');
                    // console.log($scope.rowCollection);

                    $scope.data = {};
                    $scope.data.taskid = $scope.rowCollection.taskid;
                    $scope.data.config = $scope.rowCollection.config;
                    $scope.data.info = $scope.rowCollection.info;
                    console.log($scope.data);
                    $http({
                        method: 'post',
                        url: baseUrl + 'AnaTaskHandle/modify/',
                        data: $scope.data
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
                    // for (var i = 0; i < $scope.shortData.data.length; i++) {
                    //     if ($scope.shortData.data[i]._id == $scope.rowCollection._id || ($scope.shortData.data[i].temIndex == $scope.rowCollection.temIndex && $scope.shortData.data[i].temIndex != null)) {
                    //         $scope.shortData.data[i].remarks = '审核被驳回';
                    //         $scope.shortData.data[i].cause = $scope.remarks;
                    //         $scope.getDesc($scope.shortData.data[i]);
                    //         break;
                    //     }
                    // }
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

                    // for (var i = 0; i < $scope.shortData.data.length; i++) {
                    //     if ($scope.shortData.data[i]._id == $scope.rowCollection._id || ($scope.shortData.data[i].temIndex == $scope.rowCollection.temIndex && $scope.shortData.data[i].temIndex != null)) {
                    //         for (var key in $scope.rowCollection.update) {
                    //             $scope.shortData.data[i][key] = $scope.rowCollection.update[key];
                    //         }

                    //         $scope.shortData.data[i].update = null;
                    //         $scope.shortData.data[i].remarks = '';
                    //         $rootScope.getDesc($scope.shortData.data[i]);
                    //         break;
                    //     }
                    // }
                    console.log('审核');
                    // console.log($scope.shortData.data);
            }
        };

        $scope.cancel = function() {
            $uibModalInstance.close();
        };
    });

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