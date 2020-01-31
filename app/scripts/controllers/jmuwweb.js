'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:JmuwwebCtrl
 * @description
 * # AboutCtrl
 * Controller of the moveupApp
 */
angular.module('moveupApp')
  .controller('JmuwwebCtrl', ['$scope', function ($scope) {
    $scope.hideFooter = false;
    $('html,body').animate({scrollTop:0}, 0);
  }]);
