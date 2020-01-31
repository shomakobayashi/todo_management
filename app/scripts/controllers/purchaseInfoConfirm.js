'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:NewsDetailCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('PurchaseInfoConfirmCtrl', ['$scope', '$http', 'ApiService', '$window', '$location','ngDialog',function ($scope, $http, apiService, $window, $location,ngDialog) {
     $scope.hideFooter = false;
     $scope.result = {};
     $scope.result.serialNumber = '';
     apiService.postCart(function onSuccess(resultList){
        $scope.results = resultList;
        $scope.result.serialNumber = $scope.results.serialNumber;
        $scope.results.totalPrice = $scope.results.totalPrice*1.08;
        for(var index in $scope.results.goodsList){
          $scope.results.goodsList[index].price = $scope.results.goodsList[index].price*1.08;
        }
      }, function onError(message) {

      });

     apiService.getPerson(function onSuccess(resultList) {
        $scope.person = resultList;
        $scope.result.email = $scope.person.mail;
     }, function onError(message) {

     });

     var purchaseInfoStr = $window.localStorage['purchaseInfo'];
     var methodSelStr = $window.localStorage['methodSel'];
     $scope.method = JSON.parse(methodSelStr);
     if(purchaseInfoStr){
       $scope.result = JSON.parse(purchaseInfoStr);
       $window.localStorage['purchaseInfos'] = JSON.stringify($scope.result);
     }else{
       $location.path('/');
     }

     $scope.postPurchaseInfoConfirm = function(){
       $scope.results.totalPrice = $scope.results.totalPrice+700;
       if($scope.method == 1){
         apiService.postPurchaseInfoConfirm($scope.result, function onSuccess(result) {
           $window.localStorage['goods'] = JSON.stringify($scope.results);
           $window.localStorage['person'] = JSON.stringify($scope.person);
           $location.path('/payment');
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
         apiService.postPurchaseInfoConfirm($scope.result, function onSuccess(result) {
           $window.localStorage['goods'] = JSON.stringify($scope.results);
           $window.localStorage['person'] = JSON.stringify($scope.person);
           $window.localStorage['email'] = JSON.stringify($scope.result.email);
           $location.path('/paymentCvs');
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
