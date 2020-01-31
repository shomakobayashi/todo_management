'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ApplicationOverCtrl
 * @description
 * # AboutCtrl
 * Controller of the moveupApp
 */
angular.module('moveupApp')
  .controller('ApplicationOverCtrl', function ($scope, $window) {
    $scope.hideFooter = false;
    $scope.content2 = '<span>※YahooメールやHotmail等のウェブメールをお使いの場合には、JAPAN MOVE UP WESTからのメールが自動的に迷惑メールとして振り分けられてしまう場合があります。</span></br>'+
     '<span>時間が経ってもメールが受信されない場合には、迷惑メールフォルダ等をご確認ください</span></br>'+
     '<span></span></br>'+
     '<span>※携帯電話アドレスをご入力された場合は、JAPAN MOVE UP WESTからのメールを受信できるように</span></br>'+
     '<span>『japanmoveupwest.com』のドメイン受信設定をお願いいたします。</span></br>'
    $window.localStorage.removeItem('newsDetailInfo');
	$window.localStorage.removeItem('reportDetailInfo');
    $window.localStorage.removeItem('eventDetailInfo');
    $('html,body').animate({scrollTop:0}, 0);
  });
