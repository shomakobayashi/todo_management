'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ApplicationConfirmCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('ApplicationConfirmCtrl', ['$scope', '$http', 'ApiService', '$window','$location','ngDialog', function ($scope, $http, apiService, $window, $location,ngDialog) {
     $scope.hideFooter = false;
     $scope.event={};
     $scope.TransferString = function (content){
          var string = content;
          try{
              string=string.replace(/\r\n/g,"<br/>");
              string=string.replace(/\n/g,"<br/>");
          }catch(e) {

          }
          return string;
      }
     var newsDetailInfoStr = $window.localStorage['newsDetailInfo'];
     if(newsDetailInfoStr){
       $scope.result = JSON.parse(newsDetailInfoStr);
       $scope.result2 = JSON.parse(newsDetailInfoStr);
       //$scope.result[0].detail = $scope.TransferString($scope.result[0].detail);
     }else{
       $location.path('/');
     }
     var reportDetailInfoStr = $window.localStorage['reportDetailInfo'];
     if(reportDetailInfoStr){
       $scope.result = JSON.parse(reportDetailInfoStr);
       $scope.result2 = JSON.parse(reprotDetailInfoStr);
       //$scope.result[0].detail = $scope.TransferString($scope.result[0].detail);
     }else{
       $location.path('/');
     }
     $scope.onApplication = function(){
       $scope.event.newsId = $scope.result2[0].newsId;
       $scope.event.reportId = $scope.result2[0].reportId;
       $scope.event.title = $scope.result2[0].title;
       $scope.event.contents = $scope.result2[0].detail;
       apiService.postApplication($scope.event, function onSuccess(resultList){
         $location.path('/applicationOver');
        }, function onError(message, statusCode, statusList) {
          if(statusCode == statusList.USER_ID_INVALID){
            message = '既に応募済みです。';
          }
          ngDialog.open({
            showClose: false,
            template:'templateTip',
            className: 'ngdialog-theme-default',
            controller: ['$scope', function($scope) {
                $scope.content = message;
            }]
          });
        });
     }

     $('html,body').animate({scrollTop:0}, 0);
   }]);
