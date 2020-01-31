'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:PaymentCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('PaymentCtrl', ['$scope', '$http', 'ApiService', '$window', '$location','ngDialog',function ($scope, $http, apiService, $window, $location,ngDialog) {
      $scope.hideFooter = false;
      $scope.payment = {};
      $scope.payment.cardNo = '';
      $scope.payment.expire = '';
      $scope.payment.securityCode = '';
      $scope.payment.goodsID = '';
      $scope.payment.name = '';

      $scope.selectHide0 = true;
      $scope.selectHide1 = true;
      $scope.selectDesc1 = '01';
      $scope.selectContent1 = '01';
      $scope.selectHide2 = true;
      $scope.selectDesc2 = '18';
      $scope.selectContent2 = '18';

      var goodsStr = $window.localStorage['goods'];
      if(goodsStr){
        $scope.goods = JSON.parse(goodsStr);
      }else{
        $location.path('/');
      }
      $scope.shopCloseAllSelect = function () {
        $scope.selectHide0 = true;
        $scope.selectHide1 = true;
        $scope.selectHide2 = true;
      }
      $scope.shopSelect1 = function () {
        $scope.selectHide1 = false;
        $scope.selectHide0 = false;
      }
      $scope.shopCloseSelect1 = function () {
        $scope.selectHide1 = true;
        $scope.selectHide0 = true;
      }
      $scope.shopSelectValue1 = function (desc,content) {
        $scope.selectDesc1 = desc;
        $scope.selectContent1 = content;
      }

      $scope.shopSelect2 = function () {
        $scope.selectHide2 = false;
        $scope.selectHide0 = false;
      }
      $scope.shopCloseSelect2 = function () {
        $scope.selectHide2 = true;
        $scope.selectHide0 = true;
      }
      $scope.shopSelectValue2 = function (desc,content) {
        $scope.selectDesc2 = desc;
        $scope.selectContent2 = content;
      }

      $scope.postPayment = function(){
        var totalPrice = $scope.goods.totalPrice;
        var tax = 0;
        $scope.payment.tax = tax;
        $scope.payment.amount = totalPrice;
        $scope.payment.orderID = $scope.goods.serialNumber;
        $scope.payment.expire = $scope.selectDesc2 + $scope.selectDesc1;
        $scope.payment.goodsID = $scope.goods.goodsList[0].id;
        apiService.postPayment($scope.payment, function onSuccess(result) {
         if(result.errList.length == 0){
           apiService.postPurchaseEnd($scope.payment, function onSuccess(result) {

           }, function onError(message) {

           });
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
