'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:StudioMoveupCtrl
 * @description
 * # ForgetEndCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('StudioMoveupCtrl', ['$scope', '$location', '$window', 'ApiService',function ($scope, $location, $window, apiService) {
     $scope.hideFooter = false;
     $scope.sortScore = 1;
     $scope.makePhone = function(){
       $window.open('tel:0862508089','_self');/*wtai://wp/mc;*//*,'_blank'*/
     }
     apiService.getStudioMoveup($scope.sortScore,function onSuccess(resultList) {
        $scope.hideFooter = false;
        $scope.results = resultList;
      }, function onError(message) {
     });
     $('html,body').animate({scrollTop:0}, 0);
  }]);
