'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:SettingsCtrl
 * @description
 * # ForgetEndCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('SettingsCtrl', ['$scope', '$location', '$window', 'ApiService',function ($scope, $location, $window, apiService) {

     $scope.area = 0;


     $scope.getData = function () {
       if($scope.hasPerson == false){
         $location.path('/entry');
       }
       $scope.getSettings = function () {
         apiService.getSettings(function onSuccess(resultList) {
           $scope.result = resultList;

         },function onError(message){

         });
       }, function onError(message) {
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

     $('html,body').animate({scrollTop:0}, 0);
  }]);
