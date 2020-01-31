'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:MyPageNotifyCtrl
 * @description
 * # MyPageCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('SettingsCtrl', ['$scope', '$location', '$window', 'ApiService','ngDialog','PaginationService',function ($scope, $location, $window, apiService,ngDialog, paginationService) {
     $scope.formData = {};
     $scope.notifyList = {};
     $scope.form = {};
     $scope.thumbnailUrlHide= true;
     $scope.hideFooter = true;

     $scope.getData = function () {
       if($scope.hasPerson == false){
         $location.path('/entry');
       }
       apiService.getSettings( function onSuccess(resultList) {
         $scope.hideFooter = false;
         // debugger;
         $scope.results = resultList;
         // alert("aaa");
         //  debugger;
         // alert($scope.results.settingKey);
         // alert($scope.results.settingEventKey);
         // debugger;


        }, function onError(message) {
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = 'データの取得に失敗しました。';
           }]
         });
       })
     }

     $scope.getPersonInfo = function(){
       apiService.getPerson(function onSuccess(result) {
         $scope.hideFooter = false;
         $scope.formData.nickname = result.nickname;
         $scope.formData.coin = result.coin;
         if(result.thumbnailUrl){
           $scope.thumbnailUrl = result.thumbnailUrl
         }else{
           $scope.thumbnailUrl = 'images/thumbnail.png';
         }
         $scope.thumbnailUrlHide= false;
         if(result.loginType && result.loginType == 3){
           $scope.resetHide = false;
         }
       }, function onError(message) {
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = 'データの取得に失敗しました。';
           }]
         });
       });
     }

     $scope.sett = function (settingKey,settingValue) {
       if($scope.hasPerson == false){
         $location.path('/entry');
       }
       apiService.getSettingsNotify(settingKey,settingValue,function onSuccess(resultList) {
         $scope.results = resultList;

        }, function onError(message) {
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = 'データの取得に失敗しました。';
           }]
         });
       })
     }


     $scope.getData();
     $scope.getPersonInfo();
     $('html,body').animate({scrollTop:0}, 0);
  }]);
