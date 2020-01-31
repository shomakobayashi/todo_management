'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ShopCorporateinfoDetailCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('ShopCorporateinfoDetailCtrl', ['$scope', '$http', 'ApiService', '$location', '$window', '$routeParams', '$sce', 'ngDialog',
   function ($scope, $http, apiService, $location, $window, $routeParams, $sce, ngDialog) {
    $scope.hideFooter = false;
    $scope.btnViewMore = false;
    $scope.picUrl = [];
    $scope.hideMoreButtons = true;
    $scope.ifMorePIC1 = true;
    $scope.starPic = [];

    //$scope.UserIsLogin = false;
    // $scope.inited = false;

    // $scope.setUserDataCallback(function(isLogin){
    //   $scope.UserIsLogin = isLogin;
    //   // if($scope.inited){
    //   //   if(isLogin) {
    //   //   }
    //   // }else{
    //   //   $scope.inited = true;
    //   // }
    // });

    if($routeParams.uuid){
     $scope.hideFooter = true;
     apiService.getShopCorporateinfoDetail($routeParams.uuid, function onSuccess(resultList){
        $scope.hideFooter = false;
        $scope.results = resultList;

        //alert($scope.results[0].favorite);
        //alert($scope.UserIsLogin);
        // if($scope.UserIsLogin) {
        // }else{
        //   $scope.results[0].favorite = false;
        // }
        // if($scope.inited){
        // }else{
        //   $scope.inited = true;
        // }

        $scope.tel =($scope.results[0].tel).replace('-','');
        $scope.videoUrl = $sce.trustAsResourceUrl($scope.results[0].videoUrl);
        $scope.picUrl11 = $sce.trustAsResourceUrl($scope.results[0].picUrl11);
        $scope.picUrl3 = $sce.trustAsResourceUrl($scope.results[0].picUrl3);
        $scope.picUrl6 = $sce.trustAsResourceUrl($scope.results[0].picUrl6);

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
        var reg=/-/g;
        $scope.tel = ($scope.results[0].tel).replace(reg,'');

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
         $scope.addMyPage.favId = $scope.results[0].shopListID;
         $scope.addMyPage.type = 20;
         apiService.postAddMyPage($scope.addMyPage, function onSuccess(result) {
           $scope.results[0].favorite = true;
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

    $scope.RemoveMyPage = function(){
         $scope.addMyPage.favId = $scope.results[0].shopListID;
         $scope.addMyPage.type = 20;
         apiService.postRemoveMyPage($scope.addMyPage, function onSuccess(result) {
           $scope.results[0].favorite = false;
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

    $('html,body').animate({scrollTop:0}, 0);
   }]);
