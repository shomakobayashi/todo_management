'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ApplicationOverCtrl
 * @description
 * # AboutCtrl
 * Controller of the moveupApp
 */
angular.module('moveupApp')
  .controller('CarryOverCtrl', function ($scope) {
    $scope.hideFooter = false;
    $('html,body').animate({scrollTop:0}, 0);
  });
