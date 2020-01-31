'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:RecruitDetailCtrl
 * @description
 * # rise
 * Controller of the rise
 */
angular.module('moveupApp')
 .controller('RecruitDetailCtrl', ['$scope', '$http', 'ApiService', '$location','$routeParams', '$sce', 'ngDialog',
 function ($scope, $http, apiService, $location, $routeParams, $sce, ngDialog) {
   $scope.hideFooter = false;

   $scope.btnViewMore = false;
   $scope.picUrl = [];
   $scope.hideMoreButtons = true;
   $scope.ifMorePIC1 = true;
   $scope.starPic = [];

   if($routeParams.uuid){
     $scope.hideFooter = true;

      apiService.getRecruitDetail($routeParams.uuid, function onSuccess(resultList){
        $scope.hideFooter = false;
        $scope.results = resultList;


        $scope.featureList = $scope.results[0].featureList;
        $scope.modeList = $scope.results[0].modeList;
        $scope.salary = $scope.results[0].salary;
        $scope.salaryFull = $scope.results[0].salaryFull;
        $scope.capacity = $scope.results[0].capacity;
        $scope.vacation = $scope.results[0].vacation;
        $scope.treatmentList = $scope.results[0].treatmentList;
        $scope.treatment = $scope.results[0].treatment;
        $scope.desc = $scope.results[0].desc;
        $scope.workingDate = $scope.results[0].workingDate;
        var reg=/-/g;
        $scope.tel = ($scope.results[0].tel).replace(reg,'');


        $scope.videoUrl1 = $sce.trustAsResourceUrl($scope.results[0].videoUrl1);
        $scope.picUrl11 = $scope.results[0].picUrl11;
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
         $scope.addMyPage.favId = $scope.results[0].recruitId;
         $scope.addMyPage.type = 17;
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
         $scope.addMyPage.favId = $scope.results[0].recruitId;
         $scope.addMyPage.type = 17;
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

   $scope.MyPageStatus = function(){
         apiService.getMyPageStatus($scope.results[0].id,17,function onSuccess(result) {
           if(result.status == 1){
             $scope.hideMypageButtons = true;
           }else{
             $scope.hideMypageButtons = false;
           }
       }, function onError(message, statusCode, statusList) {

       });
   }

   $('html,body').animate({scrollTop:0}, 0);
 }]);
