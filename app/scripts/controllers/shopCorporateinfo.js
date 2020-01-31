'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ShopCorporateinfoCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('ShopCorporateinfoCtrl', ['$scope', '$http', 'ApiService','ngDialog','$routeParams', function ($scope, $http, apiService,ngDialog,$routeParams) {
     $scope.hideFooter = true;
     $scope.selectHide0 = true;
     $scope.selectHide1 = true;
     $scope.selectDesc1 = "ジャンル選択";
     $scope.selectContent1 = 0;
     $scope.selectHide2 = true;
     $scope.selectDesc2 = "エリアを選択";
     $scope.selectContent2 = '';
     $scope.selectHide3 = true;
     $scope.selectDesc3 = "ジャンルから探す";
     $scope.selectContent3 = 0;
     $scope.shopSearchR = {};
     $scope.shopSearch ={};
     $scope.area='';
     $scope.shopSearch.area = [];
     $scope.shopSearch.areaModel = [];
     $scope.shopNow4 = 0;
     $scope.shopNow5 = 0;
     $scope.shopSearch.mainMenu = '0';
     $scope.shopSearchR.keyWord = '';
     $scope.shopSearchR.mainMenu = '0';
     $scope.shopSearch.now4 = '';
     $scope.shopSearch.now5 = '';
     $scope.hideMoerCheckBox = true;
     $scope.MoreCheckBox = false;
     $scope.hidePages = true;
     $scope.pageSize = 10;
     $scope.lastPage = '';
     $scope.nextPage = '';

     // Get data from http
     $scope.getData = function () {
       if($scope.hasPerson == false){
         $location.path('/entry');
       }

         apiService.getShopCorporateinfoList($routeParams.type,$scope.pageSize, $scope.pageSize * ($routeParams.page-1), function onSuccess(resultList) {
           $scope.hideFooter = false;
           $scope.results = resultList;
           var pageCount = $scope.results[0].shopCount / $scope.pageSize;
           var totalPage = parseInt(pageCount);
            if(pageCount - totalPage > 0){
              totalPage ++;
            }
            if(totalPage == 0){
              totalPage = 1;
            }
           $scope.initPage(totalPage);
           if($routeParams.page > 1){
             $scope.lastPage = '/corporateinfo/' + $routeParams.type + '/' + (parseInt($routeParams.page) - 1) + '/';
           }
           if($routeParams.page < totalPage){
             $scope.nextPage = '/corporateinfo/' + $routeParams.type + '/' + (parseInt($routeParams.page) + 1) + '/';
           }

           // var pageCount = $scope.results[0].shopCount / $scope.pageObject.pageSize;
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

     $scope.pageObject = {
        currentPageList: [],
        currentPage: 1,
        totalPage: 0,
        pageSize: 10,
        pages:[],
        pagesId: 'pagesChange',
        updateFunc: $scope.getData
     };

     $scope.appearMoerCheckBox = function () {
       $scope.MoreCheckBox = true;
       $scope.hideMoerCheckBox = false;
     }

     $scope.moerCheckBoxHide = function () {
       $scope.MoreCheckBox = false;
       $scope.hideMoerCheckBox = true;
     }

     $scope.shopCloseAllSelect = function () {
       $scope.selectHide0 = true;
       $scope.selectHide1 = true;
       $scope.selectHide2 = true;
       $scope.selectHide3 = true;
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

     $scope.shopSelect3 = function () {
       $scope.selectHide3 = false;
       $scope.selectHide0 = false;
     }
     $scope.shopCloseSelect3 = function () {
       $scope.selectHide3 = true;
       $scope.selectHide0 = true;
     }
     $scope.shopSelectValue3 = function (desc,content) {
       $scope.selectDesc3 = desc;
       $scope.selectContent3 = content;
     }
     $scope.changeNow4 = function (shopSearch) {
       if($scope.shopNow4 == undefined||$scope.shopNow4 == 1){
         $scope.shopNow4 = 0;
       }else{
         $scope.shopNow4 = 1;
       }
     }
     $scope.changeNow5 = function (shopSearch) {
       if($scope.shopNow5 == undefined||$scope.shopNow5 == 1){
         $scope.shopNow5 = 0;
       }else{
         $scope.shopNow5 = 1;
       }
     }
     $scope.search = function (shopSearch) {
       $scope.pageObject.updateFunc= $scope.search;
       $scope.shopSearch.now4 = $scope.shopNow4;
       $scope.shopSearch.now5 = $scope.shopNow5;
       $scope.shopSearch.mainMenu = $scope.selectContent3;

       $scope.shopSearch.area = [];
       for(var index in shopSearch.areaModel){
         if(shopSearch.areaModel[index] == true){
           $scope.shopSearch.area[index++] = index ;
         }
       }
       $scope.shopSearch.limit = $scope.pageObject.pageSize;
       $scope.shopSearch.offset = $scope.pageObject.pageSize * ($scope.pageObject.currentPage-1);
       apiService.postInfoSearch(shopSearch,function onSuccess(result) {
         $scope.results[0].contentList = result.contentList;
         $scope.results[0].shopCount = result.shopCount;
         $scope.area = result.area;
         var pageCount = $scope.results[0].shopCount / $scope.pageObject.pageSize;
         var pCount = parseInt(pageCount);
         if(pageCount - pCount > 0){
           pCount ++;
         }
         if(pCount == 0){
           pCount = 1;
         }
         $scope.pageObject.totalPage = pCount;
         paginationService.updatePagination($scope, $scope.pageObject);
       }, function onError(message) {
       });
     }


     $scope.searchR = function () {
        $scope.pageObject.updateFunc= $scope.searchR;
       $scope.shopSearchR.keyWord = $scope.shopSearchR.keyWord;
       $scope.shopSearchR.mainMenu = $scope.selectContent1;
       $scope.shopSearchR.area = $scope.selectContent2;
       $scope.shopSearchR.limit = $scope.pageObject.pageSize;
       $scope.shopSearchR.offset = $scope.pageObject.pageSize * ($scope.pageObject.currentPage-1);
       apiService.postInfoSearch($scope.shopSearchR,function onSuccess(result) {
         $scope.results[0].contentList = result.contentList;
         $scope.results[0].shopCount = result.shopCount;
         $scope.area = result.area;
         var pageCount = $scope.results[0].shopCount / $scope.pageObject.pageSize;
         var pCount = parseInt(pageCount);
         if(pageCount - pCount > 0){
           pCount ++;
         }
         if(pCount == 0){
           pCount = 1;
         }
         $scope.pageObject.totalPage = pCount;
         paginationService.updatePagination($scope, $scope.pageObject);
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
         var htmlCode = '<a href="/shop/corporateinfo/list/'+$routeParams.type+'/'+ (i + 1) + '/">' +
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
