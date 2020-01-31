'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:NewsDetailCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('NewsDetailCtrl', ['$scope', '$http', 'ApiService', '$window', '$location','$routeParams','ngDialog', '$timeout',function ($scope, $http, apiService, $window, $location,$routeParams,ngDialog,$timeout) {
     $scope.hideFooter = false;
     $scope.applicationHide = false;
     $scope.type='';
     $scope.entryType='';
     if($routeParams.uuid){
       $scope.hideFooter = true;
      apiService.getNewsDetail($routeParams.uuid, function onSuccess(resultList){
        $scope.hideFooter = false;
         $scope.results = resultList;
         $scope.results2 = resultList;
         //$scope.results[0].detail = $scope.TransferString($scope.results[0].detail);
         $scope.type = $scope.results[0].type;
         $scope.entryType = $scope.results[0].entry;
         if($scope.type == 1 && $scope.entryType == '1'){
            $scope.applicationHide = false;
         }else if($scope.type == 2 && $scope.entryType == '1'){
            $scope.applicationHide = false;
         }else{
           $scope.applicationHide = true;
         }
         // if(type == 3){
         //   $scope.applicationHide = true;
         // }

         $timeout(function() {
           $scope.loadScript();
         }, 500);

       }, function onError(message, statusCode, statusList) {
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = '操作が失敗しました。しばらくしてからもう一度お試しください。';
           }]
         });
       });
     }

     $scope.TransferString = function (content){
          var string = content;
          try{
              string=string.replace(/\r\n/g,"<br/>");
              string=string.replace(/\n/g,"<br/>");
          }catch(e) {

          }
          return string;
      }

      $scope.loadScript = function () {
        var script=document.createElement("script");
        script.type="text/javascript";
        script.src="//ad-api-v01.uliza.jp/player.php?player_type=1&campaign=1841&pc_width=600";
        document.getElementById("ad").appendChild(script);
       }

     $scope.onApplication = function(){
       $window.localStorage['newsDetailInfo'] = JSON.stringify($scope.results2);
       $location.path('/profile');
     }
     $('html,body').animate({scrollTop:0}, 0);
   }]);
