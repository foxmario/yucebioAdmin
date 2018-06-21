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
            $scope.items = null;

            $scope.rowCollection = [];
            // //名词解释
            // $rootScope.shortData = {
            //     data: [{
            //             short: 'MSI',
            //             cname: '微卫星不稳定性',
            //             ename: 'microsatellite instability',
            //             rate: 1,
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             update: { short: 'zsn', cname: '张苏纳', ename: 'zhangsuna', type: 'mutation' },
            //             _id: 123,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search',
            //             remarks: '待审核',
            //             state:'待审核'
            //         },
            //         {
            //             short: 'l',
            //             cname: '李',
            //             ename: 'li',
            //             rate: 1,
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "tangjun",
            //                 check: '唐僧'
            //             }],
            //             update: { short: 'lk', cname: '李逵', ename: 'likui' },
            //             _id: 124,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search',
            //             remarks: '待审核'
            //         },
            //         {
            //             short: 'w',
            //             cname: '王',
            //             ename: 'wang',
            //             rate: 0,
            //             _id: 125,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search'
            //         },
            //         {
            //             short: 'w',
            //             cname: '王',
            //             ename: 'wang',
            //             rate: 1,
            //             _id: 126,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search'
            //         },
            //         {
            //             short: 'w',
            //             cname: '王',
            //             ename: 'wang',
            //             rate: 1,
            //             _id: 127,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search'
            //         },
            //         {
            //             short: 'w',
            //             cname: '王',
            //             ename: 'wang',
            //             rate: 1,
            //             _id: 128,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search'
            //         },
            //         {
            //             short: 'w',
            //             cname: '王',
            //             ename: 'wang',
            //             rate: 1,
            //             _id: 129,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search'
            //         },
            //         {
            //             short: 'w',
            //             cname: '王',
            //             ename: 'wang',
            //             rate: 1,
            //             _id: 130,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search'
            //         },
            //         {
            //             short: 'w',
            //             cname: '王',
            //             ename: 'wang',
            //             rate: 1,
            //             _id: 131,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search'
            //         },
            //         {
            //             short: 'w',
            //             cname: '王',
            //             ename: 'wang',
            //             rate: 1,
            //             _id: 132,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search'
            //         },
            //         {
            //             short: 'w',
            //             cname: '王',
            //             ename: 'wang',
            //             rate: 1,
            //             _id: 133,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search'
            //         },
            //         {
            //             short: 'w',
            //             cname: '王',
            //             ename: 'wang',
            //             rate: 1,
            //             _id: 134,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search'
            //         },
            //         {
            //             short: 'w',
            //             cname: '王',
            //             ename: 'wang',
            //             rate: 1,
            //             _id: 135,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search',
            //             last_operetion:'liuyiyang',
            //             update:{},
            //             state: '待审核',
            //         },
            //         {
            //             short: 'w',
            //             cname: '王',
            //             ename: 'wang',
            //             rate: 1,
            //             _id: 136,
            //             definitions: 'MSI是指与正常组织相比，在肿瘤中某一微卫星由于重复单位的插入或缺失而造成的微卫星长度的任何改变，出现新的微卫星等位基因现象。',
            //             infosource: 'https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=MSI&commit=Search',
            //             update: { short: 'zsn', cname: '张苏纳', ename: 'zhangsuna', type: 'mutation' },
            //             remarks: '待审核',
                        
            //              log: [{
            //                 check:"tangjun",
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //             },{
            //                 check:"tangjun",
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //             }],
            //             message: '',
            //             date: '2018-05-28 10:11:00',
            //             state: '待审核',
            //             last_operetion:' '
            //         }
            //     ]
            // }

         
           


      




            //获取url
            var href = $location.url();
            // var baseUrl = 'http://192.168.1.139:8000/';
            var baseUrl = 'http://192.168.1.139:8000/';
            var url, sUrl, delUrl, checkUrl, upUrl;
            switch (href) {
                case '/abbr':
                    url = baseUrl + 'siglashow/';
                    sUrl = baseUrl + 'siglasubmit/';
                    delUrl = baseUrl + 'sigladel/';
                    checkUrl = baseUrl + 'siglastate/';
                    upUrl = baseUrl + 'siglaup/';
                    // downUrl = baseUrl + 'sigladown/';
                    reUrl = baseUrl + 'state_reject/';
                    break;
                case '/refer':
                    url = baseUrl + 'refdocumentshow/';
                    sUrl = baseUrl + 'refdocumentsubmit/';
                    delUrl = baseUrl + 'refdocumentdel/';
                    checkUrl = baseUrl + 'refdocumentstate/';
                    upUrl = baseUrl + 'refdocumentup/';
                    // downUrl = baseUrl + 'refdocumentdown/';
                    reUrl = baseUrl + 'refdocument_reject/';

                    break;
                case '/dnaInfo':
                    url = baseUrl + 'gennewsshow/';
                    sUrl = baseUrl + 'gennewssubmit/';
                    delUrl = baseUrl + 'gennewsdel/';
                    checkUrl = baseUrl + 'gennewsstate/';
                    upUrl = baseUrl + 'gennewsup/';
                    // downUrl = baseUrl + 'gennewsdown/';
                    reUrl = baseUrl + 'gennews_reject/';
                    break;
                case '/bianyiInfo':
                    url = baseUrl + 'variationewsshow/';
                    sUrl = baseUrl + 'variationewssubmit/';
                    delUrl = baseUrl + 'variationewsdel/';
                    checkUrl = baseUrl + 'variationewsstate/';
                    upUrl = baseUrl + 'variationewsup/';
                    // downUrl = baseUrl + 'variationewsdown/';
                    reUrl = baseUrl + 'variationews_reject/';
                    break;
                case '/indications':
                    url = baseUrl + 'diseasenewsshow/';
                    sUrl = baseUrl + 'diseasenewssubmit/';
                    delUrl = baseUrl + 'diseasenewsdel/';
                    checkUrl = baseUrl + 'diseasenewsstate/';
                    upUrl = baseUrl + 'diseasenewsup/';
                    // downUrl = baseUrl + 'diseasenewsdown/';
                    reUrl = baseUrl + 'diseasenews_reject/';
                    break;
                case '/immune':
                    url = baseUrl + 'immuneshow/';
                    sUrl = baseUrl + 'immunesubmit/';
                    delUrl = baseUrl + 'immunedel/';
                    checkUrl = baseUrl + 'immunestate/';
                    upUrl = baseUrl + 'immuneup/';
                    // downUrl = baseUrl + 'immunedown/';
                    reUrl = baseUrl + 'immune_reject/';
                    break;
                case '/drugInfo':
                    url = baseUrl + 'drugnewsshow/';
                    sUrl = baseUrl + 'drugnewssubmit/';
                    delUrl = baseUrl + 'drugnewsdel/';
                    checkUrl = baseUrl + 'drugnewsstate/';
                    upUrl = baseUrl + 'drugnewsup/';
                    // downUrl = baseUrl + 'drugnewsdown/';
                    reUrl = baseUrl + 'drugnews_reject/';
                    break;
                case '/yiganSite':
                    url = baseUrl + 'siteshow/';
                    sUrl = baseUrl + 'sitesubmit/';
                    delUrl = baseUrl + 'sitedel/';
                    checkUrl = baseUrl + 'sitestate/';
                    upUrl = baseUrl + 'siteup/';
                    // downUrl = baseUrl + 'sitedown/';
                    reUrl = baseUrl + 'site_reject/';
                    break;
                case '/chemoSite':
                    url = baseUrl + 'chemotherapyshow/';
                    sUrl = baseUrl + 'chemotherapysubmit/';
                    delUrl = baseUrl + 'chemotherapydel/';
                    checkUrl = baseUrl + 'chemotherapystate/';
                    upUrl = baseUrl + 'chemotherapyup/';
                    // downUrl = baseUrl + 'chemotherapydown/';
                    reUrl = baseUrl + 'chemotherapy_reject/';
                    break;
                case '/targetSite':
                    url = baseUrl + 'targetshow/';
                    sUrl = baseUrl + 'targetsubmit/';
                    delUrl = baseUrl + 'targetdel/';
                    checkUrl = baseUrl + 'targetstate/';
                    upUrl = baseUrl + 'targetup/';
                    // downUrl = baseUrl + 'targetdown/';
                    reUrl = baseUrl + 'target_reject/';
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

            // $rootScope.getData();

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
                'FDA,CFDA',
                'Phase1',
                'Phase1/2',
                'Phase2',
                'Phase2/3',
                'Phase3',
                'Phase4',
                'Preclinical'

            ]
            //敏感性
            $scope.sensitivity = [
                '意义未明',
                '可能敏感',
                '敏感',
                '可能耐药',
                '耐药'
            ]
            //证据等级
            $scope.grade = [
                'Level 1',
                'Level 2A',
                'Level 2B',
                'Level 3A',
                'Level 3B',
                'Level 3C',
                'Level 3D',
                'Level 3E',
                'Level 3F',
                'Level 4A',
                'Level 4B',
                'Level 4C',
                'Level 4D',
                'Level 5',
                'Level 6'
            ]
            //化疗证据等级
            $scope.chemoGrade = [
                'Level 1A',
                'Level 1B',
                'Level 2A',
                'Level 2B',
                'Level 3',
                'Level 4'

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