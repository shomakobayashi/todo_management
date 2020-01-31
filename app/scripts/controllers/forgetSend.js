'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ForgetSendCtrl
 * @description
 * # ForgetSendCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('ForgetSendCtrl', ['$scope', '$location', '$window', 'ApiService','$routeParams',function ($scope, $location, $window, apiService,$routeParams) {
     $scope.hideFooter = false;
     $scope.title = '';
     $scope.content = 'メールアドレスにパスワード再設定のご案内メールをお送り致しました。<br>メールをご確認ください。';
     $('html,body').animate({scrollTop:0}, 0);
  }]);
