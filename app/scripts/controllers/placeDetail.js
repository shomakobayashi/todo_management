'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:PlaceDetailCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('PlaceDetailCtrl', ['$scope', '$http', 'ApiService', '$location','$routeParams', '$sce', 'ngDialog',
   function ($scope, $http, apiService, $location, $routeParams, $sce, ngDialog) {
     $scope.hideFooter = false;
     $scope.hideMypageButtons = false;
     $scope.picUrl = [];
     $scope.starPic = [];
     $scope.hideMoreButtons = true;
     $scope.ifMorePIC1 = true;
     $scope.btnViewMore = false;

     if($routeParams.uuid){
        $scope.hideFooter = true;
        apiService.getPlaceDetail($routeParams.uuid, function onSuccess(resultList){
          $scope.hideFooter = false;
          $scope.results = resultList;

          var reg=/-/g;
          $scope.tel = ($scope.results[0].tel).replace(reg,'');
          $scope.videoUrl = $sce.trustAsResourceUrl($scope.results[0].videoUrl);
          $scope.picUrl11 = $sce.trustAsResourceUrl($scope.results[0].picUrl11);
          $scope.picUrl12 = $sce.trustAsResourceUrl($scope.results[0].picUrl12);
          $scope.flicUrl = $sce.trustAsResourceUrl($scope.results[0].flicUrl);
          // alert($scope.results[0].placeList[0].name);
          // alert($scope.results[0].placeList.introduce);
          if($scope.results[0].picUrl1 != "" && $scope.results[0].picUrl1 != null){
            $scope.picUrl.push($scope.results[0].picUrl1);
          }
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

     $scope.appearPic = function () {
       if($scope.picUrl.length > 4){
         $scope.ifMorePIC1 = false;
       }
       $scope.btnViewMore = true;
       $scope.hideMoreButtons = false;
     }

     $scope.addMyPage = function(){
           $scope.addMyPage.favId = $scope.results[0].placeListId;
           $scope.addMyPage.type = 19;
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
           $scope.addMyPage.favId = $scope.results[0].placeListId;
           $scope.addMyPage.type = 19;
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
