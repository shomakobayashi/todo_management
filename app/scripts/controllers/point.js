'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:PointCtrl
 * @description
 * # MyPageCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('PointCtrl', ['$scope', '$location', '$window', 'ApiService','ngDialog','PaginationService',function ($scope, $location, $window, apiService, ngDialog, paginationService) {
     $scope.formData = {};
     $scope.notifyList = {};
     $scope.form = {};
     $scope.thumbnailUrlHide= true;
     $scope.hideFooter = true;
     $scope.hidePages = true;

     $scope.getData = function () {
       apiService.getPointList($scope.pageObject.pageSize, $scope.pageObject.pageSize * ($scope.pageObject.currentPage-1),function onSuccess(resultList) {
         $scope.hideFooter = false;
         $scope.results = resultList;
         var pageCount = $scope.results.cionListCount / $scope.pageObject.pageSize;
         var pCount = parseInt(pageCount);
         if(pageCount - pCount > 0){
           pCount ++;
         }
         if(pCount == 0){
           pCount = 1;
         }
         $scope.pageObject.totalPage = pCount;
         $scope.hidePages = false;
         paginationService.updatePagination($scope, $scope.pageObject);
       }, function onError(message) {

       });
     }

     $scope.pageObject = {
        currentPageList: [],
        currentPage: 1,
        totalPage: 0,
        pageSize: 20,
        pages:[],
        pagesId: 'pagesChange',
        updateFunc: $scope.getData
     };

     $scope.getPersonInfo = function(){
       apiService.getPerson(function onSuccess(result) {
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

     /*$scope.getData();*/
     $scope.getPersonInfo();
     $scope.getData();
     $('html,body').animate({scrollTop:0}, 0);
  }]);
