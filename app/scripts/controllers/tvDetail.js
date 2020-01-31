'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:TvDetailCtrl
 * @description
 * # rise
 * Controller of the rise
 */
angular.module('moveupApp')
  .controller('TvDetailCtrl', ['$scope', '$http', 'ApiService', '$window', '$location','$routeParams','ngDialog','$sce','$timeout',function ($scope, $http, apiService, $window, $location,$routeParams,ngDialog,$sce,$timeout) {
    $scope.hideFooter = false;
    $scope.applicationHide = false;
    if($routeParams.uuid){
      //$scope.hideFooter = true;
     apiService.getTvDetail($routeParams.uuid, function onSuccess(resultList){
        $scope.results = resultList;
        $scope.YouTubeVideoUrl = $sce.trustAsResourceUrl($scope.results.YouTubeVideoUrl);
        $scope.AWSVideoUrl = $sce.trustAsResourceUrl($scope.results.AWSVideoUrl);
        $timeout(function() {
          $scope.loadScript();
        }, 500);
      }, function onError(message, statusCode, statusList) {
        ngDialog.open({
          showClose: false,
          template:'templateTip',
          className: 'ngdialog-theme-default',
          controller: ['$scope', function($scope) {
              $scope.content = '操作が失敗しました。しばらくしてからもう一度お試しください。';
          }]
        });
      });
    }

    $scope.addMyPage = function(){
          $scope.addMyPage.favId = $scope.results.id;
          $scope.addMyPage.type = 18;
          apiService.postAddMyPage($scope.addMyPage, function onSuccess(result) {
            $scope.results.favorite = true;
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
          $scope.addMyPage.favId = $scope.results.id;
          $scope.addMyPage.type = 18;
          apiService.postRemoveMyPage($scope.addMyPage, function onSuccess(result) {
              $scope.results.favorite = false;
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

    $scope.loadScript = function () {
      var script=document.createElement("script");
      script.type="text/javascript";
      script.src="//ad-api-v01.uliza.jp/player.php?player_type=2&campaign=1841&pc_width=600";
      document.getElementById("ad").appendChild(script);
     }


    $('html,body').animate({scrollTop:0}, 0);
  }]);
