'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:NewsDetailCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('PurchaseInfoOverCtrl', ['$scope', 'ApiService', '$http','$window', function ($scope, apiService, $http ,$window) {
     $scope.hideFooter = false;
     $scope.payment = {};
     $scope.goodsList = {};
     $scope.paymentCvsResult = {};
     var myDate = new Date();

     var personStr = $window.localStorage['person'];
     if(personStr){
       $scope.person = JSON.parse(personStr);
     }else{
       apiService.getPerson(function onSuccess(resultList) {
          $scope.person = resultList;
       }, function onError(message) {

       });
     }

     var goodsStr = $window.localStorage['goods'];
     if(goodsStr){
       $scope.goods = JSON.parse(goodsStr);
       $scope.goodsList = $scope.goods.goodsList
     }else{
       apiService.postCart(function onSuccess(resultList){
          $scope.goods = resultList;
        }, function onError(message) {

        });
     }

     var methodSelStr = $window.localStorage['methodSel'];
     if(methodSelStr){
       $scope.method = JSON.parse(methodSelStr);
     }
     var purchaseInfoStr = $window.localStorage['purchaseInfos'];
     if(purchaseInfoStr){
       $scope.result = JSON.parse(purchaseInfoStr);
     }

     var paymentCvsResultStr = $window.localStorage['paymentCvsResult'];
     if(paymentCvsResultStr){
       $scope.paymentCvsResult = JSON.parse(paymentCvsResultStr);
     }

     $scope.getTheDate = function(date){
        $scope.fullDate = date;
        $scope.yearDate = $scope.fullDate.substr(0,4);
        $scope.monthDate = $scope.fullDate.substr(4,2);
        $scope.dayDate = $scope.fullDate.substr(6,2);
        $scope.hourDate = $scope.fullDate.substr(8,2);
        $scope.minuteDate = $scope.fullDate.substr(10,2);
        return $scope.yearDate + "年 " + $scope.monthDate + "月 " +$scope.dayDate + "日 " +$scope.hourDate + "：" +$scope.minuteDate;
     }

     if($scope.paymentCvsResult.tranDate != "" && $scope.paymentCvsResult.tranDate != null && $scope.paymentCvsResult.tranDate != undefined){
         $scope.ternDate = $scope.getTheDate($scope.paymentCvsResult.tranDate);
     }
     if($scope.paymentCvsResult.paymentTerm != "" && $scope.paymentCvsResult.paymentTerm != null && $scope.paymentCvsResult.paymentTerm != undefined){
         $scope.termDate = $scope.getTheDate($scope.paymentCvsResult.paymentTerm);
     }

     $scope.goods.totalPrice = $scope.goods.totalPrice;
     $scope.payment.orderID = $scope.goods.serialNumber;

     $scope.GoodsContent = '';
     $scope.content = ''

     for(var i =0; i < $scope.goods.goodsList.length; i++){
       $scope.GoodsContent +='<p>■注文数：' + $scope.goods.goodsList[i].quantity + ' 点</p>'
       $scope.GoodsContent +='<p>■商品名：' + $scope.goods.goodsList[i].goodsName + '</p>'
       if($scope.goods.goodsList[i].colors == 1){
         $scope.GoodsContent +='<p>・カラー：黒い</p>'
       }else if ($scope.goods.goodsList[i].colors == 2) {
         $scope.GoodsContent +='<p>・カラー：白い</p>'
       }else{
         $scope.GoodsContent +='<p>・カラー：色なし</p>'
       }
       if($scope.goods.goodsList[i].size == 1){
         $scope.GoodsContent +='<p>・サイズ：XS</p>'
       }else if ($scope.goods.goodsList[i].size == 2) {
         $scope.GoodsContent +='<p>・サイズ：S</p>'
       }else if ($scope.goods.goodsList[i].size == 3) {
         $scope.GoodsContent +='<p>・サイズ：M</p>'
       }else if ($scope.goods.goodsList[i].size == 4) {
         $scope.GoodsContent +='<p>・サイズ：L</p>'
       }else if ($scope.goods.goodsList[i].size == 5) {
         $scope.GoodsContent +='<p>・サイズ：XL</p>'
       }else{
         $scope.GoodsContent +='<p>・サイズ：フリーサイズ</p>'
       }
       $scope.GoodsContent +='<p>■小計：' + $scope.goods.goodsList[i].price + '円</p>'
       $scope.GoodsContent +='<p>■消費税：' + ($scope.goods.goodsList[i].price/1.08)*0.08 + '円</p><br>'
     }
     $scope.content = '<p>' + $scope.person.firstName + ' ' + $scope.person.secondName + '様</p><br>' +
                      '<p>この度は、MOVE UP GOODSをご利用いただき、誠にありがとうございます。</p>' +
                      '<p>下記内容にて、ご注文を承りました。</p><br>' +
                      '<p>ご注文番号：' + $scope.goods.serialNumber + '</p>'
      if($scope.paymentCvsResult.orderID != "" && $scope.paymentCvsResult.orderID != null && $scope.paymentCvsResult.orderID != undefined){
          $scope.content += '<p>オーダーID：' + $scope.paymentCvsResult.orderID + '</p>'
      }
      if($scope.paymentCvsResult.confNo != "" && $scope.paymentCvsResult.confNo != null && $scope.paymentCvsResult.confNo != undefined){
          $scope.content += '<p>確認番号：' + $scope.paymentCvsResult.confNo + '</p>'
      }
      if($scope.paymentCvsResult.receiptNo != "" && $scope.paymentCvsResult.receiptNo != null && $scope.paymentCvsResult.receiptNo != undefined){
          $scope.content += '<p>受付番号：' + $scope.paymentCvsResult.receiptNo + '</p>'
      }
      if($scope.paymentCvsResult.paymentTerm != "" && $scope.paymentCvsResult.paymentTerm != null && $scope.paymentCvsResult.paymentTerm != undefined){
          $scope.content += '<p>支払期限日時：' + $scope.termDate + '</p>'
      }
      if($scope.paymentCvsResult.receiptUrl != "" && $scope.paymentCvsResult.receiptUrl != null && $scope.paymentCvsResult.tranDate != undefined){
          $scope.content += '<p>払込票 URL：' + $scope.paymentCvsResult.receiptUrl + '</p>'
      }
      if($scope.paymentCvsResult.tranDate != "" && $scope.paymentCvsResult.tranDate != null && $scope.paymentCvsResult.tranDate != undefined){
          $scope.content += '<p>決済日付：' + $scope.ternDate + '</p>'
      }else{
          $scope.content += '<p>ご注文日時：' + myDate.getFullYear()+'年'+ myDate.getMonth()+'月'+ myDate.getDate()+ '日' + '</p><br>'
      }
      $scope.content += '<p>商品出荷時に、発送完了メールをお送りさせていただきます。</p>' +
                        '<p>商品の出荷はご注文日より、通常7営業日(土日祝除く)となります。</p>' +
                        '<p>※ご注文が集中した場合や連休の前後は、お届けが遅れる場合もございますので予めご了承ください。</p><br>' +
                        '<hr><br>' +

                        '<p>【ご注文内容】</p><br>' +
                        $scope.GoodsContent +
                        '<hr><br>' +
                        '<p>送料：700円</p>' +
                        '<p>決算方法：クレジットカード払い</p>' +
                        '<p>合計金額：' + $scope.goods.totalPrice + '円</p><br>' +
                        '<hr><br>' +
                        '<p>【お客様ご住所】</p><br>' +
                        '<p>' + $scope.person.firstName + ' ' + $scope.person.secondName +  '様</p>' +
                        '<p>■ご住所</p>' +
                        '<p>〒 '+ $scope.person.zipcode +'</p>' +
                        '<p>'+ $scope.person.address +'</p>' +
                        '<p>■電話番号</p>' +
                        '<p>'+ $scope.result.tel +'</p>' +
                        '<p>■メールアドレス</p>' +
                        '<p>'+ $scope.person.mail +'</p><br>' +
                        '<hr><br>' +
                        '<p>【配送先ご住所】</p><br>' +
                        '<p>' + $scope.result.firstName1 + ' ' + $scope.result.lastName1 +  '様</p>' +
                        '<p>■ご住所</p>' +
                        '<p>〒 '+ $scope.result.zipCode +'</p>' +
                        '<p>'+ $scope.result.address1 +'</p>' +
                        '<p>■電話番号</p>' +
                        '<p>'+ $scope.result.tel +'</p>' +
                        '<hr><br>' +
                        '<p>【お支払い方法】</p><br>' +
                        '<p>クレジットカード払い</p>' +
                        '<p>※</p><br>' +
                        '<hr><br>' +
                        '<p>本メールにお心当たりがない場合は、お手数ですが下記フォームよりご連絡をお願いいたします。</p>' +
                        // 'URL：<a href='purchaseHistory' +  + ''>' + goods.getUrl1() + '</a></p>' +
                        '<p>本メールは、送信専用となっております。返信いただいてもご連絡できませんのでご了承ください。ご不明な点や質問等がございましたら、下記「お客様お問い合わせ窓口」よりお問い合わせください。</p><br>' +
                        '<hr><br>' +
                        '<p>【お客様お問い合わせ窓口】</p>' +
                        '<p>086-250-8089 (平日13:00〜18:00)</p>' +
                        '<p>※土日祝、年末年始、夏季休暇、GWを除く</p><br>' +
                        '<p>■購入履歴の確認方法</p>' +
                        '<p>JAPAN MOVE UP WEST WEBよりログインし、マイページの購入履歴よりご確認ください。</p><br>' +
                        // 'URL：<a href='' + goods.getUrl2() + ''>' + goods.getUrl2() + '</a></p><br>' +
                        '<hr><br>' +
                        '<p>JAPAN MOVE UP WEST</p>'

     $('html,body').animate({scrollTop:0}, 0);
   }]);
