'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:NewsCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('NewsCtrl', ['$scope', '$http', 'ApiService','$location','$routeParams', function ($scope, $http, apiService, $location, $routeParams) {
     $scope.hideFooter = true;
     $scope.typeValue = "";
     $scope.menuHide = true;
     $scope.hidePages = true;
     $scope.pageSize = 10;
     $scope.lastPage = '';
     $scope.nextPage = '';

     // Get data from http
     $scope.getData = function () {
       if($scope.hasPerson == false){
         $location.path('/entry');
       }
       if($routeParams.type){
       apiService.getNewsList($routeParams.type,$scope.pageSize, $scope.pageSize * ($routeParams.page-1), function onSuccess(resultList) {
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
           $scope.lastPage = '/news/' + $routeParams.type + '/' + (parseInt($routeParams.page) - 1) + '/';
         }
         if($routeParams.page < totalPage){
           $scope.nextPage = '/news/' + $routeParams.type + '/' + (parseInt($routeParams.page) + 1) + '/';
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
         $('html,body').animate({scrollTop:0}, 0);
       })
      }
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

     $scope.menuClick = function(){
       $scope.menuHide = false;
     }
     $scope.menuClick2 = function(){
       $scope.menuHide = true;
     }
     if($routeParams.type == 0){
       $scope.typeValue = "ALL";
     }else if($routeParams.type == 2){
       $scope.typeValue = "MOVEUP";
     }else if($routeParams.type == 1){
       $scope.typeValue = "EVENT";
     }else if($routeParams.type == 3){
       $scope.typeValue = "NEWS";
     }else if($routeParams.type == 4){
       $scope.typeValue = "EVENT";
     }

     $scope.initPage = function(totalPage){
       $('#pagesChange').children().remove();
       for(var i=0;i<totalPage;i++){
         var classStr = '';
         if(i+1 == $routeParams.page){
           classStr = ' class="checked"';
         }
         var htmlCode = '<a href="/news/'+$routeParams.type+'/'+ (i + 1) + '/">' +
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
