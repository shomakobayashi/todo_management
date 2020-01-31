'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moveupApp
 */
angular.module('moveupApp')
  .controller('LoginCtrl', ['$scope', '$location', '$window', 'ApiService','ngDialog',function ($scope, $location, $window, apiService,ngDialog) {
    $scope.hideFooter = false;

    $scope.username = '';
    $scope.password = '';
    if($scope.hasLogin){
      $location.path('/');
    }else{
      $scope.login = function () {
        apiService.postLogin($scope.username, $scope.password, function onSuccess(result) {
          //$scope.UserIsloginF();
          $window.localStorage['uid'] = result.uid;
          window.history.back();
          //$location.path('/');
        }, function onError(message, statusCode, statusList) {
          if(statusCode === statusList.DATA_NOT_FOUND){
            message = 'ログインIDかパスワードが正しくありません。';
          }
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
    }
    
    $scope.signup = function(){
      $location.path('/signup');
    }

    $scope.gotoFacebook = function(){
      $window.location.href = apiService.getApiBase() + apiService.getApiPath().AUTH_FACEBOOK;
    }

    $scope.gotoTwitter = function(){
      $window.location.href = apiService.getApiBase() + apiService.getApiPath().AUTH_TWITTER;
    }
    $('html,body').animate({scrollTop:0}, 0);
  }]);
