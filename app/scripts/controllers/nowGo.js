'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:NowGoCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('NowGoCtrl', ['$scope', '$http', 'ApiService','$location','$routeParams', function ($scope, $http, apiService, $location, $routeParams) {
     $scope.hideFooter = true;
     $scope.nowGoHide = true;
     $scope.shopSearchR = {};
     $scope.shopSearchR.now5 = '1';
     $scope.shopSearchR.shopType = '0';
     $scope.shopSearchR.keyWord = '';
     $scope.shopSearchR.shopType = '0';
     $scope.shopSearchR.dayPriceLow = 0;
     $scope.shopSearchR.nightPriceHigh = 0;
     $scope.shopSearchR.shopTypeModel = '0';
     $scope.shopSearchR.PriceModel = '0';
     $scope.clickMarker = true;
     $scope.markerIcon = "images/mapicon_4.png";
     $scope.markers = [];
     $scope.lightcood1 = '';
     $scope.lightcood2 = '';
     $scope.lightDivId = 0;
     $scope.hidePages = true;
     $scope.pageSize = 1;
     $scope.lastPage = '';
     $scope.nextPage = '';

     $scope.selectHide0 = true;
     $scope.selectHide1 = true;
     $scope.selectDesc1 = "カテゴリー選択";
     $scope.selectContent1 = 0;
     $scope.selectHide2 = true;
     $scope.selectDesc2 = "価格帯を選択";
     $scope.selectContent2 = 0;
     $scope.selectHide3 = true;
     $scope.selectDesc3 = "エリアを選択";
     $scope.selectContent3 = 0;
     $scope.selectHide4 = true;
     $scope.selectDesc4 = "ジャンル選択";
     $scope.selectContent4 = 0;

     $scope.janruList =  [];

     $scope.getData = function () {
       if($scope.hasPerson == false){
         $location.path('/entry');
       }
       if($routeParams.type){
       apiService.getNow5List($routeParams.type,$scope.pageSize,$scope.pageSize * ($routeParams.page-1), function onSuccess(resultList) {
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
           $scope.lastPage = '/nowGo/' + $routeParams.type + '/' + (parseInt($routeParams.page) - 1) + '/';
         }
         if($routeParams.page < totalPage){
           $scope.nextPage = '/nowGo/' + $routeParams.type + '/' + (parseInt($routeParams.page) + 1) + '/';
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
         // paginationService.updatePagination($scope, $scope.pageObject);

         $scope.foodList = $scope.results[0].foodMainMenuList;
         $scope.driveList = $scope.results[0].driveMainMenuList;
         $scope.facilityList = $scope.results[0].facilityMainMenuList;
         $scope.fastionList = $scope.results[0].fastionMainMenuList;
         $scope.healthList = $scope.results[0].healthMainMenuList;
         $scope.infoList = $scope.results[0].infoMainMenuList;
         $scope.learnList = $scope.results[0].learnMainMenuList;
         $scope.lifeList = $scope.results[0].lifeMainMenuList;
         $scope.playList = $scope.results[0].playMainMenuList;
         $scope.bridalList = $scope.results[0].bridalMainMenuList;


         if($scope.results[0].couponList.length>0){
           $scope.nowGoHide = false;
         }


         var contentList = $scope.results[0].contentList;
         for(var i = 0 ; i < contentList.length; i++){
           $scope.marker =
                 {
                   'location'  : [contentList[i].coordinate1, contentList[i].coordinate2],
                   'icon' : 'images/mapicon_4.png'
                 };
           $scope.markers.push($scope.marker);
         }

       })
      }
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
     $scope.shopCloseAllSelect = function () {
       $scope.selectHide0 = true;
       $scope.selectHide1 = true;
       $scope.selectHide2 = true;
       $scope.selectHide3 = true;
       $scope.selectHide4 = true;
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
       $scope.selectDesc4 = "ジャンル選択";
       $scope.selectContent4 = 0;

       if ($scope.selectContent1 == 1) {
         $scope.janruList =  $scope.foodList;
       } else if ($scope.selectContent1 == 2) {
         $scope.janruList =  [];
       } else if ($scope.selectContent1 == 3) {
         $scope.janruList =  $scope.healthList;
       } else if ($scope.selectContent1 == 4) {
         $scope.janruList =  $scope.playList;
       } else if ($scope.selectContent1 == 5) {
         $scope.janruList =  $scope.bridalList;
       } else if ($scope.selectContent1 == 6) {
         $scope.janruList =  $scope.driveList;
       } else if ($scope.selectContent1 == 7) {
         $scope.janruList =  [];
       } else if ($scope.selectContent1 == 8) {
         $scope.janruList =  $scope.infoList;
       } else if ($scope.selectContent1 == 9) {
         $scope.janruList =  $scope.learnList;
       } else if ($scope.selectContent1 == 10) {
         $scope.janruList =  $scope.facilityList;
       } else if ($scope.selectContent1 == 11) {
         $scope.janruList =  $scope.lifeList;
       } else if ($scope.selectContent1 == 12) {
         $scope.janruList =  $scope.fastionList;
       }
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

     $scope.shopSelect4 = function () {
       $scope.selectHide4 = false;
       $scope.selectHide0 = false;
     }
     $scope.shopCloseSelect4 = function () {
       $scope.selectHide4 = true;
       $scope.selectHide0 = true;
     }
     $scope.shopSelectValue4 = function (desc,content) {
       $scope.selectDesc4 = desc;
       $scope.selectContent4 = content;
     }

    $scope.showShopBlock = function (index,coordinate1,coordinate2) {
        var xo = index;
        var aa = document.getElementById('shop_goods');
        var contentList = $scope.results[0].contentList;
        for(var i = 0 ; i < contentList.length; i++){
            if(contentList[i].coordinate1 == coordinate1 && contentList[i].coordinate2 ==coordinate2){
                aa.style['background-color'] = '#f1b4b466';
            }
        }

    }

    $scope.markMouseout=function (event,coordinate1,coordinate2){
      var contentList = $scope.results[0].contentList;
      for(var i = 0 ; i < contentList.length; i++){
          if(contentList[i].coordinate1 == coordinate1 && contentList[i].coordinate2 ==coordinate2){
            var aa = document.getElementById('shop_goods'+i);
              aa.style['background-color'] = '#fff';
              aa.style['box-shadow'] = '';
          }
      }
    }
    $scope.markMouseover=function (event,coordinate1,coordinate2){
      var contentList = $scope.results[0].contentList;
      for(var i = 0 ; i < contentList.length; i++){
          if(contentList[i].coordinate1 == coordinate1 && contentList[i].coordinate2 ==coordinate2){
              var aa = document.getElementById('shop_goods'+i);
              aa.style['background-color'] = '#e9e9e980';
              aa.style['box-shadow'] = '0px 1px 0px red';
          }
      }
    }

    $scope.markClick=function (event,coordinate1,coordinate2){
      var contentList = $scope.results[0].contentList;
      for(var i = 0 ; i < contentList.length; i++){
        document.getElementById('shop_goods'+i).style['background-color'] = '#fff';
        document.getElementById('shop_goods'+i).style['box-shadow'] = '';
        $scope.marker = {
          'location'  : [contentList[i].coordinate1, contentList[i].coordinate2],
          'icon' : 'images/mapicon_4.png'
        };
        $scope.clickMarker = true;
          if(contentList[i].coordinate1 == coordinate1 && contentList[i].coordinate2 ==coordinate2){
            $scope.lightcood1 = coordinate1;
            $scope.lightcood2 = coordinate2;
                $scope.clickMarker = false;
                //document.getElementById("shop_goods"+index).scrollIntoView();
                var aa = document.getElementById('shop_goods'+i);
                var bb = document.getElementById('mapMark'+i);
                $('html,body').animate({scrollTop:$('#shop_goods'+i).offset().top-120}, 800);
                aa.style['background-color'] = '#e9e9e980';
                aa.style['box-shadow'] = '0px 1px 0px red';
                $scope.marker = {
                  'location'  : [contentList[i].coordinate1, contentList[i].coordinate2],
                  'icon' : 'images/mapicon_1.png'
                };
            }
        }
    }

     $scope.searchR = function () {
       $scope.shopSearchR.shopType = $scope.selectContent1;
       $scope.shopSearchR.area = $scope.selectContent3;
       $scope.shopSearchR.mainMenu = $scope.selectContent4;
       if($scope.selectContent2 == 0){
         $scope.shopSearchR.dayPriceLow = null;
         $scope.shopSearchR.nightPriceHigh = null;
       }else if($scope.selectContent2 == 1){
         $scope.shopSearchR.dayPriceLow = 1000;
         $scope.shopSearchR.nightPriceHigh = 2000;
       }else if($scope.selectContent2 == 2){
         $scope.shopSearchR.dayPriceLow = 2000;
         $scope.shopSearchR.nightPriceHigh = 5000;
       }else if($scope.selectContent2 == 3){
         $scope.shopSearchR.dayPriceLow = 5000;
         $scope.shopSearchR.nightPriceHigh = 10000;
       }else if($scope.selectContent2 == 4){
         $scope.shopSearchR.dayPriceLow = 10000;
         $scope.shopSearchR.nightPriceHigh = 20000;
       }else if($scope.selectContent2 == 5){
         $scope.shopSearchR.dayPriceLow = 20000;
         $scope.shopSearchR.nightPriceHigh = 30000;
       }else{
         $scope.shopSearchR.dayPriceLow = 30000;
         $scope.shopSearchR.nightPriceHigh = 50000;
       }

       $scope.shopSearchR.limit = $scope.pageObject.pageSize;
       $scope.shopSearchR.offset = $scope.pageObject.pageSize * ($scope.pageObject.currentPage-1);

       apiService.postNow5Search($scope.shopSearchR,function onSuccess(result) {
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
         $scope.pageObject.updateFunc = $scope.searchR;
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
         var htmlCode = '<a href="/nowGo/'+$routeParams.type+'/'+ (i + 1) + '/">' +
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
     // $scope.initialize();
     $('html,body').animate({scrollTop:0}, 0);
   }]);
