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
            // $scope.control = { state_reject: 1, state: 1, add: 1, remove: 1, change: 1 }

            //获取url
            var href = $location.url();
            var baseUrl = 'http://192.168.1.211:8000/';
            var url, sUrl, delUrl, checkUrl, upUrl;
            switch (href) {
                case '/abbr':
                    url = baseUrl + 'sigla_show/';
                    sUrl = baseUrl + 'sigla_submit/';
                    delUrl = baseUrl + 'sigla_delete/';
                    checkUrl = baseUrl + 'sigla_state/';
                    upUrl = baseUrl + 'sigla_up/';
                    // downUrl = baseUrl + 'sigla_down/';
                    reUrl = baseUrl + 'state_reject/';
                    break;
                case '/refer':
                    url = baseUrl + 'refdocument_show/';
                    sUrl = baseUrl + 'refdocument_submit/';
                    delUrl = baseUrl + 'refdocument_delete/';
                    checkUrl = baseUrl + 'refdocument_state/';
                    upUrl = baseUrl + 'refdocument_up/';
                    // downUrl = baseUrl + 'refdocument_down/';
                    reUrl = baseUrl + 'refdocument_reject/';

                    break;
                case '/dnaInfo':
                    url = baseUrl + 'gennews_show/';
                    sUrl = baseUrl + 'gennews_submit/';
                    delUrl = baseUrl + 'gennews_delete/';
                    checkUrl = baseUrl + 'gennews_state/';
                    upUrl = baseUrl + 'gennews_up/';
                    // downUrl = baseUrl + 'gennews_down/';
                    reUrl = baseUrl + 'gennews_reject/';
                    break;
                case '/bianyiInfo':
                    url = baseUrl + 'variationews_show/';
                    sUrl = baseUrl + 'variationews_submit/';
                    delUrl = baseUrl + 'variationews_delete/';
                    checkUrl = baseUrl + 'variationews_state/';
                    upUrl = baseUrl + 'variationews_up/';
                    // downUrl = baseUrl + 'variationews_down/';
                    reUrl = baseUrl + 'variationews_reject/';
                    break;
                case '/indications':
                    url = baseUrl + 'diseasenews_show/';
                    sUrl = baseUrl + 'diseasenews_submit/';
                    delUrl = baseUrl + 'diseasenews_delete/';
                    checkUrl = baseUrl + 'diseasenews_state/';
                    upUrl = baseUrl + 'diseasenews_up/';
                    // downUrl = baseUrl + 'diseasenews_down/';
                    reUrl = baseUrl + 'diseasenews_reject/';
                    break;
                case '/immune':
                    url = baseUrl + 'immune_show/';
                    sUrl = baseUrl + 'immune_submit/';
                    delUrl = baseUrl + 'immune_delete/';
                    checkUrl = baseUrl + 'immune_state/';
                    upUrl = baseUrl + 'immune_up/';
                    // downUrl = baseUrl + 'immune_down/';
                    reUrl = baseUrl + 'immune_reject/';
                    break;
                case '/drugInfo':
                    url = baseUrl + 'drugnews_show/';
                    sUrl = baseUrl + 'drugnews_submit/';
                    delUrl = baseUrl + 'drugnews_delete/';
                    checkUrl = baseUrl + 'drugnews_state/';
                    upUrl = baseUrl + 'drugnews_up/';
                    // downUrl = baseUrl + 'drugnews_down/';
                    reUrl = baseUrl + 'drugnews_reject/';
                    break;
                case '/yiganSite':
                    url = baseUrl + 'site_show/';
                    sUrl = baseUrl + 'site_submit/';
                    delUrl = baseUrl + 'site_delete/';
                    checkUrl = baseUrl + 'site_state/';
                    upUrl = baseUrl + 'site_up/';
                    // downUrl = baseUrl + 'site_down/';
                    reUrl = baseUrl + 'site_reject/';
                    break;
                case '/chemoSite':
                    url = baseUrl + 'chemotherapy_show/';
                    sUrl = baseUrl + 'chemotherapy_submit/';
                    delUrl = baseUrl + 'chemotherapy_delete/';
                    checkUrl = baseUrl + 'chemotherapy_state/';
                    upUrl = baseUrl + 'chemotherapy_up/';
                    // downUrl = baseUrl + 'chemotherapy_down/';
                    reUrl = baseUrl + 'chemotherapy_reject/';
                    break;
                case '/targetSite':
                    url = baseUrl + 'target_show/';
                    sUrl = baseUrl + 'target_submit/';
                    delUrl = baseUrl + 'target_delete/';
                    checkUrl = baseUrl + 'target_state/';
                    upUrl = baseUrl + 'target_up/';
                    // downUrl = baseUrl + 'target_down/';
                    reUrl = baseUrl + 'target_reject/';
                    break;
                case '/nccn':
                    url = baseUrl + 'NCCN_show/';
                    sUrl = baseUrl + 'NCCN_submit/';
                    delUrl = baseUrl + 'NCCN_delete/';
                    checkUrl = baseUrl + 'NCCN_state/';
                    upUrl = baseUrl + 'NCCN_up/';
                    // downUrl = baseUrl + 'NCCN_down/';
                    reUrl = baseUrl + 'NCCN_reject/';
                    break;
                case '/globalModif':
                    url = baseUrl + 'replace_show/';
                    checkUrl = baseUrl + 'replace_state/';
                    reUrl = baseUrl + 'replace_reject/';
                    sUrl = baseUrl + 'global_replace/';
                    $scope.recoverUrl = baseUrl + 'replace_rollBack/';
                    break;
            }
            // console.log(url+'--'sUrl+'--'delUrl+'--'checkUrl+'--'+downUrl+'upUrl');
            $rootScope.urls = { url: url, sUrl: sUrl, delUrl: delUrl, checkUrl: checkUrl, upUrl: upUrl, reUrl: reUrl };

            if (href) {
                $rootScope.getData = function() {
                    $http({
                        method: 'get',
                        url: $scope.urls.url,
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


            $scope.newCreat = function(size, items) {

                $timeout(function() {
                    $scope.items = null;
                    console.log($scope.items)
                }, 200)

            }

            //变异类型
            $scope.bianyiType = [
                '3_prime_UTR_variant',
                '5_prime_UTR_variant',
                'Amplification',
                'Copy_number_variantion',
                'Deletion',
                'Exon_loss_variant',
                'Exon_variant',
                'Expression',
                'Frameshift_truncation',
                'Fusion',
                'Rearrangment',
                'Inframe_deletion',
                'Inframe_insertion',
                'Loss_of_function_variant',
                'Loss_of_heterozygosity',
                'Methylation',
                'Missense_variant',
                'Mutation',
                'Nonsense_variant',
                'Promoter_methylation',
                'Protein_altering_variant',
                'Silent_variant',
                'Wild_type'
            ];
            //临床意义
            $scope.clinic = [
                'Affects',
                'Association',
                'Benign',
                'Conflicting data from submitters',
                'Drug response',
                'Likely benign',
                'Likely pathogenic',
                'Not provided',
                'Other',
                'Pathogenic',
                'Protective',
                'Risk factor',
                'Uncertain significance'

            ]
            //获批状态
            $scope.huopiStatus = [
                'CFDA',
                'Clinical',
                'FDA',
                'FDA，CFDA',
                'Phase 1',
                'Phase 1/2',
                'Phase 2',
                'Phase 2/3',
                'Phase 3',
                'Phase 4',
                'Preclinical'

            ]
            //敏感性
            $scope.sensitivity = [
                '意义未明',
                '可能敏感',
                '敏感',
                '可能耐药',
                '耐药',
                '不适用',
                '敏感性高',
                '敏感性中等',
                '敏感性低',
                '敏感性增加',
                '敏感性降低',
                '不敏感'
            ]
            //证据等级
            $scope.grade = [
                'Level 1',
                'Level 2A',
                'Level 2B',
                'Level 3A',
                'Level 3B',
                'Level 3C',
                'Level 4A',
                'Level 4B',
                'Level 5',
                'Level 6'
            ]
            //化疗证据等级
            $scope.chemoGrade = [
                '1A',
                '1B',
                '2A',
                '2B',
                '3',
                '4'

            ]



            //文件上传

            $scope.uploadPic = function(file) {
                $scope.file = file;
                console.log($scope.file);
                file.upload = Upload.upload({
                    url: $scope.urls.upUrl,
                    data: { username: $scope.username, file: file },
                });

                file.upload.then(function(response) {
                    // $timeout(function() {
                    file.result = response.data;
                    console.log(response.data);
                    // });
                }, function(response) {
                    // $scope.errorMsg = response.status + ': ' + response.data;
                    $scope.errorMsg = '上传失败';
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });

            }

            // $scope.download = {};
            // if (href) {
            //     $http({
            //         method: 'get',
            //         url: $scope.urls.downUrl
            //     }).then(function successCallback(response) {
            //         $scope.download.href = response.data;
            //     }, function errorCallback() {})
            // }











        }
    ]);





    //路由
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/:name', {
                templateUrl: function($routeParams) {
                    return 'dataRoute/' + $routeParams.name;
                },
                controller: 'safeCtrl'
            }).otherwise({ redirectTo: '/abbr' });
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
                    }

                }
            });
        }

        $scope.recover = function(size) {
            $scope.infos.name = '是否恢复到替换前的状态';
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
                        return $scope.name = 'recover';
                    },
                    datas: function() {
                        return $scope.items;
                    },
                    urls: function() {
                        return $scope.recoverUrl;
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
                    }
                }
            });
        }

        $scope.rejectCheck = function(size) {
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
                    $http({
                        method: 'post',
                        url: urls.delUrl,
                        data: $scope.rowCollection
                    }).then(function successCallback(response) {
                        $rootScope.message = response.data;
                        $timeout(function() {
                            $rootScope.getData();
                            $rootScope.message = null;
                        }, 25);
                    }, function errorCallback() {
                        console.log('请求失败');
                    })



                    break;

                case 'add':
                    console.log('添加');
                    if (!$scope.rowCollection) {
                        alert('内容不能为空')
                        return;
                    }
                    $http({
                        method: 'post',
                        url: urls.sUrl,
                        data: $scope.rowCollection
                    }).then(function successCallback(response) {
                        $rootScope.message = response.data;
                        $timeout(function() {
                            $rootScope.getData();
                            $rootScope.message = null;
                        }, 25);
                    }, function errorCallback() {
                        console.log('请求失败');
                    })

                    break;
                case 'rejectCheck':
                    $scope.data = {};
                    $scope.data._id = $scope.rowCollection._id;
                    $scope.data.remarks = $scope.remarks;
                    $http({
                        method: 'post',
                        url: urls.reUrl,
                        data: $scope.data
                    }).then(function(response) {
                        $rootScope.message = response.data;
                        $timeout(function() {
                            $rootScope.getData();
                            $rootScope.message = null;
                        }, 25);
                    }, function() {})
                    break;
                case 'recover':
                    $scope.data = {};
                    $scope.data._id = $scope.rowCollection._id;
                    console.log(urls)
                    $http({
                        method: 'post',
                        url: urls,
                        data: $scope.data
                    }).then(function(response) {
                        $rootScope.message = response.data;
                        $timeout(function() {
                            $rootScope.getData();
                            $rootScope.message = null;
                        }, 25);
                    }, function() {
                        console.log('请求失败');
                    })
                    break;
                default:

                    $http({
                        method: 'post',
                        url: urls.checkUrl,
                        data: $scope.rowCollection
                    }).then(function successCallback(response) {
                        $rootScope.message = response.data;
                        $timeout(function() {
                            $rootScope.getData();
                            $rootScope.message = null;
                        }, 25);
                    }, function errorCallback() {
                        console.log('请求失败')
                    })

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