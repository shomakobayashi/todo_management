'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:PurchaseHistoryCtrl
 * @description
 * # MyPageCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('PurchaseHistoryCtrl', ['$scope', '$location', '$window', 'ApiService','ngDialog', '$routeParams',function ($scope, $location, $window, apiService,ngDialog,$routeParams) {
     $scope.hideFooter = true;
     $scope.formData = {};
     $scope.thumbnailUrlHide= true;
     $scope.pageSize = 10;
     $scope.lastPage = '';
     $scope.nextPage = '';

     // Get data from http
     $scope.getData = function () {

      apiService.getPurchaseHistory(function onSuccess(resultList) {
         $scope.results = resultList;
       }, function onError(message) {

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
         $scope.hideFooter = false;
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


     $scope.getPersonInfo();
     $scope.getData();
     $('html,body').animate({scrollTop:0}, 0);
  }]);
