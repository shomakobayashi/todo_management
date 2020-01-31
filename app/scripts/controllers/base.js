'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:BaseCtrl
 * @description
 * # base
 * Controller of the base
 */
 angular.module('moveupApp')
   .controller('BaseCtrl', ['$scope', '$http','ApiService','$location', 'EVENTS', '$window' ,function ($scope, $http, apiService,$location,EVENTS,$window) {
       $scope.hasLogin = false;
       //$scope.UserIsLogin = false;
       $scope.NotifyNavHide = true;
       $scope.NotifyCount = 0;
       $scope.headerName = '';
       $scope.thumbnailUrlHide= true;
       $scope.headerUrl = '';
       $scope.dropdownMenuHide = true;
       $scope.userDataCallback = null;
       $('.person-loginImg').removeAttr('style');

     	$("#indexbs-example-navbar-collapse-2").click(function(){
        var navbar3 = $("#bs-example-navbar-collapse-3")
        if(navbar3.attr("aria-expanded") == "true"){
          navbar3.collapse('hide');
        }
     	});

     	$("#indexbs-example-navbar-collapse-3").click(function(){
        var navbar2 = $("#bs-example-navbar-collapse-2")
        if(navbar2.attr("aria-expanded") == "true"){
          navbar2.collapse('hide');
        }
     	});
      $scope.jumpTop = function(){
        $location.path('/cuowu');
      }
       $scope.onTwitterShare = function(){
         var twitterWindow = $window.open(
           'https://twitter.com/share?url=' + encodeURIComponent(apiService.getApiBase() + "/sns" + $location.path()),
           'twitter-popup',
           'height=350,width=600');
         if(twitterWindow.focus) { twitterWindow.focus(); }
         return false;
       }

       $scope.onFacebookShare = function(){
         var facebookWindow = $window.open(
           'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(apiService.getApiBase() + "/sns" + $location.path()),
           'facebook-share-dialog',
           'width=436,height=626');
         if(facebookWindow.focus) { facebookWindow.focus(); }
         return false;
       }

       $scope.onHeadClick = function(){
         $scope.dropdownMenuHide = false;
       }

       $scope.onDropDownClose = function(){
         $scope.dropdownMenuHide = true;
       }

       $scope.gotoMyPage = function(){
         $scope.dropdownMenuHide = true;
         $location.path('/');
       }

       $scope.gotoBuyHistory = function(){
         $scope.dropdownMenuHide = true;
         $location.path('/');
       }

       $scope.gotoProfileSetting = function(){
         $scope.dropdownMenuHide = true;
         $location.path('/account');
       }

       $scope.gotoMyPageNotifySetting = function(){
         $scope.dropdownMenuHide = true;
         $location.path('/myPageNotify/1/');
       }

       $scope.gotoShop = function(type){
         $location.path('/shop/'+ type +'/');
       }

       $scope.gotoPlace = function(){
         $location.path('/place');
       }

       $scope.gotoRecruit = function(){
         $location.path('/recruit');
       }

       $scope.gotoCorporateinfo = function(){
         $location.path('/shop/corporateinfo/8/');
       }

       $scope.logout = function(){
         $scope.dropdownMenuHide = true;
         apiService.postLogout(function onSuccess(resultList) {
           $scope.hasLogin = false;
           $scope.headerName = '';
           $location.path('/');
         },function onError(message){

         });
       }

       // Get data from http
       $scope.getUserData = function () {
         apiService.getPersonHeader(function onSuccess(resultList) {
           $scope.hasLogin = resultList.isLogin;
           $scope.hasPerson = resultList.hasPerson;
           if(resultList.isLogin){
               $scope.getNotifyNav();
           }
           if(resultList.header){
             $scope.headerUrl = resultList.header;
           }else{
             $scope.headerUrl = '/images/thumbnail.png';
           }
           $scope.thumbnailUrlHide = false;
           if(resultList.nickname){
             $scope.headerName = resultList.nickname;
           }else{
             $scope.headerName = '';
           }
           $('.person-info').removeAttr('style');
           $('.person-infosp').removeAttr('style');

           if($scope.userDataCallback){
             $scope.userDataCallback(resultList.isLogin);
           }
         },function onError(message){
           if($scope.userDataCallback){
             $scope.userDataCallback(false);
           }
         });
       }

       $scope.getNotifyNav = function () {
         apiService.getNotifyNav(function onSuccess(resultList) {
           $scope.NotifyCount = resultList.count
           if($scope.NotifyCount != 0){
             $scope.NotifyNavHide = false;
           }else{
             $scope.NotifyNavHide = true;
           }
         },function onError(message){

         });
       }

       $scope.checkLoginGoto = function(path){
         $scope.dropdownMenuHide = true;
         apiService.getIsLogin(function onSuccess(resultList) {
         $location.path(path);
         },function onError(message){

         });
       }

       $scope.$on(EVENTS.routeChangeSuccess, function(event,data) {
         $scope.userDataCallback = null;
          $scope.getUserData();
       });
       $scope.UserIsloginF = function(){
         $scope.UserIsLogin = true;
       }
       $scope.setUserDataCallback =function(cb){
         $scope.userDataCallback = cb;
       }

   }]);
