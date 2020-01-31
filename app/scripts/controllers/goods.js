'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:GoodsCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('GoodsCtrl', ['$scope', '$http', 'ApiService','$location','$routeParams', function ($scope, $http, apiService, $location,$routeParams) {
     $scope.hideFooter = true;
     $scope.selectHide0 = true;
     $scope.selectHide1 = true;
     $scope.selectDesc1 = "カテゴリー選択";
     $scope.selectContent1 = 0;
     $scope.selectHide2 = true;
     $scope.selectDesc2 = "価格帯を選択";
     $scope.selectContent2 = 0;
     $scope.searchInfo = {};
     $scope.searchTitle = "";
     $scope.hidePages = true;
     $scope.pageSize = 10;
     $scope.lastPage = '';
     $scope.nextPage = '';

     $scope.getData = function () {
       apiService.postCart(function onSuccess(resultList){
         $scope.resultsCart = resultList;
         if ($scope.resultsCart.count == 0) {
           $scope.expression = true;
         } else {
           $scope.expression = false;
         }
       }, function onError(message) {
       });

       if($scope.hasPerson == false){
         $location.path('/entry');
       }
       apiService.getGoodsList($scope.pageSize, $scope.pageSize * ($routeParams.page-1), function onSuccess(resultList) {
         $scope.hideFooter = false;
         $scope.results = resultList;

         var pageCount = $scope.results.count / $scope.pageSize;
         var totalPage = parseInt(pageCount);
          if(pageCount - totalPage > 0){
            totalPage ++;
          }
          if(totalPage == 0){
            totalPage = 1;
          }
         $scope.initPage(totalPage);
         if($routeParams.page > 1){
           $scope.lastPage = '/goods/'+ (parseInt($routeParams.page) - 1) + '/';
         }
         if($routeParams.page < totalPage){
           $scope.nextPage = '/goods/'+ (parseInt($routeParams.page) + 1) + '/';
         }
         // var pageCount = $scope.results.count / $scope.pageObject.pageSize;
         // var pCount = parseInt(pageCount);
         // if(pageCount - pCount > 0){
         //   pCount ++;
         // }
         // if(pCount == 0){
         //   pCount = 1;
         // }
         // $scope.pageObject.totalPage = pCount;
         // $scope.hidePages = false;
         // paginationService.updatePagination($scope, $scope.pageObject);
       }, function onError(message) {
         // ngDialog.open({
           // showClose: false,
           // template:'templateTip',
           // className: 'ngdialog-theme-default',
           // controller: ['$scope', function($scope) {
           //     $scope.content = message;
           // }]
         // });
       });
     }

     // $scope.pageObject = {
     //    currentPageList: [],
     //    currentPage: 1,
     //    totalPage: 0,
     //    pageSize: 10,
     //    pages:[],
     //    pagesId: 'pagesChange',
     //    updateFunc: $scope.getData
     // };

     $scope.shopCloseAllSelect = function () {
       $scope.selectHide0 = true;
       $scope.selectHide1 = true;
       $scope.selectHide2 = true;
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

     $scope.shopSelect2 = function () {
       $scope.selectHide2 = false;
       $scope.selectHide0 = false;
     }
     $scope.shopCloseSelect2 = function () {
       $scope.selectHide2 = true;
       $scope.selectHide0 = true;
     }
     $scope.shopSelectValue2 = function (desc,content) {
       $scope.selectDesc2 = desc;
       $scope.selectContent2 = content;
     }

     $scope.search = function () {
       $scope.searchInfo.title = $scope.searchTitle;
       if($scope.selectContent1 == 0){
        $scope.searchInfo.goodsType = '';
      }else{
        $scope.searchInfo.goodsType = $scope.selectContent1;
      }
       if ($scope.selectContent2 == 1) {
         $scope.searchInfo.price = '1000-2000';
       }else if ($scope.selectContent2 == 2) {
         $scope.searchInfo.price = '2000-5000';
       }else if ($scope.selectContent2 == 3) {
         $scope.searchInfo.price = '5000-10000';
       }else if ($scope.selectContent2 == 4) {
         $scope.searchInfo.price = '10000-20000';
       }else if ($scope.selectContent2 == 5) {
         $scope.searchInfo.price = '20000-30000';
       }else if ($scope.selectContent2 == 6) {
         $scope.searchInfo.price = '30000-50000';
       }else{
         $scope.searchInfo.price = '';
       }
       apiService.postGoodsSearch($scope.searchInfo, function onSuccess(result) {
         $scope.results.goodsList = result.goodsList;
         $scope.results.count = result.count;
       }, function onError(message) {

       });
     }

     $scope.initPage = function(totalPage){
       $('#pagesChange').children().remove();
       for(var i=0;i<totalPage;i++){
         var classStr = '';
         if(i+1 == $routeParams.page){
           classStr = ' class="checked"';
         }
         var htmlCode = '<a href="/goods/'+ (i + 1) + '/">' +
           '<li style="margin: 0 5px"'+classStr+'>'+(i+1)+'</li>' +
         '</a>';
         $('#pagesChange').append(htmlCode);
         $scope.hidePages = false;
       }
     }

     $scope.upPageClick = function(){
       if($scope.lastPage){
         $location.path($scope.lastPage);
       }
     }

     $scope.downPageClick = function(){
       if($scope.nextPage){
         $location.path($scope.nextPage);
       }
     }

     $scope.getData();
     $('html,body').animate({scrollTop:0}, 0);
   }]);
