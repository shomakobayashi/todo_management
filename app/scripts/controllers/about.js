'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:404Ctrl
 * @description
 * # AboutCtrl
 * Controller of the moveupApp
 */
angular.module('moveupApp')
  .controller('404Ctrl', function () {
    $('html,body').animate({scrollTop:0}, 0);
  });
