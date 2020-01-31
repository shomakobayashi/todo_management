'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:MyPageCtrl
 * @description
 * # MyPageCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('MyPageCtrl', ['$scope', '$location', '$window', 'ApiService','ngDialog', '$routeParams',function ($scope, $location, $window, apiService,ngDialog,$routeParams) {
     $scope.hideFooter = true;
     $scope.hidePages = true;
     $scope.resetHide = true;
     $scope.thumbnailUrlHide= true;
     /*$scope.mypageMoreHide = true;*/
     $scope.formData = {};
     $scope.notifyList = {};
     $scope.form = {};
     $scope.all = [];
     $scope.event = [];
     $scope.shop = [];
     $scope.goods = [];
     $scope.freepaper = [];
     $scope.recruit = [];
     $scope.tv = [];
     $scope.notifyChecked7 = true;
     $scope.pageSize = 10;
     $scope.lastPage = '';
     $scope.nextPage = '';

     // Get data from http
     $scope.getData = function () {
       if($scope.hasPerson == false){
         $location.path('/entry');
       }
       if($routeParams.type){
       apiService.getMyPageList($routeParams.type,$scope.pageSize, $scope.pageSize * ($routeParams.page-1), function onSuccess(resultList) {
         $scope.hideFooter = false;
         $scope.results = resultList;
         $scope.all = $scope.results.shopList;
         for(var index in $scope.results.shopList){
             if($scope.results.shopList[index].type == 13){
               $scope.results.shopList[index].type = 'EVENT';
               $scope.results.shopList[index].status = 'EVENT';
               $scope.event.push($scope.results.shopList[index]);
             }else if ($scope.results.shopList[index].type == 15) {
               $scope.results.shopList[index].type = 'GOODS';
               $scope.results.shopList[index].status = 'GOODS';
               $scope.goods.push($scope.results.shopList[index]);
             }else if ($scope.results.shopList[index].type == 16) {
               $scope.results.shopList[index].type = 'FREEPAPER';
               $scope.results.shopList[index].status = 'FREEPAPER';
               $scope.freepaper.push($scope.results.shopList[index]);
             }else if ($scope.results.shopList[index].type == 17) {
               $scope.results.shopList[index].type = 'RECRUIT';
               $scope.results.shopList[index].status = 'RECRUIT';
               $scope.recruit.push($scope.results.shopList[index]);
             }else if ($scope.results.shopList[index].type == 18) {
               $scope.results.shopList[index].type = 'TV';
               $scope.results.shopList[index].status = 'TV';
               $scope.tv.push($scope.results.shopList[index]);
             }else if($scope.results.shopList[index].type == 14){
               $scope.results.shopList[index].type = 'SHOP';
               $scope.results.shopList[index].status = 'SHOP';
               if($scope.results.shopList[index].userSetting == 1){
                 $scope['notifyChecked'+index] = false;
               }else{
                  $scope['notifyChecked'+index] = true;
               }
               $scope.shop.push($scope.results.shopList[index]);
             }else if($scope.results.shopList[index].status == 19){
               $scope.results.shopList[index].type = 'SHOP';
               $scope.results.shopList[index].status = 'PLACE';
               $scope.shop.push($scope.results.shopList[index]);
             }
         }

         if($scope.results.notifyList.length > 0){
           $scope.notifyList = $scope.results.notifyList;
           for(var index in $scope.results.notifyList){
             $scope.notifyList[index].notifyContentHide = true;
             $scope.notifyList[index].newHide = true;
              if($scope.notifyList[index].status == 1){
                $scope.notifyList[index].newHide = false;
              }
           }
         }

         /*if($scope.results.notifyList.length == 4){
           $scope.mypageMoreHide = false;
         }*/

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
           $scope.lastPage = '/myPage/' + $routeParams.type + '/' + (parseInt($routeParams.page) - 1) + '/';
         }
         if($routeParams.page < totalPage){
           $scope.nextPage = '/myPage/' + $routeParams.type + '/' + (parseInt($routeParams.page) + 1) + '/';
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
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = 'データの取得に失敗しました。';
           }]
         });
       })
     }else{
       $routeParams.type = 0;
       apiService.getMyPageList($routeParams.type,$scope.pageSize, $scope.pageSize * ($routeParams.page-1), function onSuccess(resultList) {
         $scope.hideFooter = false;
         $scope.results = resultList;
         $scope.all = $scope.results.shopList;
         for(var index in $scope.results.shopList){
             if($scope.results.shopList[index].type == 13){
               $scope.results.shopList[index].type = 'EVENT';
               $scope.results.shopList[index].status = 'EVENT';
               $scope.event.push($scope.results.shopList[index]);
             }else if ($scope.results.shopList[index].type == 15) {
               $scope.results.shopList[index].type = 'GOODS';
               $scope.results.shopList[index].status = 'GOODS';
               $scope.goods.push($scope.results.shopList[index]);
             }else if ($scope.results.shopList[index].type == 16) {
               $scope.results.shopList[index].type = 'FREEPAPER';
               $scope.results.shopList[index].status = 'FREEPAPER';
               $scope.freepaper.push($scope.results.shopList[index]);
             }else if ($scope.results.shopList[index].type == 17) {
               $scope.results.shopList[index].type = 'RECRUIT';
               $scope.results.shopList[index].status = 'RECRUIT';
               $scope.recruit.push($scope.results.shopList[index]);
             }else if ($scope.results.shopList[index].type == 18) {
               $scope.results.shopList[index].type = 'TV';
               $scope.results.shopList[index].status = 'TV';
               $scope.tv.push($scope.results.shopList[index]);
             }else if($scope.results.shopList[index].type == 14){
               $scope.results.shopList[index].type = 'SHOP';
               $scope.results.shopList[index].status = 'SHOP';
               if($scope.results.shopList[index].userSetting == 1){
                 $scope['notifyChecked'+index] = false;
               }else{
                  $scope['notifyChecked'+index] = true;
               }
               $scope.shop.push($scope.results.shopList[index]);
             }else if($scope.results.shopList[index].status == 19){
               $scope.results.shopList[index].type = 'SHOP';
               $scope.results.shopList[index].status = 'PLACE';
               $scope.shop.push($scope.results.shopList[index]);
             }
         }

         if($scope.results.notifyList.length > 0){
           $scope.notifyList = $scope.results.notifyList;
           for(var index in $scope.results.notifyList){
             $scope.notifyList[index].notifyContentHide = true;
             $scope.notifyList[index].newHide = true;
              if($scope.notifyList[index].status == 1){
                $scope.notifyList[index].newHide = false;
              }
           }
         }

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
           $scope.lastPage = '/myPage/' + $routeParams.type + '/' + (parseInt($routeParams.page) - 1) + '/';
         }
         if($routeParams.page < totalPage){
           $scope.nextPage = '/myPage/' + $routeParams.type + '/' + (parseInt($routeParams.page) + 1) + '/';
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

     $scope.goToLink = function(shopType,status,type,uuid){
       if(type == 'EVENT'){
         $location.path('/eventDetail/'+uuid+'/');
       }else if (type == 'GOODS') {
         $location.path('/goodsDetail/'+uuid+'/');
       }else if(type == 'FREEPAPER'){
         $location.path('/freePaper/'+uuid+'/');
       }else if (type == 'RECRUIT') {
         $location.path('/recruitDetail/'+uuid+'/');
       }else if (type == 'TV') {
         $location.path('/tvDetail/'+uuid+'/');
       }
       else {
         if(status == 'PLACE') {
           $location.path('/place/detail/'+uuid+'/');
         }else if (shopType == 8){
           $location.path('/shop/corporateinfo/detail/'+uuid+'/');
         }else {
           $location.path('/shop/detail/'+uuid+'/');
         }

       }
     }
     $scope.showAll = function(){
       $location.path('/myPage/0/1/');
     }

     $scope.showEvent = function(){
       $location.path('/myPage/13/1/');
       // $scope.results.shopList = $scope.event;
     }

     $scope.showGoods = function(){
       $location.path('/myPage/15/1/');
     }

     $scope.showShop = function(){
       $location.path('/myPage/14/1/');
     }

     $scope.showRecruit = function(){
       $location.path('/myPage/17/1/');
     }

     $scope.showTV = function(){
       $location.path('/myPage/18/1/');
     }

     $scope.showFreepaper = function(){
       $location.path('/myPage/16/1/');
     }

     $scope.getPersonInfo = function(){
       apiService.getPerson(function onSuccess(result) {
         $scope.formData.nickname = result.nickname;
         if(result.thumbnailUrl){
           $scope.thumbnailUrl = result.thumbnailUrl
         }else{
           $scope.thumbnailUrl = 'images/thumbnail.png';
         }
         if(result.loginType && result.loginType == 3){
           $scope.resetHide = false;
         }
         $scope.thumbnailUrlHide = false;
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
         $scope.ncjp = resultList;

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

     $scope.notifyClick = function(type,uuid,key,status){
       $scope.notifyCheckedValue = null;
       $scope.notifyCheckedType = type;
       $scope.notifyCheckedUUID = uuid;
       if(key == 7){
         $scope.notifyCheckedValue = !$scope.notifyChecked7;
         $scope.notifyChecked7 = !$scope.notifyChecked7;
       }

       if(status == 0){
         $scope.notifyCheckedValue = 1;
       }else{
         $scope.notifyCheckedValue = 0;
       }

       apiService.getSettingsNotify($scope.notifyCheckedType,$scope.notifyCheckedUUID,7,$scope.notifyCheckedValue,function onSuccess(result) {
       }, function onError(message) {

       });
       apiService.getSettingsNotify($scope.notifyCheckedType,$scope.notifyCheckedUUID,8,$scope.notifyCheckedValue,function onSuccess(result) {
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
         var htmlCode = '<a href="/myPage/'+$routeParams.type+'/'+ (i + 1) + '/">' +
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

     $scope.getNotifyNav();
     $scope.getPersonInfo();
     $scope.getData();
     $('html,body').animate({scrollTop:0}, 0);
  }]);
