# mrsnail

主页地址：https://cloud.mrsnail.work/AngularJS-Demo/index.html#/

一、AngularJS-Demo

结合AngularJS写得一个小Demo，了解一下angularjs基本运用方式以及相关路由信息。
~~~~  js
 myApp.controller("myCtrl", ["$scope", function ($scope) {
        // data
        $scope.t_img = t_img;
        $scope.navs = navs;
        $scope._index = 0;
        // methods
        $scope.toPatch = function (_ids) {
            $scope._index = _ids;
        };
    }])
    myApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: './tpl/txt_one.html'})
            .when('/two', {templateUrl: './tpl/txt_two.html'})
            .otherwise({redirectTo: '/'});
    }]);
~~~~
二、Quasar打包展示


 在zy-sketch项目里运行"build": "quasar build -t mat"指令即可得到如下打包文件。
~~~~
 spa-mat-
        |-css 
        |-fonts
        |-js
        |-statics
        |-index.html
~~~~        
