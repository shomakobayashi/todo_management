'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('ForgetCtrl', ['$scope', '$location', '$window', 'ApiService','$routeParams','ngDialog',function ($scope, $location, $window, apiService,$routeParams,ngDialog) {
     $scope.hideFooter = false;
       $scope.title = 'パスワードの再発行';
       $scope.content = 'JAPAN MOVE UP WESTにログインするためのパスワードを忘れた場合、以下のフォームにご登録頂いていたメールアドレスを入力してください。すぐにパスワードの再発行ご案内メールを送信いたします。';
       $scope.hideOther = true;
       $scope.mail = '';

       $scope.content2 = '<span>※YahooメールやHotmail等のウェブメールをお使いの場合には、JAPAN MOVE UP WESTからのメールが自動的に迷惑メールとして振り分けられてしまう場合があります。</span></br>'+
         '<span>時間が経ってもメールが受信されない場合には、迷惑メールフォルダ等をご確認ください</span></br>'+
         '<span></span></br>'+
         '<span>※携帯電話アドレスをご入力された場合は、JAPAN MOVE UP WESTからのメールを受信できるように</span></br>'+
       '<span>『japanmoveupwest.com』のドメイン受信設定をお願いいたします。</span></br>'

    // if(grecaptcha){
    //   grecaptcha.reset();
    // }

    $scope.postMail = function () {
      var reg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
      var gresponse = grecaptcha.getResponse();
      if(!$scope.mail || $scope.mail.length == 0 || !reg.test($scope.mail)){
        ngDialog.open({
          showClose: false,
          template:'templateTip',
          className: 'ngdialog-theme-default',
          controller: ['$scope', function($scope) {
              $scope.content = '有効なメールアドレスを入力してください。';
          }]
        });
        return;
      }
      if(!gresponse){
        ngDialog.open({
          showClose: false,
          template:'templateTip',
          className: 'ngdialog-theme-default',
          controller: ['$scope', function($scope) {
              $scope.content = '認証チェックを入れてください。';
          }]
        });
        return;
      }

      apiService.postMailForget($scope.mail, gresponse, function onSuccess(result) {
        $location.path('/forgetSend/');
      }, function onError(message, statusCode, statusList) {
        if(statusCode === statusList.DATA_NOT_FOUND){
          message = 'メールアドレスが存在しません、認証チェックが入っていません。';
        }
        ngDialog.open({
          showClose: false,
          template:'templateTip',
          className: 'ngdialog-theme-default',
          controller: ['$scope', function($scope) {
              $scope.content = message;
          }]
        });
      });
    }

    if($routeParams.token){
      apiService.getMailForget($routeParams.token, function onSuccess(result) {
        $window.localStorage['forgetMail'] = result.mail;
        $location.path('/forgetConfirm');
      }, function onError(message) {
        ngDialog.open({
          showClose: false,
          template:'templateTip',
          className: 'ngdialog-theme-default',
          controller: ['$scope', function($scope) {
              $scope.content = 'トークンの有効期限が切れているか、トークンが無効です。';
          }]
        });
      });
    }
    $('html,body').animate({scrollTop:0}, 0);
  }]);
