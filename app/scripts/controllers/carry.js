'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:CarryCtrl
 * @description
 * # CarryCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('CarryCtrl', ['$scope', '$location', '$window', 'ApiService','$routeParams','ngDialog',function ($scope, $location, $window, apiService,$routeParams,ngDialog) {
      $scope.formData = [];
      $scope.errStr = '';

      $scope.selectHide0 = true;
      $scope.selectHide1 = true;
      $scope.selectDesc1 = "貴店の業種";
      $scope.selectContent1 = '';

      $scope.onzipcodeChanged = function() {
        AjaxZip3.zip2addr(document.getElementById('zipcode1'),'','address','address');
      }

      $scope.shopCloseAllSelect = function () {
        $scope.selectHide0 = true;
        $scope.selectHide1 = true;
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

      $scope.gotoConfirm = function(){
       $('#errContainer').children().remove();
       if(!$scope.formData.shopName){
         $('#errContainer').append('<div id="shopName.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・貴店名入力してください。</div>');
       }
       if(!$scope.formData.companyName){
         $('#errContainer').append('<div id="companyName.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・ご担当社名を入力してください。</div>');
       }
       $scope.formData.shopType = $scope.selectContent1;
       if($scope.formData.shopType == ''){
         $('#errContainer').append('<div id="shopType.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・貴店の業種を入力してください。</div>');
       }
       if(!$scope.formData.zipcode){
         $('#errContainer').append('<div id="zipcode1.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・郵便番号前半を入力してください。</div>');
       }
       $scope.formData.address = $('#address').val();
       if(!$scope.formData.address){
         $('#errContainer').append('<div id="address.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・住所を入力してください。</div>');
       }
       if(!$scope.formData.tel){
         $('#errContainer').append('<div id="tel.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・電話番号スを入力してください。</div>');
       }
       if(!$scope.formData.mail){
         $('#errContainer').append('<div id="mail.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・メールアドレスを入力してください。</div>');
       }
       if(!$scope.formData.content){
         $('#errContainer').append('<div id="content.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・お問合せ内容を入力してください。</div>');
       }
       if($('#errContainer').children().length == 0 ){
         apiService.postCarry($scope.formData, function onSuccess(result) {
           $location.path('/carryOver');
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
