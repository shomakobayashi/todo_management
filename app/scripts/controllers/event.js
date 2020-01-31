'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:RiseCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('EventCtrl', ['$scope', '$http','ApiService', '$location', '$routeParams' ,function ($scope, $http, apiService,$location,$routeParams) {
      $scope.hideFooter = true;
       $scope.yearValue = "";
       $scope.menuHide = true;
       $scope.hidePages = true;
       $scope.pageSize = 10;
       $scope.lastPage = '';
       $scope.nextPage = '';

       // Get data from http
       $scope.getData = function () {
         if($routeParams.year){
         apiService.getEventList($routeParams.year,$scope.pageSize, $scope.pageSize * ($routeParams.page-1), function onSuccess(resultList) {
           if($scope.hasPerson == false){
             $location.path('/entry');
           }
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
             $scope.lastPage = '/event/' + $routeParams.year + '/' + (parseInt($routeParams.page) - 1) + '/';
           }
           if($routeParams.page < totalPage){
             $scope.nextPage = '/event/' + $routeParams.year + '/' + (parseInt($routeParams.page) + 1) + '/';
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

       if($routeParams.year == 0){
         $scope.yearValue = "ALL";
       }else if($routeParams.year == 2018){
         $scope.yearValue = "2018";
       }else if($routeParams.year == 2017){
         $scope.yearValue = "2017";
       }else if($routeParams.year == 2016){
         $scope.yearValue = "2016";
       }else if($routeParams.year == 2015){
         $scope.yearValue = "2015";
       }else if($routeParams.year == 2014){
         $scope.yearValue = "2014";
       }else if($routeParams.year == 2013){
         $scope.yearValue = "2013";
       }

       $scope.initPage = function(totalPage){
         $('#pagesChange').children().remove();
         for(var i=0;i<totalPage;i++){
           var classStr = '';
           if(i+1 == $routeParams.page){
             classStr = ' class="checked"';
           }
           var htmlCode = '<a href="/event/'+$routeParams.year+'/'+ (i + 1) + '/">' +
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
