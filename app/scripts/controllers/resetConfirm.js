'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ForgetConfirmCtrl
 * @description
 * # ForgetConfirmCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('ResetConfirmCtrl', ['$scope', '$location', '$window', 'ApiService','$routeParams','ngDialog',function ($scope, $location, $window, apiService,$routeParams,ngDialog) {
     $scope.hideFooter = false;
     $scope.formData = {

     };
     $scope.logout = function(){
       $scope.dropdownMenuHide = true;
       apiService.postLogout(function onSuccess(resultList) {
         $scope.hasLogin = false;
       },function onError(message){});
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
        apiService.updatePerson({password: $scope.formData.new_password}, function onSuccess(result) {

          $scope.logout();
          $scope.dropdownMenuHide = true;
          $scope.hasLogin = false;
          $location.path('/resetEnd');
        }, function onError(message) {
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
    }

    $('html,body').animate({scrollTop:0}, 0);
  }]);
