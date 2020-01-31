'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:WithdrawCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('WithdrawCtrl', ['$scope', '$http', 'ApiService', '$window', '$location','ngDialog',function ($scope, $http, apiService, $window, $location,ngDialog) {
     $scope.hideFooter = false;
     $scope.withdrawReason = function(){
    
         $location.path('/withdrawReason');
     }
     $scope.goTop = function(){
         $location.path('/');
     }

     $('html,body').animate({scrollTop:0}, 0);
   }]);
