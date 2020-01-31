'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ForgetEndCtrl
 * @description
 * # ForgetEndCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('ResetEndCtrl', ['$scope', '$location', '$timeout', 'ApiService','$routeParams',function ($scope, $location, $timeout, apiService,$routeParams) {
     $scope.hideFooter = false;

     // $scope.title = 'パスワードの設定が完了致しました。';
     // $scope.content = 'パスワードの設定が完了致しました。<br>再度ログインしてください。';
     // $scope.logout = function(){
     //   $scope.dropdownMenuHide = true;
     //   apiService.postLogout(function onSuccess(resultList) {
     //
     //   },function onError(message){});
     // }
     // $scope.logout();
     apiService.getPersonHeader(function onSuccess(resultList) {
       $scope.dropdownMenuHide = true;
       $scope.hasLogin = false;
       if(resultList.header){
         $scope.headerUrl = resultList.header;
       }else{
         $scope.headerUrl = '/images/thumbnail.png';
       }
       if(resultList.nickname){
         $scope.headerName = resultList.nickname;
       }else{
         $scope.headerName = '';
       }
     },function onError(message){

     });
     $('html,body').animate({scrollTop:0}, 0);
  }]);
