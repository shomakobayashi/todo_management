'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:EntryConfirmCtrl
 * @description
 * # EntryConfirmCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('EntryConfirmCtrl', ['$scope', '$location', '$window', 'ApiService','$routeParams',function ($scope, $location, $window, apiService,$routeParams) {
     $scope.hideFooter = true;
     $scope.carerrList = [
       '職業を選択',
       '中学生',
       '高校生',
       '専門学生',
       '大学生',
       '公務員',
       '自営業',
       '会社役員',
       '会社員',
       '派遣社員',
       '契約社員',
       '専業主婦',
       '専業主夫',
       'パート・アルバイト',
       'その他'];

      $scope.genderList = [
         '',
         '男性',
         '女性'];

     $scope.formData = {};
     var profileStr = $window.localStorage['profile'];
     if(profileStr){
       $scope.formData = JSON.parse(profileStr);
     }else{
       $location.path('/');
     }

     if(!$scope.formData.password){
       $scope.passwordHide = true;
     }else{
       $scope.passwordHide = false;
     }

     $scope.postRegist = function(){
       if($window.localStorage['registMail']){
         apiService.postMailRegist($scope.formData, function onSuccess(result) {
           $location.path('/entryEnd');
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
       }else{
         apiService.updatePerson($scope.formData, function onSuccess(result) {
           $location.path('/entryEnd');
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
