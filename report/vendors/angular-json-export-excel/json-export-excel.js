(function () {
    'use strict';

    angular.module('ngJsonExportExcel', [])
        .directive('ngJsonExportExcel', function () {
            return {
                restrict: 'AE',
                scope: {
                    url:'=',
                    filename: '=?',
                    separator: '@'
                },
                link: function (scope, element) {
                    $.ajax({
                        method:'post',
                        url:scope.url,
                        async:true,
                        success:function(response){
                            scope.filename = !!scope.filename ? scope.filename : 'export-excel';
                            var fields = [];
                            var header = [];
                            var separator = scope.separator || ',';
                            var arr = JSON.parse(response);
                            angular.forEach(arr[0], function(value, key) {
                                fields.push(key);
                                header.push(key);
                            });
                            element.bind('click', function() {
                                    var bodyData = _bodyData();
                                    var strData = _convertToExcel(bodyData);

                                    var blob = new Blob([strData], {type: "text/plain;charset=utf-8"});

                                    return saveAs(blob, [scope.filename + '.csv']);
                                });

                                function _bodyData() {
                                    var data = arr;
                                    var body = "";
                                    angular.forEach(data, function(dataItem) {
                                        var rowItems = [];

                                        angular.forEach(fields, function(field) {
                                            if(field.indexOf('.')) {
                                                field = field.split(".");
                                                var curItem = dataItem;

                                                // deep access to obect property
                                                angular.forEach(field, function(prop){
                                                    if (curItem !== null && curItem !== undefined) {
                                                        curItem = curItem[prop];
                                                    }
                                                });

                                                data = curItem;
                                            }
                                            else {
                                                data = dataItem[field];
                                            }

                                            var fieldValue = data !== null ? data : ' ';

                                            if (fieldValue !== undefined && angular.isObject(fieldValue)) {
                                                fieldValue = _objectToString(fieldValue);
                                            }

                                            if(typeof fieldValue == 'string') {
                                                rowItems.push('"' + fieldValue.replace(/"/g, '""') + '"');
                                            } else {
                                                rowItems.push(fieldValue);
                                            }
                                        });

                                        body += rowItems.join(separator) + '\n';
                                    });

                                    return body;
                                }

                                function _convertToExcel(body) {
                                    return header.join(separator) + '\n' + body;
                                }

                                function _objectToString(object) {
                                    var output = '';
                                    angular.forEach(object, function(value, key) {
                                        output += key + ':' + value + ' ';
                                    });

                                    return '"' + output + '"';
                                }
                        },
                        error:function(){}
                    })


                }
            };
        });
})();