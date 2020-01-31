'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:EntryEndCtrl
 * @description
 * # EntryEndCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('EntryEndCtrl', ['$scope', '$location', '$window', 'ApiService','$routeParams',' $timeout',function ($scope, $location, $window, apiService,$routeParams,$timeout) {
     $scope.hideFooter = true;
     $window.localStorage.removeItem('registMail');
     $window.localStorage.removeItem('profile');
     $timeout(function() {
       $location.path('/');
     }, 5000);
     $('html,body').animate({scrollTop:0}, 0);
  }]);
