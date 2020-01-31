'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:PaymentCvsCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('PaymentCvsCtrl', ['$scope', '$http', 'ApiService', '$window', '$location','ngDialog',function ($scope, $http, apiService, $window, $location, ngDialog) {
      $scope.hideFooter = false;
      $scope.payment = {};
      $scope.payment.cardNo = '';
      $scope.payment.expire = '';
      $scope.payment.securityCode = '';
      $scope.payment.goodsID = '';
      $scope.payment.name = '';

      var goodsStr = $window.localStorage['goods'];
      if(goodsStr){
        $scope.goods = JSON.parse(goodsStr);
      }else{
        $location.path('/');
      }
      var emailStr = $window.localStorage['email'];
      $scope.email = JSON.parse(emailStr);

      $scope.postPaymentCvs = function(){
        var totalPrice = $scope.goods.totalPrice;
        var tax = 0;
        $scope.payment.tax = tax;
        $scope.payment.amount = totalPrice;
        $scope.payment.orderID = $scope.goods.serialNumber;
        $scope.payment.mail = $scope.email;
        $scope.payment.telNo  = $scope.formData.tel;
        $scope.payment.customerName = $scope.formData.firstName + " " + $scope.formData.secondName;
        $scope.payment.customerKana = $scope.formData.firstNameKana + " " + $scope.formData.secondNameKana;
        // alert("tax="+$scope.payment.tax+";amount="+$scope.payment.amount+";orderID="+$scope.payment.orderID+";mail="+$scope.payment.mail+";telNo="+$scope.payment.telNo+";customerName="+$scope.payment.customerName+";customerKana="+$scope.payment.customerKana);
        apiService.postPaymentCvs($scope.payment, function onSuccess(result) {
         if(result.errList.length == 0){
           apiService.postPurchaseEnd($scope.payment, function onSuccess(result) {
           }, function onError(message) {

           });
           $window.localStorage['paymentCvsResult'] = JSON.stringify(result);
           $location.path('/purchaseInfoOver');
         }else{
           var message = "";
           for(var index in result.errList){
             if(result.errList[index].errCode == "E01"){
               message = 'カード情報の記入が正しくない。';
             }else if(result.errList[index].errCode == "G02" || result.errList[index].errCode == "G04"){
               message = '残高不足。';
             }else if(result.errList[index].errCode == "G03" || result.errList[index].errCode == "G05" || result.errList[index].errCode == "G55"){
               message = '限度額オーバー。';
             }else if(result.errList[index].errCode == "G12" || result.errList[index].errCode == "G22" || result.errList[index].errCode == "G54"){
               message = '取扱不可。';
             }else if(result.errList[index].errCode == "G02"){
               message = 'このカードでは取引をする事が出来ません。';
             }else if(result.errList[index].errCode == "G42"){
               message = '暗証番号エラー。';
             }else if(result.errList[index].errCode == "G44"){
               message = 'セキュリティコード誤り。';
             }else if(result.errList[index].errCode == "G45"){
               message = 'セキュリティコード入力無。';
             }else if(result.errList[index].errCode == "G56"){
               message = 'カード取り込み。';
             }else if(result.errList[index].errCode == "G60"){
               message = '事故カード。';
             }else if(result.errList[index].errCode == "G61"){
               message = '無効カード。';
             }else if(result.errList[index].errCode == "G83"){
               message = '有効期限エラー。';
             }else{
               message = 'お支払いのミスは後にしてみてください。';
             }
           }
           ngDialog.open({
             showClose: false,
             template:'templateTip',
             className: 'ngdialog-theme-default',
             controller: ['$scope', function($scope) {
                 $scope.content = message ;
             }]
           });
         }
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
