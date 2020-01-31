'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ContactCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('ContactCtrl', ['$scope', '$http', 'ApiService', '$window', '$location','ngDialog',function ($scope, $http, apiService, $window, $location,ngDialog) {
     $scope.contact = {};
     $scope.hideFooter = false;
     $scope.content2 = '1．&nbsp;事業者の名称、個人情報保護管理責任者などの職名、連絡先については、個人情報保護方針をご覧ください。</br>'+
     '2．&nbsp;当社はお問い合わせフォームで取得した個人情報を返信目的にのみ利用いたします。</br>'+
     '3．&nbsp;なお返信目的に必要な限度において、当該個人情報について他サービスへ提供する場合があります。または、返信目的に必要な限度において、当該個人情報の取扱いを当社業務委託先へ委託する場合があります。</br>'+
     '4．&nbsp;個人情報の利用目的の通知、開示、訂正、追加、削除等をお求めの場合は、「個人情報の取扱いについて」4をご覧ください。http://japanmoveupwest.com/privacypolicy.html</br>'+
     '5．&nbsp;すべての項目にご記入いただけなかった場合、お問い合わせ内容に対する返信などにおいて、適切な対応ができなくなる場合がありますのでご了解ください。</br>'
     
     $scope.contactConfirm = function(){
       if(!$scope.contact.mail){
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = 'メールアドレスを入力ください';
           }]
         });
         return;
       }

        if(!$scope.contact.contents ){
          ngDialog.open({
            showClose: false,
            template:'templateTip',
            className: 'ngdialog-theme-default',
            controller: ['$scope', function($scope) {
                $scope.content = '内容を入力ください';
            }]
          });
          return;
        }

       if($scope.contact.contents.length >2000){
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = '入力が長すぎます、2,000文字まで入力可能です。';
           }]
         });
       }else{
         $window.localStorage['contact'] = JSON.stringify($scope.contact);
         $location.path('/contactConfirm');
       }
     }

     $('html,body').animate({scrollTop:0}, 0);
   }]);
