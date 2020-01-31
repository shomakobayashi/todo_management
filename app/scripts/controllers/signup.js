'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('SignupCtrl', ['$scope', '$location', '$window', 'ApiService','$routeParams','ngDialog',function ($scope, $location, $window, apiService,$routeParams,ngDialog) {
     $scope.hideFooter = false;
     $scope.title = '新規ユーザー登録';
     $scope.content = 'ご利用になるメールアドレスを入力してください。';
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

      apiService.postMailConfirm($scope.mail, gresponse, function onSuccess(result) {
        $location.path('/signupSend/');
      }, function onError(message, statusCode, statusList) {
        if(statusCode === statusList.DATA_EXISTED){
          message = 'メールアドレスが既に登録されているか、認証チェックが入っていません。';
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
      apiService.getMailRegist($routeParams.token, function onSuccess(result) {
        $window.localStorage['registMail'] = result.mail;
        $location.path('/entry');
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
