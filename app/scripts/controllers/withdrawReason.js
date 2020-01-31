'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:WithdrawReasonCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('WithdrawReasonCtrl', ['$scope', '$http', 'ApiService', '$window', '$location','ngDialog',function ($scope, $http, apiService, $window, $location,ngDialog) {
     $scope.hideFooter = false;

     $scope.selectHide0 = true;
     $scope.selectHide1 = true;
     $scope.selectDesc1 = "選択してください";
     $scope.selectContent1 = 0;

     $scope.data = {reason:'0'};

     $scope.shopCloseAllSelect = function () {
       $scope.selectHide0 = true;
       $scope.selectHide1 = true;
     }

     $scope.shopSelect1 = function () {
       $scope.selectHide1 = false;
       $scope.selectHide0 = false;
     }
     $scope.shopCloseSelect1 = function () {
       $scope.selectHide1 = true;
       $scope.selectHide0 = true;
     }
     $scope.shopSelectValue1 = function (desc,content) {
       $scope.selectDesc1 = desc;
       $scope.selectContent1 = content;
     }

     $scope.withdrawEnd = function(){
       if($scope.selectContent1 == 0){
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = '理由選択してください';
           }]
         });
         return;
       }else{
         $scope.data.reason = $scope.selectContent1;
       }

       if(!$scope.data.detail ){
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = '内容を入力ください';
           }]
         });
         return;
       }
       apiService.postWithdraw($scope.data, function onSuccess(result) {
         $location.path('/withdrawEnd');
       }, function onError(message, statusCode, statusList) {

      });
     }

     $scope.goTop = function(){
         $location.path('/');
     }

     $('html,body').animate({scrollTop:0}, 0);
   }]);
