'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:FreePaperCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('FreePaperCtrl', ['$scope', '$http','ApiService', '$location','$routeParams', 'ngDialog', '$timeout','$compile',function ($scope, $http, apiService,$location, $routeParams,ngDialog, $timeout,$compile) {
     $scope.hideFooter = true;
     $scope.point = {};
     $scope.uuid = '';
     $scope.hidePages = true;
     $scope.pageSize = 12;
     $scope.lastPage = '';
     $scope.nextPage = '';

       $scope.getData = function () {
         if($scope.hasPerson == false){
           $location.path('/entry');
         }
         apiService.getFreePaperList($scope.pageSize, $scope.pageSize * ($routeParams.page-1), function onSuccess(resultList) {
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
             $scope.lastPage = '/freePaper/'+ (parseInt($routeParams.page) - 1) + '/';
           }
           if($routeParams.page < totalPage){
             $scope.nextPage = '/freePaper/'+ (parseInt($routeParams.page) + 1) + '/';
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
           $timeout(function() {
             $scope.loadScript();
           }, 500);
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

      // $scope.pageObject = {
      //       currentPageList: [],
      //       currentPage: 1,
      //       totalPage: 0,
      //       pageSize: 12,
      //       pages:[],
      //       pagesId: 'pagesChange',
      //       updateFunc: $scope.getData
      // };

       $scope.getDetail = function (uuid) {
         if($scope.uuid != uuid && $scope.uuid == ''){
         $scope.uuid = uuid;
         apiService.getFreePaperDetail(uuid, function onSuccess(resultList) {
           if(resultList.length > 0){
             $('#gallery').remove();
               $('#fpAdvertisement').remove();
             var mediaList = [];
             if(resultList.length > 1){
               for(var index in resultList){
                 if(index > 0){
                     mediaList.push(new Array(resultList[index].picUrl));
                 }
               }
             }
             var htmlStr = '<div class="dowebok"><div id="gallery" style="display:none;"><a href="'+resultList[0].picUrl+'"></a></div></div>';
             $('body').append(htmlStr);
             $('#gallery').responsivegallery({
          		media: mediaList,
              itemtype: 1
          	});
            $('#gallery').click();
            // var htmlStr = '<div id="fpAdvertisement" style="background-color: rgb(0,0,0,0.5);height: 100vh;width: 100vw;overflow:hidden; position: fixed; bottom:1%;left:0;z-index: 9000;">\n'
            // htmlStr += '<div align="center"><div id="ad" class="ad" style="margin: 20vh auto;position: relative;">\n';
            // $timeout(function() {
            //   var htmlStr1 = '<div class="closead" ng-click="delAdvertisement()" align="right"><a style="color:white;cursor: pointer;">SKIP >>></a></div>'
            //   $('#ad').append(htmlStr1);
            //   $compile($('#ad').contents())($scope);
            // }, 3500);
            // $timeout(function() {
            //   $scope.loadScript();
            // }, 500);
            // htmlStr += '</div></div></div>\n'
            // $('body').append(htmlStr);
            //$compile($('#galleryinner').contents())($scope);
            $scope.uuid = '';
          }
        }, function onError(message) {

        });
        }
     }

      $scope.delAdvertisement = function (){
       	document.getElementById("fpAdvertisement").remove();
     }

     $scope.closefp = function (){
       document.getElementById("responsivegallery").remove();
       //$scope.PointAD(58);
    }

     $scope.PointAD = function(id){
           $scope.point.itemId = id;
           $scope.point.coin = 1;
           apiService.postPointAD($scope.point, function onSuccess(result) {
             ngDialog.open({
               showClose: false,
               template:'templateTip',
               className: 'ngdialog-theme-default',
               controller: ['$scope', function($scope) {
                   $scope.content = 'FREE PAPER 閲覧１ポイントを獲得しました！';
               }]
             });
         }, function onError(message) {

         });
     }

     $scope.loadScript = function () {
       var script=document.createElement("script");
       script.type="text/javascript";
       script.src="//ad-api-v01.uliza.jp/player.php?player_type=1&campaign=1841&pc_width=600";
       document.getElementById("ad").appendChild(script);
      }

     if($routeParams.uuid){
       $scope.getDetail($routeParams.uuid);
     }

     $scope.addMyPage = function(index){
           $scope.addMyPage.favId = $scope.results.fpjpList[index].id;
           $scope.addMyPage.type = 16;
           apiService.postAddMyPage($scope.addMyPage, function onSuccess(result) {
             $scope.results.fpjpList[index].favorite = true;
         }, function onError(message) {
           ngDialog.open({
             showClose: false,
             template:'templateTip',
             className: 'ngdialog-theme-default',
             controller: ['$scope', function($scope) {
                 $scope.content = 'お気に入りに登録済みです。';
             }]
           });
         });
     }

     $scope.RemoveMyPage = function(index){
           $scope.addMyPage.favId = $scope.results.fpjpList[index].id;
           $scope.addMyPage.type = 16;
           apiService.postRemoveMyPage($scope.addMyPage, function onSuccess(result) {
               $scope.results.fpjpList[index].favorite = false;
         }, function onError(message) {
           ngDialog.open({
             showClose: false,
             template:'templateTip',
             className: 'ngdialog-theme-default',
             controller: ['$scope', function($scope) {
                 $scope.content = 'お気に入りに登録済みです。';
             }]
           });
         });
     }

     $scope.initPage = function(totalPage){
       $('#pagesChange').children().remove();
       for(var i=0;i<totalPage;i++){
         var classStr = '';
         if(i+1 == $routeParams.page){
           classStr = ' class="checked"';
         }
         var htmlCode = '<a href="/freePaper/'+ (i + 1) + '/">' +
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
