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
            $scope.control = { state_reject: 1, state: 1, add: 1, remove: 1, change: 1 }
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

            // //参考文献
            // $rootScope.shortData = {
            //   data:[
            //     {keys:'EGFR,Lung Cancer',document:'EGFR Exon 18 Mutations in Lung Cancer: Molecular Predictors of Augmented Sensitivity to Afatinib or Neratinib as Compared with First- or Third-Generation TKIs.',href:'zhang',rate:1,log:[
            //         {
            //           date : "2018-04-25 18:56:50",
            //           content : ",aaaaaa-->a",
            //           recorder : "张三",
            //           check : '孙悟空'
            //         }
            //       ],
            //       update:{keys:'EGFR,Lung Cancersn',document:'EGFR Exon 18 Mutations in Lung Cancer: Molecular Predictors of Augmented Sensitivity to Afatinib or Neratinib as Compared with First- or Third-Generation TKIs.苏纳',href:'zhangsuna',type:'mutation'},
            //       _id:123,
            //       infosource:'PMID:26206867|||Kobayashi Y, Togashi Y, Yatabe Y, et al. EGFR Exon 18 Mutations in Lung Cancer: Molecular Predictors of Augmented Sensitivity to Afatinib or Neratinib as Compared with First- or Third-Generation TKIs.[J]. Clinical Cancer Research, 2015, 21(23):5305-5313.',
            //       href:'http://clincancerres.aacrjournals.org/content/21/23/5305.long'
            //     },
            //     {keys:'EGFR,Lung Cancer',document:'EGFR Exon 18 Mutations in Lung Cancer: Molecular Predictors of Augmented Sensitivity to Afatinib or Neratinib as Compared with First- or Third-Generation TKIs.',href:'li',rate:1,log:[
            //         {
            //           date : "2018-04-25 18:56:50",
            //           content : ",aaaaaa-->a",
            //           recorder : "tangjun",
            //           check : '唐僧'
            //         }
            //       ],update:{keys:'EGFR,Lung Cancerk',document:'EGFR Exon 18 Mutations in Lung Cancer: Molecular Predictors of Augmented Sensitivity to Afatinib or Neratinib as Compared with First- or Third-Generation TKIs.逵',href:'likui'},_id:124,
            //       infosource:'PMID:26206867|||Kobayashi Y, Togashi Y, Yatabe Y, et al. EGFR Exon 18 Mutations in Lung Cancer: Molecular Predictors of Augmented Sensitivity to Afatinib or Neratinib as Compared with First- or Third-Generation TKIs.[J]. Clinical Cancer Research, 2015, 21(23):5305-5313.',
            //       href:'http://clincancerres.aacrjournals.org/content/21/23/5305.long'
            //     },
            //     {keys:'EGFR,Lung Cancer',document:'EGFR Exon 18 Mutations in Lung Cancer: Molecular Predictors of Augmented Sensitivity to Afatinib or Neratinib as Compared with First- or Third-Generation TKIs.',href:'wang',rate:0,_id:125,
            //       infosource:'PMID:26206867|||Kobayashi Y, Togashi Y, Yatabe Y, et al. EGFR Exon 18 Mutations in Lung Cancer: Molecular Predictors of Augmented Sensitivity to Afatinib or Neratinib as Compared with First- or Third-Generation TKIs.[J]. Clinical Cancer Research, 2015, 21(23):5305-5313.',
            //       href:'http://clincancerres.aacrjournals.org/content/21/23/5305.long'
            //   },
            //     {keys:'EGFR,Lung Cancer',document:'EGFR Exon 18 Mutations in Lung Cancer: Molecular Predictors of Augmented Sensitivity to Afatinib or Neratinib as Compared with First- or Third-Generation TKIs.',href:'wang',rate:1,_id:126,
            //       infosource:'PMID:26206867|||Kobayashi Y, Togashi Y, Yatabe Y, et al. EGFR Exon 18 Mutations in Lung Cancer: Molecular Predictors of Augmented Sensitivity to Afatinib or Neratinib as Compared with First- or Third-Generation TKIs.[J]. Clinical Cancer Research, 2015, 21(23):5305-5313.',
            //       href:'http://clincancerres.aacrjournals.org/content/21/23/5305.long'
            //     }
            //   ]
            // }
            // //基因信息
            // $rootScope.shortData = {
            //   data:[
            //     {genid:'HGNC:3236',genname:'EGFR',gendetail:'EGFR基因（人表皮生长因子受体）是位于7号染色体的原癌基因。该基因编码的蛋白是一种结合表皮生长因子的细胞表面蛋白，属于ErbB家族的受体酪氨酸激酶。该受体与配体结合可诱导受体的二聚化和酪氨酸的自磷酸化。自磷酸化刺激下游信号通路，包括MAPK，PI3K和JNK，从而导致DNA合成和细胞增殖。EGFR主要的突变类型包括拷贝数变化、扩增、外显子19缺失、外显子21突变、外显子18过表达、外显子20插入、L858R、C797S等。EGFR的酪氨酸激酶抑制剂（EGFR-TKIs）吉非替尼、厄洛替尼、埃克替尼、阿法替尼、奥斯替尼在EGFR突变的肿瘤中显效。T790M突变对第一代药物吉非替尼，厄洛替尼产生突变性耐药，而C797S突变是第三代药物奥斯替尼耐药机制之一。',
            //     log:[
            //         {
            //           date : "2018-04-25 18:56:50",
            //           content : ",aaaaaa-->a",
            //           recorder : "张三",
            //           check : '孙悟空'
            //         }
            //       ],update:{genid:'zsn',genname:'张苏纳',gendetail:'zhangsuna',infosource:'mutation',

            //         infosource:'http://baidu.com'
            //         },
            //       _id:123, infosource:'loss_of_heterozygosity',gendisease:'EGFR信号通路',
            //       infosource:'http://www.genecards.org/cgi-bin/carddisp.pl?gene=EGFR&keywords=EGFR'
            //     }

            //   ]
            // }

            // //变异信息
            // $rootScope.shortData = {
            //     data: [{
            //             genname: 'BRAF',
            //             rstype: 'missense_variant',
            //             exon2: '',
            //             exon: 'exon 15',
            //             nucleotide: 'c.1799T>A',
            //             amino_acid: 'p.V600E',
            //             gengroup: 'Chr7:140453136 (on Assembly GRCh37)',
            //             rsdetail: 'BRAF V600E has been shown to be recurrent in many cancer types. It is one of the most widely studied variants in cancer. This variant is correlated with poor prognosis in certain cancer types, including colorectal cancer and papillary thyroid cancer. The targeted therapeutic dabrafenib has been shown to be effective in clinical trials with an array of BRAF mutations and cancer types. Dabrafenib has also shown to be effective when combined with the MEK inhibitor trametinib in colorectal cancer and melanoma. However, in patients with TP53, CDKN2A and KRAS mutations, dabrafenib resistance has been reported. Ipilimumab, regorafenib, vemurafenib, and a number of combination therapies have been successful in treating V600E mutations. However, cetuximab and panitumumab have been largely shown to be ineffective without supplementary treatment.',
            //             clinic: 'Pathogenic',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             _id: 123,
            //             infosource: 'https://civicdb.org/events/genes/5/summary/variants/12/summary'
            //         },
            //         {
            //             genname: 'BRAF',
            //             rstype: 'missense_variant',
            //             exon2: '',
            //             exon: 'exon 15',
            //             nucleotide: 'c.1799T>A',
            //             amino_acid: 'p.V600E',
            //             gengroup: 'Chr7:140453136 (on Assembly GRCh37)',
            //             rsdetail: 'BRAF V600E has been shown to be recurrent in many cancer types. It is one of the most widely studied variants in cancer. This variant is correlated with poor prognosis in certain cancer types, including colorectal cancer and papillary thyroid cancer. The targeted therapeutic dabrafenib has been shown to be effective in clinical trials with an array of BRAF mutations and cancer types. Dabrafenib has also shown to be effective when combined with the MEK inhibitor trametinib in colorectal cancer and melanoma. However, in patients with TP53, CDKN2A and KRAS mutations, dabrafenib resistance has been reported. Ipilimumab, regorafenib, vemurafenib, and a number of combination therapies have been successful in treating V600E mutations. However, cetuximab and panitumumab have been largely shown to be ineffective without supplementary treatment.',
            //             clinic: 'Pathogenic',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             update: { genname: '123', rstype: '虎骨' },
            //             _id: 123,
            //             infosource: 'https://civicdb.org/events/genes/5/summary/variants/12/summary'
            //         }

            //     ]
            // }

            // //适应症
            // $rootScope.shortData = {
            //   data:[
            //     {cname:'Lung cancer',ename:'肺癌',disdetail:'肺癌是一种肺部的恶性肿瘤，特征为肺部组织中的细胞不受控制地生长。大多数始发于肺部的癌症发生于上皮组织细胞。肺癌主要分为小细胞肺癌（SCLC）和非小细胞肺癌（NSCLC）。可能暗示肺癌的症状包括呼吸道症状（咳嗽，咳血，气喘或气短），全身症状（体重减轻，发热，杵状指或疲乏无力），癌组织压迫临近组织所致的症状（胸痛、骨痛、上腔静脉阻塞、吞咽困难）。其中最常见的临床症状有咳嗽（包括咳血），体重减轻，气短和胸痛。大多数（80-90%）肺癌患者患病的原因为长期吸入烟草烟雾，然而大约10-15%的患者从不吸烟，这部分人患上肺癌往往是由于遗传因素和吸入空气污染物共同导致，污染物包括氡气、石棉或其它形式的空气污染，包括二手烟。和许多其它癌症类似，肺癌也始于原癌基因的激活或抑癌基因的灭活。致癌物导致能够诱发癌症发展的基因突变。原癌基因的突变导致10-30%的肺腺癌发生。编码表皮细胞生长因子受体（EGFR）的原癌基因突变，导致细胞增殖增加、凋亡抑制、血管生成和肿瘤侵袭。ALK基因重排发生于3%-7%的NSCLC，更多见于非吸烟的较年轻腺癌患者。表观遗传学的变化——如DNA甲基化，组织蛋白尾部修饰或小核糖核酸（微RNA）调控的改变可能会导致抑癌基因的灭活。其它经常发生突变或扩增的基因还有c-MET、NKX2-1、LKB1、PIK3CA和BRAF。肺癌在胸片或CT扫描中可见，并可通过支气管镜或CT引导下进行活检确诊。肺癌的治疗和长期疗效取决于类型、阶段（转移的程度）和患者的整体健康状况。常见的治疗手段包括手术、化疗、放疗、靶向治疗。I、II期和部分IIIA期（T3N1M0）的非小细胞肺癌（NSCLC）采取以手术为主的治疗，N2的IIIA期肺癌经新辅助治疗后能手术切除者可进行手术治疗，晚期或转移性非小细胞肺癌以化疗或靶向治疗为主。对于有EGFR外显子敏感突变的晚期非小细胞肺癌患者首选EGFR抑制剂治疗，携带有ALK融合基因的晚期非小细胞肺癌首选克唑替尼治疗。对于无驱动基因突变的晚期非小细胞肺癌患者，若PD-L1强表达，则可选用PD-1抑制剂进行一线治疗。小细胞肺癌（SCLC）通常对化疗和放疗的反应明显，局限期小细胞肺癌经化疗取得缓解者亦可进行手术治疗，随后再行化疗，而广泛期小细胞肺癌则以化疗为主。肺癌的手术术式以肺叶切除加肺门纵隔淋巴结清扫为首选术式。其他术式包括全肺切除术、肺局部切除术、扩大性肺切除术、气管支气管和（或）血管成型肺切除术。小细胞肺癌若不经治疗，中位生存期只有2到4个月，90%的患者在治疗2年内复发，5年的总生存率仅为5%到10%。局限期小细胞肺癌患者预后比广泛期患者的预后好，局限期的中位生存期为16-24个月，5年生存率为14%，而广泛期患者中位生存期为6-12个月，5年生存率不到1%。非小细胞肺癌患者预后不良的因素包括存在肺部症状、肿瘤直径>3CM、非鳞癌、多处淋巴结转移、脉管侵犯。不能进行手术的病人中身体状况差且体重下降超过10%者预后更差。',
            //   log:[
            //         {
            //           date : "2018-04-25 18:56:50",
            //           content : ",aaaaaa-->a",
            //           recorder : "张三",
            //           check : '孙悟空'
            //         }
            //       ],
            //       update:{cname:'Colorectal cancer',ename:'结直肠癌'},
            //       _id:123,
            //       infosource:'https://www.cancer.gov/types/lung'
            //     }

            //   ]
            // }

            // //免疫
            // $rootScope.shortData = {
            //     data: [{
            //             marker: 'MSI',
            //             markerdetail: '微卫星(Microsatellites)是遍布于人类基因组中的短串联重复序列。微卫星由于重复单位的插入或缺失而导致微卫星长度的改变，就叫做微卫星不稳定性(Microsatellite Instability， MSI)。大量研究表明， MSI 是由错配修复(MMR)基因功能缺失引起的， MSI 的状态与肿瘤的发生有密切关联。',
            //             markersign: 'MSI-H',
            //             tname: '纳武单抗 Nivolumab',
            //             cname: 'Opdivo',
            //             drugclinic: '',
            //             disease: '结直肠癌',
            //             sensibility: '敏感',
            //             note: 'FDA批准纳武单抗用于治疗既往接受过5-FU/奥沙利铂/伊立替康治疗后进展，微卫星不稳定性高(MSI-H)或错配基因修复缺失(dMMR)的转移性结直肠癌儿童或成人患者。NCCN指南(2017.V2，结肠癌；2017.V3，直肠癌)指出对既往12个月内曾行FOLFOX/CapeOx辅助化疗的异质性转移性结肠癌患者(仅 MSI-H/dMMR)可使用纳武单抗或派姆单抗进行治疗。',
            //             evsource: 'FDA Label（Nivolumab）；NCCN指南(2017.V2，结肠癌；2017.V3，直肠癌)',
            //             grade: 'Level 1',
            //             publishdate: '2017/08/01；2018/03/14',
            //             infosource: 'NCCN Clinical Practice Guidelines in Oncology_Colon Cancer(Version 2.2017)|||http://www.nccn.org/patients;NCCN Clinical Practice Guidelines in Oncology_Rectal Cancer(Version 3.2017)|||http://www.nccn.org/patients;OPDIVO® (nivolumab) injection, for intravenous use Initial U.S. Approval: 2014|||https://www.fda.gov ',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             update: {
            //                 marker: 'zsn',
            //                 markerdetail: '张苏纳',
            //                 markersign: 'zhangsuna',
            //                 tname: 'mutation',

            //                 infosource: 'http://baidu.com'
            //             },
            //             _id: 123
            //         }

            //     ]
            // }


            //  // 药物信息
            // $rootScope.shortData = {
            //     data: [{
            //             drugnumber: 'DB09330',
            //             tname: '奥希替尼 Osimertinib',
            //             pname: '泰瑞沙 Tagrisso',
            //             drugclinic: 'AZD9291',
            //             drugtype: '靶向药',
            //             drugaction: '奥斯替尼是第三代，不可逆的高选择性EGFR抑制剂，具有抗肿瘤活性。奥斯替尼选择性地与EGFR的突变体T790M共价结合，抑制其活性，从而阻止EGFR介导的信号通路，抑制肿瘤细胞生长，导致细胞死亡。',
            //             reaction: '腹泻、皮疹、皮肤干燥',
            //             FDAstate: 'FDA&CFDA',
            //             FDAdisease: 'NSCLC',
            //             factory: '阿斯利康',
            //             drugdesc: '奥希替尼是第三代的不可逆的高选择性EGFR抑制剂，具有抗肿瘤活性。奥斯替尼选择性地与EGFR的突变体T790M共价结合，抑制其活性，从而阻止EGFR介导的信号通路，抑制肿瘤细胞生长，导致细胞死亡。2015年11月3日，FDA加速批准奥斯替尼用于治疗EGFR阻断法治疗后疾病进展的T790M突变的患者。2017年3月30日，FDA常规批准奥斯替尼用于EGFR T790M突变阳性的，经EGFR TKI治疗中或治疗后疾病进展的转移性非小细胞肺癌患者。该药由阿斯利康生产，CFDA已批准其在中国大陆上市。',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             _id: 123,
            //             infosource: 'https://www.drugbank.ca/drugs/DB09330'
            //         },
            //         {
            //             drugnumber: 'DB09330',
            //             tname: '奥希替尼 Osimertinib',
            //             pname: '泰瑞沙 Tagrisso',
            //             drugclinic: 'AZD9291',
            //             drugtype: '靶向药',
            //             drugaction: '奥斯替尼是第三代，不可逆的高选择性EGFR抑制剂，具有抗肿瘤活性。奥斯替尼选择性地与EGFR的突变体T790M共价结合，抑制其活性，从而阻止EGFR介导的信号通路，抑制肿瘤细胞生长，导致细胞死亡。',
            //             reaction: '腹泻、皮疹、皮肤干燥',
            //             FDAstate: 'FDA&CFDA',
            //             FDAdisease: 'NSCLC',
            //             factory: '阿斯利康',
            //             drugdesc: '奥希替尼是第三代的不可逆的高选择性EGFR抑制剂，具有抗肿瘤活性。奥斯替尼选择性地与EGFR的突变体T790M共价结合，抑制其活性，从而阻止EGFR介导的信号通路，抑制肿瘤细胞生长，导致细胞死亡。2015年11月3日，FDA加速批准奥斯替尼用于治疗EGFR阻断法治疗后疾病进展的T790M突变的患者。2017年3月30日，FDA常规批准奥斯替尼用于EGFR T790M突变阳性的，经EGFR TKI治疗中或治疗后疾病进展的转移性非小细胞肺癌患者。该药由阿斯利康生产，CFDA已批准其在中国大陆上市。',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             _id: 124,
            //             infosource: 'https://www.drugbank.ca/drugs/DB09330',
            //             update: { drugnumber: 'DB12267', tname: '布加替尼 Brigatinib' }
            //         }

            //     ]
            // }

            // //靶向位点
            // $rootScope.shortData = {
            //     data: [{
            //             gennanme: 'BRAF',
            //             variation: '',
            //             exon: 'exon 15',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             update: { gennanme: 'zsn', exon: '张苏纳', tname: 'zhangsuna', sensibility: '可能敏感' },
            //             _id: 123,
            //             nucleotide: 'c.1799T>A',
            //             amino_acid: 'p.V600E',
            //             gengroup: 'Chr7:140453136 (on Assembly GRCh37)',
            //             tname: '达拉菲尼 Dabrafenib',
            //             pname: 'Tafinlar',
            //             drugclinic: 'GSK2118436',
            //             disease: '黑色素瘤',
            //             sensibility: '敏感',
            //             note: 'FDA批准达拉菲尼单药治疗携带BRAF V600E突变的不能手术切除的转移性黑色素瘤或联合曲美替尼用于治疗携带BRAF V600E或V600K突变的不能手术切除的转移性黑色素瘤。NCCN指南(2018.V2，黑色素瘤）推荐对于Ⅵ期的转移或不可手术切除的BRAF V600突变阳性的黑色素瘤患者一线、二线治疗可考虑使用达拉菲尼联合曲美替尼双靶向治疗（一线治疗为1类证据）。',
            //             evsource: 'FDA Label（Dabrafenib）；NCCN指南(2018.V1，黑色素瘤）',
            //             grade: 'Level 1',
            //             publishdate: '2013/05/29；2018/01/19',
            //             infosource: 'TAFINLAR® (dabrafenib) capsules, for oral use Initial U.S. Approval: 2013|||https://www.fda.gov;NCCN Clinical Practice Guidelines in Oncology_Melanoma(Version 1.2018)|||http://www.nccn.org/patients'
            //         },
            //         {
            //             gennanme: 'BRAF',
            //             variation: '',
            //             exon: 'exon 15',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             update: { gennanme: 'zsn', exon: '张苏纳', tname: 'zhangsuna', sensibility: '可能敏感' },
            //             _id: 124,
            //             nucleotide: 'c.1799T>A',
            //             amino_acid: 'p.V600E',
            //             gengroup: 'Chr7:140453136 (on Assembly GRCh37)',
            //             tname: '达拉菲尼 Dabrafenib',
            //             pname: 'Tafinlar',
            //             drugclinic: 'GSK2118436',
            //             disease: '黑色素瘤',
            //             sensibility: '敏感',
            //             note: 'FDA批准达拉菲尼单药治疗携带BRAF V600E突变的不能手术切除的转移性黑色素瘤或联合曲美替尼用于治疗携带BRAF V600E或V600K突变的不能手术切除的转移性黑色素瘤。NCCN指南(2018.V2，黑色素瘤）推荐对于Ⅵ期的转移或不可手术切除的BRAF V600突变阳性的黑色素瘤患者一线、二线治疗可考虑使用达拉菲尼联合曲美替尼双靶向治疗（一线治疗为1类证据）。',
            //             evsource: 'FDA Label（Dabrafenib）；NCCN指南(2018.V1，黑色素瘤）',
            //             grade: 'Level 1',
            //             publishdate: '2013/05/29；2018/01/19',
            //             infosource: 'TAFINLAR® (dabrafenib) capsules, for oral use Initial U.S. Approval: 2013|||https://www.fda.gov;NCCN Clinical Practice Guidelines in Oncology_Melanoma(Version 1.2018)|||http://www.nccn.org/patients'
            //         },
            //         {
            //             gennanme: 'BRAF',
            //             variation: '',
            //             exon: 'exon 15',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             update: { gennanme: 'zsn', exon: '张苏纳', tname: 'zhangsuna', sensibility: '可能敏感' },
            //             _id: 125,
            //             nucleotide: 'c.1799T>A',
            //             amino_acid: 'p.V600E',
            //             gengroup: 'Chr7:140453136 (on Assembly GRCh37)',
            //             tname: '达拉菲尼 Dabrafenib',
            //             pname: 'Tafinlar',
            //             drugclinic: 'GSK2118436',
            //             disease: '黑色素瘤',
            //             sensibility: '敏感',
            //             note: 'FDA批准达拉菲尼单药治疗携带BRAF V600E突变的不能手术切除的转移性黑色素瘤或联合曲美替尼用于治疗携带BRAF V600E或V600K突变的不能手术切除的转移性黑色素瘤。NCCN指南(2018.V2，黑色素瘤）推荐对于Ⅵ期的转移或不可手术切除的BRAF V600突变阳性的黑色素瘤患者一线、二线治疗可考虑使用达拉菲尼联合曲美替尼双靶向治疗（一线治疗为1类证据）。',
            //             evsource: 'FDA Label（Dabrafenib）；NCCN指南(2018.V1，黑色素瘤）',
            //             grade: 'Level 1',
            //             publishdate: '2013/05/29；2018/01/19',
            //             infosource: 'TAFINLAR® (dabrafenib) capsules, for oral use Initial U.S. Approval: 2013|||https://www.fda.gov;NCCN Clinical Practice Guidelines in Oncology_Melanoma(Version 1.2018)|||http://www.nccn.org/patients'
            //         },
            //         {
            //             gennanme: 'BRAF',
            //             variation: '',
            //             exon: 'exon 15',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             _id: 126,
            //             nucleotide: 'c.1799T>A',
            //             amino_acid: 'p.V600E',
            //             gengroup: 'Chr7:140453136 (on Assembly GRCh37)',
            //             tname: '达拉菲尼 Dabrafenib',
            //             pname: 'Tafinlar',
            //             drugclinic: 'GSK2118436',
            //             disease: '黑色素瘤',
            //             sensibility: '敏感',
            //             note: 'FDA批准达拉菲尼单药治疗携带BRAF V600E突变的不能手术切除的转移性黑色素瘤或联合曲美替尼用于治疗携带BRAF V600E或V600K突变的不能手术切除的转移性黑色素瘤。NCCN指南(2018.V2，黑色素瘤）推荐对于Ⅵ期的转移或不可手术切除的BRAF V600突变阳性的黑色素瘤患者一线、二线治疗可考虑使用达拉菲尼联合曲美替尼双靶向治疗（一线治疗为1类证据）。',
            //             evsource: 'FDA Label（Dabrafenib）；NCCN指南(2018.V1，黑色素瘤）',
            //             grade: 'Level 1',
            //             publishdate: '2013/05/29；2018/01/19',
            //             infosource: 'TAFINLAR® (dabrafenib) capsules, for oral use Initial U.S. Approval: 2013|||https://www.fda.gov;NCCN Clinical Practice Guidelines in Oncology_Melanoma(Version 1.2018)|||http://www.nccn.org/patients'
            //         }

            //     ]
            // }

            //化疗位点
            // $rootScope.shortData = {
            //     data: [{
            //             gennanme: 'UGT1A1',
            //             nucleotide: 'c.211G>A',
            //             amino_acid: 'p.G71R',
            //             gengroup: 'chr2:234668894 (on Assembly GRCh37)',
            //             rsnumber: 'rs4148323',
            //             genotype: 'AA+AG(*6/*6+*6/*1)',
            //             tname: '伊立替康 Irinotecan',
            //             pname: '',
            //             drugclinic: '',
            //             disease: '直肠癌',
            //             toxicity: '增加代谢毒性',
            //             dose: '降低剂量',
            //             metabolize: '减慢代谢',
            //             note: 'NCCN指南(2018.V1，直肠癌)中提到编码UGT1A1基因出现某种多态性可能导致伊立替康活性代谢产物的葡萄糖醛酸化水平降低，导致药物代谢减慢，药物积累，相关严重毒性风险增加，且伊立替康的剂量也与UGT1A1基因多态位点的基因型有关。但目前尚未建立相应的临床指南。ESMO指南(2016版，结直肠癌)提到UGT1A1多态性影响伊立替康的相关毒性，且伊立替康的剂量也与UGT1A1基因多态位点的基因型有关。',
            //             evsource: 'NCCN指南(2018.V1，直肠癌)；ESMO指南(2016版，结直肠癌)',
            //             grade: 'Level 2A',
            //             publishdate: '2018/3/14',
            //             infosource: 'NCCN Clinical Practice Guidelines in Oncology_Colon Cancer(Version 2.2017)|||http://www.nccn.org/patients;NCCN Clinical Practice Guidelines in Oncology_Rectal Cancer(Version 3.2017)|||http://www.nccn.org/patients',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             update: {
            //                 marker: 'zsn',
            //                 markerdetail: '张苏纳',
            //                 markersign: 'zhangsuna',
            //                 tname: 'mutation',

            //                 infosource: 'http://baidu.com'
            //             },
            //             _id: 123
            //         }

            //     ]
            // }


            //易感位点
            // $rootScope.shortData = {
            //     data: [{
            //             gennanme: 'UGT1A1',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             update: { gennanme: 'zsn', exon: '张苏纳', tname: 'zhangsuna', sensibility: '可能敏感' },
            //             _id: 123,
            //             nucleotide: 'c.1799T>A',
            //             amino_acid: 'p.G71R',
            //             gengroup: 'chr2:234668894 (on Assembly GRCh37)',
            //             rsnumber: 'rs4148323',
            //             genotype: 'AA+AG(*6/*6+*6/*1)',
            //             tname: '伊立替康 Irinotecan',
            //             pname: 'Tafinlar',
            //             drugclinic: 'GSK2118436',
            //             disease: '黑色素瘤',
            //             toxicity: '增加代谢毒性',
            //             dose: '降低剂量',
            //             metabolize: '减慢代谢',
            //             note: 'NCCN指南(2018.V1，直肠癌)中提到编码UGT1A1基因出现某种多态性可能导致伊立替康活性代谢产物的葡萄糖醛酸化水平降低，导致药物代谢减慢，药物积累，相关严重毒性风险增加，且伊立替康的剂量也与UGT1A1基因多态位点的基因型有关。但目前尚未建立相应的临床指南。ESMO指南(2016版，结直肠癌)提到UGT1A1多态性影响伊立替康的相关毒性，且伊立替康的剂量也与UGT1A1基因多态位点的基因型有关。',
            //             evsource: 'NCCN指南(2018.V1，直肠癌)；ESMO指南(2016版，结直肠癌)',
            //             grade: 'Level 1',
            //             publishdate: '2018/3/14',
            //             infosource: 'NCCN Clinical Practice Guidelines in Oncology_Colon Cancer(Version 2.2017)|||http://www.nccn.org/patients;NCCN Clinical Practice Guidelines in Oncology_Rectal Cancer(Version 3.2017)|||http://www.nccn.org/patients'
            //         },
            //         {
            //             gennanme: 'UGT1A1',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             update: { gennanme: 'zsn', exon: '张苏纳', tname: 'zhangsuna', sensibility: '可能敏感' },
            //             _id: 124,
            //             nucleotide: 'c.1799T>A',
            //             amino_acid: 'p.G71R',
            //             gengroup: 'chr2:234668894 (on Assembly GRCh37)',
            //             rsnumber: 'rs4148323',
            //             genotype: 'AA+AG(*6/*6+*6/*1)',
            //             tname: '伊立替康 Irinotecan',
            //             pname: 'Tafinlar',
            //             drugclinic: 'GSK2118436',
            //             disease: '黑色素瘤',
            //             toxicity: '增加代谢毒性',
            //             dose: '降低剂量',
            //             metabolize: '减慢代谢',
            //             note: 'NCCN指南(2018.V1，直肠癌)中提到编码UGT1A1基因出现某种多态性可能导致伊立替康活性代谢产物的葡萄糖醛酸化水平降低，导致药物代谢减慢，药物积累，相关严重毒性风险增加，且伊立替康的剂量也与UGT1A1基因多态位点的基因型有关。但目前尚未建立相应的临床指南。ESMO指南(2016版，结直肠癌)提到UGT1A1多态性影响伊立替康的相关毒性，且伊立替康的剂量也与UGT1A1基因多态位点的基因型有关。',
            //             evsource: 'NCCN指南(2018.V1，直肠癌)；ESMO指南(2016版，结直肠癌)',
            //             grade: 'Level 1',
            //             publishdate: '2018/3/14',
            //             infosource: 'NCCN Clinical Practice Guidelines in Oncology_Colon Cancer(Version 2.2017)|||http://www.nccn.org/patients;NCCN Clinical Practice Guidelines in Oncology_Rectal Cancer(Version 3.2017)|||http://www.nccn.org/patients'
            //         },
            //         {
            //             gennanme: 'UGT1A1',
            //             log: [{
            //                 date: "2018-04-25 18:56:50",
            //                 content: ",aaaaaa-->a",
            //                 recorder: "张三",
            //                 check: '孙悟空'
            //             }],
            //             update: { gennanme: 'zsn', exon: '张苏纳', tname: 'zhangsuna', sensibility: '可能敏感' },
            //             _id: 125,
            //             nucleotide: 'c.1799T>A',
            //             amino_acid: 'p.G71R',
            //             gengroup: 'chr2:234668894 (on Assembly GRCh37)',
            //             rsnumber: 'rs4148323',
            //             genotype: 'AA+AG(*6/*6+*6/*1)',
            //             tname: '伊立替康 Irinotecan',
            //             pname: 'Tafinlar',
            //             drugclinic: 'GSK2118436',
            //             disease: '黑色素瘤',
            //             toxicity: '增加代谢毒性',
            //             dose: '降低剂量',
            //             metabolize: '减慢代谢',
            //             note: 'NCCN指南(2018.V1，直肠癌)中提到编码UGT1A1基因出现某种多态性可能导致伊立替康活性代谢产物的葡萄糖醛酸化水平降低，导致药物代谢减慢，药物积累，相关严重毒性风险增加，且伊立替康的剂量也与UGT1A1基因多态位点的基因型有关。但目前尚未建立相应的临床指南。ESMO指南(2016版，结直肠癌)提到UGT1A1多态性影响伊立替康的相关毒性，且伊立替康的剂量也与UGT1A1基因多态位点的基因型有关。',
            //             evsource: 'NCCN指南(2018.V1，直肠癌)；ESMO指南(2016版，结直肠癌)',
            //             grade: 'Level 1',
            //             publishdate: '2018/3/14',
            //             infosource: 'NCCN Clinical Practice Guidelines in Oncology_Colon Cancer(Version 2.2017)|||http://www.nccn.org/patients;NCCN Clinical Practice Guidelines in Oncology_Rectal Cancer(Version 3.2017)|||http://www.nccn.org/patients'
            //         }


            //     ]
            // }




            //获取url
            var href = $location.url();
            // var baseUrl = 'http://192.168.1.139:8000/';
            var baseUrl = 'http://192.168.12.139:8000/';
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


            //禁用编辑功能
            $rootScope.isdisabled = true;

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