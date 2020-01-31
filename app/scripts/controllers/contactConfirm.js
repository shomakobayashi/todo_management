'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:NewsDetailCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('ContactConfirmCtrl', ['$scope', '$http', 'ApiService', '$window', '$location','ngDialog',function ($scope, $http, apiService, $window, $location,ngDialog) {
     $scope.hideFooter = false;
     $scope.TransferString = function(content){
          var string = content;
          try{
              string=string.replace(/\r\n/g,"<br/>");
              string=string.replace(/\n/g,"<br/>");
          }catch(e) {

          }
          return string;
      }

     var contactStr = $window.localStorage['contact'];
     if(contactStr){
       $scope.result = JSON.parse(contactStr);
       $scope.contactConfirmResult = JSON.parse(contactStr);
       $scope.result.contents = $scope.TransferString($scope.result.contents);
     }else{
       ngDialog.open({
         showClose: false,
         template:'templateTip',
         className: 'ngdialog-theme-default',
         controller: ['$scope', function($scope) {
             $scope.content = '操作が失敗しました。しばらくしてからもう一度お試しください。';
         }]
       });
     }

     $scope.contactConfirmEntry = function(){
       apiService.postContact($scope.contactConfirmResult, function onSuccess(result) {
         $location.path('/contactEnd');
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



     $('html,body').animate({scrollTop:0}, 0);
   }]);
