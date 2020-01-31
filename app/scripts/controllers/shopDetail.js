'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ShopDetailCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('ShopDetailCtrl', ['$scope', '$http', 'ApiService', '$location', '$window', '$routeParams', '$sce', 'ngDialog',
   function ($scope, $http, apiService, $location, $window, $routeParams, $sce, ngDialog) {
     $scope.hideFooter = false;
     $scope.btnViewMore = false;
     $scope.picUrl = [];
     $scope.hideMoreButtons = true;
     $scope.ifMorePIC1 = true;
     $scope.starPic = [];

     $scope.UserIsLogin = false;
     $scope.inited = false;
     $scope.hideMypageButtons = false;

     $scope.setUserDataCallback(function(isLogin){
       $scope.UserIsLogin = isLogin;
       if($scope.inited){
         if(isLogin) {
           $scope.MyPageStatus();
         }
       }else{
         $scope.inited = true;
       }
     });

     if($routeParams.uuid){
       $scope.hideFooter = true;
        apiService.getShopDetail($routeParams.uuid, function onSuccess(resultList){
          $scope.hideFooter = false;
          $scope.results = resultList;
          // apiService.getPersonHeader(function onSuccess(resultList) {
          //   $scope.UserIsLogin = resultList.isLogin;
          // },function onError(message){
          //
          // });
          if($scope.inited){
            if($scope.UserIsLogin) {
              $scope.MyPageStatus();
            }
          }else{
            $scope.inited = true;
          }

          $scope.videoUrl = $sce.trustAsResourceUrl($scope.results[0].videoUrl);
          $scope.picUrl11 = $sce.trustAsResourceUrl($scope.results[0].picUrl11);
          $scope.picUrl12 = $sce.trustAsResourceUrl($scope.results[0].picUrl12);
          $scope.picUrl6 = $sce.trustAsResourceUrl($scope.results[0].picUrl6);

          $scope.shopType = $scope.results[0].shopType;
          $scope.lunch = $scope.results[0].lunch;
          $scope.dinner = $scope.results[0].dinner;
          $scope.shopOpenTime = $scope.results[0].shopOpenTime;
          $scope.shopCloseTime = $scope.results[0].shopCloseTime;
          var reg=/-/g;
          $scope.tel = ($scope.results[0].tel).replace(reg,'');

          $scope.dayPriceLow= $scope.priceSwitch($scope.results[0].dayPriceLow)
          $scope.dayPriceHigh= $scope.priceSwitch($scope.results[0].dayPriceHigh)
          $scope.nightPriceLow= $scope.priceSwitch($scope.results[0].nightPriceLow)
          $scope.nightPriceHigh= $scope.priceSwitch($scope.results[0].nightPriceHigh)

          $scope.desc1 = $scope.results[0].desc1;
          $scope.desc2 = $scope.results[0].desc2;
          $scope.desc3 = $scope.results[0].desc3;
          $scope.desc4 = $scope.results[0].desc4;
          $scope.desc5 = $scope.results[0].desc5;
          $scope.desc6 = $scope.results[0].desc6;
          $scope.desc7 = $scope.results[0].desc7;
          $scope.desc8 = $scope.results[0].desc8;
          $scope.desc9 = $scope.results[0].desc9;
          $scope.desc10 = $scope.results[0].desc10;
          $scope.desc11 = $scope.results[0].desc11;
          $scope.desc12 = $scope.results[0].desc12;
          $scope.desc13 = $scope.results[0].desc13;
          $scope.desc14 = $scope.results[0].desc14;
          $scope.desc15 = $scope.results[0].desc15;
          $scope.desc16 = $scope.results[0].desc16;
          $scope.desc17 = $scope.results[0].desc17;
          $scope.desc18 = $scope.results[0].desc18;
          $scope.desc19 = $scope.results[0].desc19;
          $scope.desc20 = $scope.results[0].desc20;
          $scope.desc21 = $scope.results[0].desc21;
          $scope.desc22 = $scope.results[0].desc22;
          $scope.desc23 = $scope.results[0].desc23;
          $scope.desc24 = $scope.results[0].desc24;
          $scope.desc25 = $scope.results[0].desc25;
          $scope.desc26 = $scope.results[0].desc26;
          $scope.desc27 = $scope.results[0].desc27;
          $scope.desc28 = $scope.results[0].desc28;
          $scope.desc29 = $scope.results[0].desc29;
          $scope.desc30 = $scope.results[0].desc30;
          $scope.desc31 = $scope.results[0].desc31;
          $scope.desc32 = $scope.results[0].desc32;
          $scope.desc33 = $scope.results[0].desc33;
          $scope.desc34 = $scope.results[0].desc34;
          $scope.desc35 = $scope.results[0].desc35;
          $scope.desc36 = $scope.results[0].desc36;
          $scope.desc37 = $scope.results[0].desc37;
          $scope.desc38 = $scope.results[0].desc38;
          $scope.desc39 = $scope.results[0].desc39;
          $scope.desc40 = $scope.results[0].desc40;
          // alert($scope.desc17);
          // debugger;
          if($scope.results[0].picUrl2 != "" && $scope.results[0].picUrl2 != null){
            $scope.picUrl.push($scope.results[0].picUrl2);
          }
          if($scope.results[0].picUrl3 != "" && $scope.results[0].picUrl3 != null){
            $scope.picUrl.push($scope.results[0].picUrl3);
          }
          if($scope.results[0].picUrl4 != "" && $scope.results[0].picUrl4 != null){
            $scope.picUrl.push($scope.results[0].picUrl4);
          }
          if($scope.results[0].picUrl5 != "" && $scope.results[0].picUrl5 != null){
            $scope.picUrl.push($scope.results[0].picUrl5);
          }
          if($scope.results[0].picUrl7 != "" && $scope.results[0].picUrl7 != null){
            $scope.picUrl.push($scope.results[0].picUrl7);
          }
          if($scope.results[0].picUrl8 != "" && $scope.results[0].picUrl8 != null){
            $scope.picUrl.push($scope.results[0].picUrl8);
          }
          if($scope.results[0].picUrl9 != "" && $scope.results[0].picUrl9 != null){
            $scope.picUrl.push($scope.results[0].picUrl9);
          }
          if($scope.results[0].picUrl10 != "" && $scope.results[0].picUrl10 != null){
            $scope.picUrl.push($scope.results[0].picUrl10);
          }
          /*if($scope.results[0].picUrl11 != "" && $scope.results[0].picUrl11 != null){
            $scope.picUrl.push($scope.results[0].picUrl11);
          }*/
          if($scope.picUrl.length > 0){
            for(var index in $scope.picUrl){
              if(index >= 0){
               $scope.starPic.push($scope.picUrl[index]);
              }
            }
          }
          if($scope.picUrl.length < 5){
            $scope.btnViewMore = true;
          }
       }, function onError(message) {

       });
     }

     $scope.makePhone = function(){
       $window.open($scope.tel,'_self');
     }
      $scope.appearPic = function () {
        if($scope.picUrl.length > 4){
          $scope.ifMorePIC1 = false;
        }
        $scope.btnViewMore = true;
        $scope.hideMoreButtons = false;
      }

     $scope.addMyPage = function(){
           $scope.addMyPage.favId = $scope.results[0].id;
           $scope.addMyPage.type = 14;
           apiService.postAddMyPage($scope.addMyPage, function onSuccess(result) {
             $scope.hideMypageButtons = true;
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

     // $scope.isLoginF = function(){
     //
     // }

     $scope.RemoveMyPage = function(){
           $scope.addMyPage.favId = $scope.results[0].id;
           $scope.addMyPage.type = 14;
           apiService.postRemoveMyPage($scope.addMyPage, function onSuccess(result) {
             $scope.hideMypageButtons = false;
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

     $scope.MyPageStatus = function(){
           apiService.getMyPageStatus($scope.results[0].id,14,function onSuccess(result) {
             if(result.status == 1){
               $scope.hideMypageButtons = true;
             }else{
               $scope.hideMypageButtons = false;
             }
         }, function onError(message, statusCode, statusList) {

         });
     }

     $scope.priceSwitch =function(f) {

        // var f = parseFloat(x);
        if (isNaN(f)) return false;
        // var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            // s += '.';
        }
        // while (s.length < (rs + 1) + 2) {
        //     s += '0';
        // }

        var leftNum=s.split(".")[0];
        // var rightNum="."+s.split(".")[1];
        var result;

        var resultArray=new Array();
        if(leftNum.length>3){
            var i=true;
            while (i){
                resultArray.push(leftNum.slice(-3));
                leftNum=leftNum.slice(0,leftNum.length-3);
                if(leftNum.length<4){
                    i=false;
                }
            }

            var sortArray=new Array();
            for(var i=resultArray.length-1;i>=0;i--){
                sortArray.push(resultArray[i]);
            }
            result=leftNum+","+sortArray.join(",");
        }else {
            result=s;
        }
        return result;
    }

     $('html,body').animate({scrollTop:0}, 0);
   }]);
