'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:NewsDetailCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('PurchaseInfoMationCtrl', ['$scope', '$http', 'ApiService', '$window', '$location','ngDialog',function ($scope, $http, apiService, $window, $location,ngDialog) {
     $scope.hideFooter = true;
     $scope.info = {};
     $scope.formData = {};
     apiService.getPerson(function onSuccess(resultList) {
         $scope.hideFooter = false;
         $scope.person = resultList;
     }, function onError(message) {

     });



     $scope.infoType = '';
     $scope.postPurchaseInfo = function(){
       if($scope.infoType == 2){
         $scope.formData.firstName1 = $scope.info.firstName1;
         $scope.formData.lastName1 = $scope.info.lastName1;
         $scope.formData.firstName2 = $scope.info.firstName2;
         $scope.formData.lastName2 = $scope.info.lastName2;
         $scope.formData.zipCode = $scope.info.zipCode;
         $scope.formData.address1 = $scope.info.address1;
         $scope.formData.mail = $scope.person.mail;
         $scope.formData.tel = $scope.info.tel;
         $scope.formData.method = $scope.methodSel;
         if(
            $scope.info.firstName1 == '' || $scope.info.firstName1 == null ||
            $scope.info.lastName1 == ''  || $scope.info.firstName2 == null ||
            $scope.info.firstName2 == ''  || $scope.info.lastName2 == null ||
            $scope.info.lastName2 == ''  || $scope.info.lastName2 == null ||
            $scope.info.zipCode == ''  || $scope.info.zipCode == null ||
            $scope.info.address1 == ''  || $scope.info.address1 == null ||
            $scope.methodSel == undefined
         ){
           ngDialog.open({
             showClose: false,
             template:'templateTip',
             className: 'ngdialog-theme-default',
             controller: ['$scope', function($scope) {
                 $scope.content = '完全な情報を記入してください。';
             }]
           });
         }else{
           apiService.postPurchaseInfo($scope.formData, function onSuccess(resultList) {
             $scope.result = resultList;
             $window.localStorage['purchaseInfo'] = JSON.stringify($scope.result);
             $window.localStorage['methodSel'] = JSON.stringify($scope.methodSel);
             $location.path('/purchaseInfoConfirm');
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
       }else{
         $scope.formData.firstName1 = $scope.info.firstName1;
         $scope.formData.lastName1 = $scope.info.lastName1;
         $scope.formData.firstName2 = $scope.info.firstName2;
         $scope.formData.lastName2 = $scope.info.lastName2;
         $scope.formData.zipCode = $scope.info.zipCode;
         $scope.formData.address1 = $scope.info.address1;
         $scope.formData.mail = $scope.person.mail;
         $scope.formData.tel = $scope.info.tel;
         $scope.formData.method = $scope.methodSel;
         if(
            $scope.info.firstName1 == '' || $scope.info.firstName1 == null ||
            $scope.info.lastName1 == ''  || $scope.info.firstName2 == null ||
            $scope.info.firstName2 == ''  || $scope.info.lastName2 == null ||
            $scope.info.lastName2 == ''  || $scope.info.lastName2 == null ||
            $scope.info.zipCode == ''  || $scope.info.zipCode == null ||
            $scope.info.tel == ''  || $scope.info.tel == null ||
            $scope.info.address1 == ''  || $scope.info.address1 == null ||
            $scope.methodSel == undefined
         ){
           ngDialog.open({
             showClose: false,
             template:'templateTip',
             className: 'ngdialog-theme-default',
             controller: ['$scope', function($scope) {
                 $scope.content = '完全な情報を記入してください。';
             }]
           });
         }else{
           apiService.postPurchaseInfo($scope.formData, function onSuccess(resultList) {
             $scope.hideFooter = false;
             $scope.result = resultList;
             $window.localStorage['purchaseInfo'] = JSON.stringify($scope.result);
             $window.localStorage['methodSel'] = JSON.stringify($scope.methodSel);
             $location.path('/purchaseInfoConfirm');
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
     }

     $scope.upInfo = function(){
       $scope.info.firstName1 = $scope.person.firstName;
       $scope.info.lastName1 = $scope.person.secondName;
       $scope.info.firstName2 = $scope.person.firstNameKana;
       $scope.info.lastName2 = $scope.person.secondNameKana;
       $scope.info.zipCode = $scope.person.zipcode;
       $scope.info.address1 = $scope.person.address;
     }
     $scope.downInfo = function(){
       $scope.info.firstName1 = '';
       $scope.info.lastName1 = '';
       $scope.info.firstName2 = '';
       $scope.info.lastName2 = '';
       $scope.info.zipCode = '';
       $scope.info.address1 = '';
     }


     $('html,body').animate({scrollTop:0}, 0);
   }]);
