'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:PurchaseCartCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
     .controller('PurchaseCartCtrl', ['$scope', '$http', '$timeout', 'ApiService', '$location', 'ngDialog', function ($scope, $http, $timeout, apiService, $location, ngDialog) {
       $scope.hideFooter = true;
       $scope.hideBtn = true;
       apiService.postCart(function onSuccess(resultList){
         $scope.hideFooter = false;

          $scope.results = resultList;
          $scope.results.totalPrice = $scope.results.totalPrice*1.08;
          for(var index in $scope.results.goodsList){
            $scope.results.goodsList[index].price = $scope.results.goodsList[index].price*1.08;
          }

          if(resultList.goodsList.length>0){
            $scope.hideBtn = false;
          }
        }, function onError(message) {

        });
        $scope.outCart = {};
        $scope.postEditCart = function(){
          var formData = {};
          for(var index in $scope.results.goodsList){
            formData['cartList['+index+'].id'] = $scope.results.goodsList[index].id;
            formData['cartList['+index+'].price'] = parseInt($scope.results.goodsList[index].price);
            formData['cartList['+index+'].quantity'] = $scope.results.goodsList[index].quantity;
            // cartList.push({
            //   id:$scope.results.goodsList[index].id,
            //   price:$scope.results.goodsList[index].price,
            //   quantity:$scope.results.goodsList[index].quantity});
          }
           // var formData = [{"cartList",cartList}]
          apiService.postEditCart(formData, function onSuccess(result) {
            $location.path('/purchaseInfoMation');
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

        $scope.postOutCart = function(id){
            $scope.outCart.id = id;
            if($scope.outCart.id){
              apiService.postOutCart($scope.outCart, function onSuccess(result) {
              var message = 'ショッピングカートのものは正常に削除されました。';
              apiService.postCart(function onSuccess(resultList){
                 $scope.results = resultList;
               })
              ngDialog.open({
                showClose: false,
                template:'templateTip',
                className: 'ngdialog-theme-default',
                controller: ['$scope', function($scope) {
                    $scope.content = message;
                }]
              });
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

        $scope.onSub = function(goods){
          if(goods.quantity == 1){
            return;
          }
          var singlePrice = goods.price / goods.quantity;
          var totalPrice = $scope.results.totalPrice;
          goods.quantity --;
          goods.price = singlePrice * goods.quantity;
          $scope.results.totalPrice = totalPrice - singlePrice;
        }

        $scope.onAdd = function(goods){
          var singlePrice = goods.price / goods.quantity;
          var totalPrice = $scope.results.totalPrice - goods.price;
          goods.quantity ++;
          goods.price = singlePrice * goods.quantity;
          $scope.results.totalPrice = totalPrice + goods.price;
        }

/*
        $timeout(function() {
          var goodsNo = 0;
            $(".goodsCart_goods").each(function(){
            	goodsNo +=1;
            })
            var cart_box = [];
            var cartsp_box = [];
            for (var i = 1; i <= goodsNo; i++) {
            	cart_box[i] = $("#cart_box"+i+"");
            	cartsp_box[i] = $("#cartsp_box"+i+"");
            }
            for (var i = 1; i <= goodsNo; i++) {
            	$("#cart_add"+i+"").click(function(){
            	var str = $(this).attr("id").replace(/[^0-9]/ig, "");
            	var n = parseInt(str);
                cart_box[n].val(parseInt(cart_box[n].val())+1);
                setTotal();
        	    })
        	    $("#cart_sub"+i+"").click(function(){
        	    	var str = $(this).attr("id").replace(/[^0-9]/ig, "");
        	    	var n = parseInt(str);
        	    	if(cart_box[n].val()>1){
        		        cart_box[n].val(parseInt(cart_box[n].val())-1);
        		    }
        	        setTotal();
        	    })
            }
            function setTotal(){
            	var singlePrice = [];
            	for (var i = 1; i <= goodsNo; i++) {
            		singlePrice[i] = parseInt($("#singlePrice"+i+"").text());
            		document.getElementById("cartTotal"+i+"").innerHTML = singlePrice[i]*parseInt(cart_box[i].val());
            	}
                var totalPrice = 0;
                for (var i = 1; i <= goodsNo; i++) {
                	var a = $("#cartTotal"+i+"").text();
                	totalPrice = totalPrice + parseInt(a);
                	document.getElementById("totalPrice").innerHTML = totalPrice;
                }
            }

            for (var i = 1; i <= goodsNo; i++) {
            	$("#cartsp_add"+i+"").click(function(){
            	var str = $(this).attr("id").replace(/[^0-9]/ig, "");
            	var n = parseInt(str);
                cartsp_box[n].val(parseInt(cartsp_box[n].val())+1);
                setTotalsp();
        	    })
        	    $("#cartsp_sub"+i+"").click(function(){
        	    	var str = $(this).attr("id").replace(/[^0-9]/ig, "");
        	    	var n = parseInt(str);
        	    	if(cartsp_box[n].val()>1){
        		        cartsp_box[n].val(parseInt(cartsp_box[n].val())-1);
        		    }
        	        setTotalsp();
        	    })
            }
            function setTotalsp(){
            	var singlePrice = [];
            	for (var i = 1; i <= goodsNo; i++) {
            		singlePrice[i] = parseInt($("#singlePricesp"+i+"").text());
            		document.getElementById("cartTotalsp"+i+"").innerHTML = singlePrice[i]*parseInt(cartsp_box[i].val());
            	}
                var totalPrice = 0;
                for (var i = 1; i <= goodsNo; i++) {
                	var a = $("#cartTotalsp"+i+"").text();
                	totalPrice = totalPrice + parseInt(a);
                	document.getElementById("totalPricesp").innerHTML = totalPrice;
                }
            }

          }, 500);
*/
     $('html,body').animate({scrollTop:0}, 0);
   }]);
