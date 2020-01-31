'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ForgetConfirmCtrl
 * @description
 * # ForgetConfirmCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('ForgetConfirmCtrl', ['$scope', '$location', '$window', 'ApiService','$routeParams','ngDialog',function ($scope, $location, $window, apiService,$routeParams,ngDialog) {
     $scope.hideFooter = false;
     $scope.formData = {

     };

     if($window.localStorage['forgetMail']){
       $scope.formData.mail = $window.localStorage['forgetMail'];
     }else{
       $location.path('/');
     }
    $scope.postReset = function () {
      var errMsg = '';
      if(!$scope.formData.new_password){
        errMsg = '新しいパスワードを入力してください。';
      }else if($scope.formData.new_password.length < 6){
        errMsg = 'パスワードは6文字以上で入力してください。';
      }else if($scope.formData.new_password != $scope.formData.new_password_repeat){
        errMsg = 'パスワードが一致していません。';
      }
      if(errMsg){
        ngDialog.open({
          showClose: false,
          template:'templateTip',
          className: 'ngdialog-theme-default',
          controller: ['$scope', function($scope) {
              $scope.content = errMsg;
          }]
        });
      }else{
        apiService.postMailReset($scope.formData, function onSuccess(result) {
          $location.path('/forgetEnd');
        }, function onError(message, statusCode, statusList) {
          if(statusCode === statusList.DATA_NOT_FOUND){
            message = 'このメールアドレスは存在しません。';
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

    $('html,body').animate({scrollTop:0}, 0);
  }]);
