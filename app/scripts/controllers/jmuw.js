'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:JmuwCtrl
 * @description
 * # AboutCtrl
 * Controller of the moveupApp
 */
angular.module('moveupApp')
  .controller('JmuwCtrl', ['$scope', function ($scope) {
    $scope.hideFooter = false;
    $('html,body').animate({scrollTop:0}, 0);
  }]);
