'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the moveupApp
 */
angular.module('moveupApp')
  .controller('WithdrawEndCtrl', function ($scope) {
    $scope.hideFooter = false;
    $('html,body').animate({scrollTop:0}, 0);
  });
