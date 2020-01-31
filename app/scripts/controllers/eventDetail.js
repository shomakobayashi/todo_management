'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:EventDetailCtrl
 * @description
 * # EventDetailCtrl
 * Controller of the EventDetailCtrl
 */
 angular.module('moveupApp')
   .controller('EventDetailCtrl', ['$scope', '$http', 'ApiService', '$location','$routeParams', '$sce','$window','ngDialog','$compile', '$timeout',function ($scope, $http, apiService, $location,$routeParams,$sce,$window, ngDialog,$compile,$timeout) {
     $scope.hideFooter = true;
     $scope.applicationHide = false;
     $scope.starPic = [];
     $scope.starPicMore = [];
     $scope.starPic2 = [];
     $scope.commentPic = [];
     $scope.commentPicMore = [];
     $scope.commentPic2 = [];
     $scope.addMyPage = {};
     $scope.videoUrl = '';
     $scope.eventNextHide = false;
     $scope.eventPreHide = false;
     $scope.btnViewMore = false;
     $scope.btnViewMore2 = false;
     $scope.ifMorePIC1 = true;
     $scope.ifMorePIC2 = true;
     $scope.hideMoreButtons = true;
     $scope.hideMoreButtons2 = true;
     $scope.hideAddMypageButtons = true;
     $scope.hideRemoveMypageButtons = true;
     if($routeParams.uuid){
      apiService.getEventDetail($routeParams.uuid, function onSuccess(resultList){
        $scope.hideFooter = false;
         $scope.results = resultList;
         $scope.results2 = resultList;
         //$scope.results[0].desc1 = $scope.TransferString($scope.results[0].desc1);
         //$scope.results[0].comment = $scope.TransferString($scope.results[0].comment);
         $scope.MyPageStatus();
         var entryType = $scope.results[0].entry;
         if( entryType == '1'){
            $scope.applicationHide = false;
         }else {
            $scope.applicationHide = true;
         }

         $scope.videoUrl = $sce.trustAsResourceUrl($scope.results[0].videoUrl1);
         if($scope.results[0].starPic.length > 0){
           for(var index in $scope.results[0].starPic){
             if(index > 0){
                 $scope.starPic2.push($scope.results[0].starPic[index]);
             }
           }
         }
         if($scope.results[0].commentPic.length > 0){
           for(var index in $scope.results[0].commentPic){
              $scope.commentPic2.push($scope.results[0].commentPic[index]);
           }
         }
         if($scope.results[0].starPic.length > 0){
           for(var index in $scope.results[0].starPic){
             if(index > 3){
                 $scope.starPicMore.push($scope.results[0].starPic[index]);
             }
           }
         }
         if($scope.results[0].commentPic.length > 0){
           for(var index in $scope.results[0].commentPic){
             if(index > 3){
                 $scope.commentPicMore.push($scope.results[0].commentPic[index]);
             }
           }
         }
         if($scope.results[0].starPic.length > 0){
           for(var index in $scope.results[0].starPic){
             if(index > 0){
              $scope.starPic.push(new Array($scope.results[0].starPic[index]));
            }
           }
         }
         //$scope.commentPic = $scope.results[0].commentPic;
         if($scope.results[0].commentPic.length > 0){
           for(var index in $scope.results[0].commentPic){
             if(index > 0){
                 $scope.commentPic.push(new Array($scope.results[0].commentPic[index]));
             }
           }
         }
         if($scope.results[0].eventNext == null){
           $scope.eventNextHide = true;
         }
         if($scope.results[0].eventPre == null){
           $scope.eventPreHide = true;
         }
         if($scope.starPic.length < 5){
           $scope.btnViewMore = true;
         }
         if($scope.commentPic2.length < 5){
           $scope.btnViewMore2 = true;
         }
         $timeout(function() {
           $scope.loadScript();
         }, 500);
       }, function onError(message) {

       })
     }



     $scope.TransferString = function (content){
          var string = content;
          try{
              string=string.replace(/\r\n/g,"<br/>");
              string=string.replace(/\n/g,"<br/>");
          }catch(e) {

          }
          return string;
      }

      $scope.appearPic = function () {
        if($scope.results[0].starPic.length > 4){
          $scope.ifMorePIC1 = false;
        }
        $scope.btnViewMore = true;
        $scope.hideMoreButtons = false;
      }
      $scope.appearPic2 = function () {
        if($scope.results[0].commentPic.length > 4){
          $scope.ifMorePIC2 = false;
        }
        $scope.btnViewMore2 = true;
        $scope.hideMoreButtons2 = false;
      }

      $scope.addMyPage = function(){
            $scope.addMyPage.favId = $scope.results[0].eventId;
            $scope.addMyPage.type = 13;
            apiService.postAddMyPage($scope.addMyPage, function onSuccess(result) {
              $scope.hideAddMypageButtons = true;
              $scope.hideRemoveMypageButtons = false;
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
            $scope.addMyPage.favId = $scope.results[0].eventId;
            $scope.addMyPage.type = 13;
            apiService.postRemoveMyPage($scope.addMyPage, function onSuccess(result) {
              $scope.hideAddMypageButtons = false;
              $scope.hideRemoveMypageButtons = true;
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
            apiService.getMyPageStatus($scope.results[0].eventId,13,function onSuccess(result) {
              if(result.status == 1){
                $scope.hideAddMypageButtons = true;
                $scope.hideRemoveMypageButtons = false;
              }else{
                $scope.hideAddMypageButtons = false;
                $scope.hideRemoveMypageButtons = true;
              }
          }, function onError(message, statusCode, statusList) {

          });
      }


     $scope.loadScript = function () {
       var script=document.createElement("script");
       script.type="text/javascript";
       script.src="//ad-api-v01.uliza.jp/player.php?player_type=1&campaign=1841&pc_width=600";
       document.getElementById("ad").appendChild(script);
      }

     $scope.getStarPic = function (index) {
          // if(index != 0){
          //   index++;
          // }
         if($scope.starPic.length > 0){
           $('#gallery1').remove();
           var htmlStr = '<div class="dowebok"><div id="gallery1" style="display:none;"><a href="'+$scope.results[0].starPic[index]+'"></a></div></div>';
           $('body').append(htmlStr);
           $('#gallery1').responsivegallery({
            media: $scope.starPic,
            curmedia:index
          });
          $('#gallery1').click();
          //$compile($('#galleryinner').contents())($scope);
        }
     }

     $scope.getCommentPic = function (index) {
         if($scope.commentPic.length > 0){
           $('#gallery2').remove();
           var htmlStr = '<div class="dowebok"><div id="gallery2" style="display:none;"><a href="'+$scope.results[0].commentPic[index]+'"></a></div></div>';
           $('body').append(htmlStr);
           $('#gallery2').responsivegallery({
            media: $scope.commentPic,
            curmedia:index
          });
          $('#gallery2').click();
          //$compile($('#galleryinner').contents())($scope);
        }
     }

     $scope.closefp = function (){
       document.getElementById("responsivegallery").remove();
    }

     $scope.onApplication = function(){
       $window.localStorage['eventDetailInfo'] = JSON.stringify($scope.results2);
       $location.path('/profile');
     }

     $('html,body').animate({scrollTop:0}, 0);
   }]);
