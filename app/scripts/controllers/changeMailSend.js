'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:SignupSendCtrl
 * @description
 * # SignupSendCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('ChangeMailSendCtrl', ['$scope', '$location', '$window', 'ApiService','$routeParams',function ($scope, $location, $window, apiService,$routeParams) {
     $scope.hideFooter = false;

     $scope.title = '';
     $scope.content = 'メールアドレスにメールをお送り致しました。<br>メールをご確認ください。';
     $('html,body').animate({scrollTop:0}, 0);
  }]);
