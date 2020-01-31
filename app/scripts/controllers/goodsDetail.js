'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:GoodsDetailCtrl
 * @description
 * # rise
 * Controller of the rise
 */
angular.module('moveupApp')
 .controller('GoodsDetailCtrl', ['$scope', '$http', '$timeout', 'ApiService', '$location','ngDialog','$routeParams',function ($scope, $http, $timeout, apiService, $location,ngDialog,$routeParams) {
   $scope.hideFooter = false;
   $scope.price = '';
   $scope.cart = {};
   $scope.addMyPage = {};
   $scope.hideAddMypageButtons = true;
   $scope.hideRemoveMypageButtons = true;

   $scope.selectHide0 = true;
   $scope.selectHide1 = true;
   $scope.selectDesc1 = "カテゴリー選択";
   $scope.selectContent1 = 0;
   $scope.selectHide2 = true;
   $scope.selectDesc2 = "価格帯を選択";
   $scope.selectContent2 = 0;

   apiService.postCart(function onSuccess(resultList){
   $scope.resultsCart = resultList;
   if ($scope.resultsCart.count == 0) {
     $scope.expression = true;
   } else {
     $scope.expression = false;
   }
 }, function onError(message) {
 });


   if($routeParams.uuid){
     $scope.hideFooter = true;
    apiService.getGoodsDetail($routeParams.uuid, function onSuccess(resultList){
      $scope.hideFooter = false;
       $scope.results = resultList;
       $scope.MyPageStatus();
       $scope.price = toMoney($scope.results[0].price);
       $scope.cart.goodsId = $scope.results[0].id;
       $scope.cart.price = $scope.results[0].price;
     })
   };
   var num = $scope.price;

   function toMoney(num){
    num = num.toFixed(2);
    num = parseFloat(num)
    num = num.toLocaleString();
    return num;
  };

   $timeout(function() {
     var primaryGoods = $("#carousel-goods");
     var secondaryGoods = $("#thumbnails-goods");
     $(document).ready(function() {
       primaryGoods.owlCarousel({
         items: 1,
         singleItem: true,
         itemsScaleUp : true,
         slideSpeed: 500
       });
       secondaryGoods.owlCarousel({
         items                 : 9,
         itemsDesktop          : [1200,8],
         itemsDesktopSmall     : [992,7],
         itemsTablet           : [768,6],
         itemsMobile           : [480,4],
         pagination            : false,
         responsiveRefreshRate : 100,
         navigation            : true,
         navigationText        : ["",""],
         afterInit             : function(el) {
           el.find(".owl-item").eq(0).addClass("synced");
         }
       });

       secondaryGoods.on("click", ".owl-item", function(e) {
         e.preventDefault();
         var number = $(this).index();
         primaryGoods.trigger("to.owl.carousel",number);
       });
     });
   }, 2000);

   //todo

   $scope.cart.quantity = 1;
   $scope.cart.color = 1;
   $scope.cart.size = 1;

   $scope.postAddCart = function(){
     apiService.postAddCart($scope.cart, function onSuccess(result) {
       var message = 'ショッピングカートに追加されました。';

       ngDialog.open({
         showClose: false,
         template:'templateTip',
         className: 'ngdialog-theme-default',
         controller: ['$scope', function($scope) {
             $scope.content = message;
         }]
       });
       apiService.postCart(function onSuccess(resultList){
         $scope.resultsCart = resultList;
         if ($scope.resultsCart.count == 0) {
           $scope.expression = true;
         } else {
           $scope.expression = false;
         }
      }, function onError(message) {
        });
     }, function onError(message) {
       alert('操作が失敗しました。しばらくしてからもう一度お試しください。');
     });
   }

   $scope.addMyPage = function(){
         $scope.addMyPage.favId = $scope.results[0].id;
         $scope.addMyPage.type = 15;
         apiService.postAddMyPage($scope.addMyPage, function onSuccess(result) {
           $scope.hideAddMypageButtons = true;
           $scope.hideRemoveMypageButtons = false;
       }, function onError(message) {
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = 'お気に入りに登録済みです。';
           }]
         });
       });
   }

   $scope.RemoveMyPage = function(){
         $scope.addMyPage.favId = $scope.results[0].id;
         $scope.addMyPage.type = 15;
         apiService.postRemoveMyPage($scope.addMyPage, function onSuccess(result) {
           $scope.hideAddMypageButtons = false;
           $scope.hideRemoveMypageButtons = true;
       }, function onError(message) {
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = 'お気に入りに登録済みです。';
           }]
         });
       });
   }

   $scope.MyPageStatus = function(){
         apiService.getMyPageStatus($scope.results[0].id,15,function onSuccess(result) {
           if(result.status == 1){
             $scope.hideAddMypageButtons = true;
             $scope.hideRemoveMypageButtons = false;
           }else{
             $scope.hideAddMypageButtons = false;
             $scope.hideRemoveMypageButtons = true;
           }
       }, function onError(message, statusCode, statusList) {

       });
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

   $('html,body').animate({scrollTop:0}, 0);
 }]);
