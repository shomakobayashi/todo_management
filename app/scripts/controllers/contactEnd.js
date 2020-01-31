'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:NewsDetailCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('ContactEndCtrl', ['$scope', '$http', 'ApiService', '$window', '$location','ngDialog',function ($scope, $http, apiService, $window, $location,ngDialog) {
     $scope.hideFooter = false;
     $scope.TransferString = function(content){
          var string = content;
          try{
              string=string.replace(/\r\n/g,"<br/>");
              string=string.replace(/\n/g,"<br/>");
          }catch(e) {

          }
          return string;
      }
     var contactStr = $window.localStorage['contact'];
     if(contactStr){
       $scope.result = JSON.parse(contactStr);
       $scope.result.contents = $scope.TransferString($scope.result.contents);
       $window.localStorage.removeItem('contact');
     }else{
       $location.path('/');
     }
     $('html,body').animate({scrollTop:0}, 0);
   }]);
