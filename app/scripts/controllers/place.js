'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:PlaceCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('PlaceCtrl', ['$scope', '$http', 'ApiService','$location','ngDialog','$sce','$routeParams', function ($scope, $http, apiService,$location,ngDialog,$sce,$routeParams) {
     $scope.hideFooter = true;
     $scope.area = 0;
     $scope.location = 'エリアを選択';
     $scope.selectHide0 = true;
     $scope.selectHide2 = true;
     $scope.selectHide1 = true;
     $scope.selectDesc1 = "エリアを選択";
     $scope.selectContent1 = 0;
     $scope.hidePages = true;

     $scope.pageSize = 9;
     $scope.lastPage = '';
     $scope.nextPage = '';

     // Get data from http
     $scope.getData = function () {
       if($scope.hasPerson == false){
         $location.path('/entry');
       }
       apiService.getPlaceList($scope.area, $scope.pageSize,  $scope.pageSize * ($routeParams.page-1), function onSuccess(resultList) {
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
           $scope.lastPage = '/place/' + (parseInt($routeParams.page) - 1) + '/';
         }
         if($routeParams.page < totalPage){
           $scope.nextPage = '/place/' + (parseInt($routeParams.page) + 1) + '/';
         }
         //alert($scope.results[0].flicUrl);
         // $scope.flicUrl = $sce.trustAsResourceUrl($scope.results.placeList[0].flicUrl);
         // $scope.flicUrl = $scope.results[0].flicUrl;
         // alert($scope.flicUrl);


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
       pageSize: 9,
       pages:[],
       pagesId: 'pagesChange',
       updateFunc: $scope.getData
     };

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
     $scope.shopSelectValue1 = function (location,area) {
       $scope.area = area;
       $scope.getData();
       $scope.selectDesc1 = location;
       if( $scope.selectDesc1=="エリアを選択"){
         $scope.selectHide2 = true;
       }else{
         $scope.selectHide2 = false;
       }
     }

     $scope.initPage = function(totalPage){
       $('#pagesChange').children().remove();
       for(var i=0;i<totalPage;i++){
         var classStr = '';
         if(i+1 == $routeParams.page){
           classStr = ' class="checked"';
         }
         var htmlCode = '<a href="/place/'+ (i + 1) + '/">' +
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
