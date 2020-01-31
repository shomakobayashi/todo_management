'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:TeamCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('TeamCtrl', ['$scope', '$http', 'ApiService','ngDialog','$compile','$routeParams','$location', function ($scope, $http, apiService,ngDialog,$compile,$routeParams,$location) {
     $scope.hideFooter = true;
     $scope.type = 0;
     $scope.hidePages = true;
     $scope.pageSize = 20;
     $scope.lastPage = '';
     $scope.nextPage = '';

     $scope.getData = function () {
       apiService.getTeamList($scope.type,$scope.pageSize, $scope.pageSize * ($routeParams.page-1),function onSuccess(resultList) {
         $scope.hideFooter = false;
         $scope.results = resultList;

         var pageCount = $scope.results.team2020Count / $scope.pageSize;
         var totalPage = parseInt(pageCount);
          if(pageCount - totalPage > 0){
            totalPage ++;
          }
          if(totalPage == 0){
            totalPage = 1;
          }
         $scope.initPage(totalPage);
         if($routeParams.page > 1){
           $scope.lastPage = '/team/' + (parseInt($routeParams.page) - 1) + '/';
         }
         if($routeParams.page < totalPage){
           $scope.nextPage = '/team/' + (parseInt($routeParams.page) + 1) + '/';
         }
         // var pageCount = $scope.results.team2020Count / $scope.pageObject.pageSize;
         // var pCount = parseInt(pageCount);
         // if(pageCount - pCount > 0){
         //   pCount ++;
         // }
         // if(pCount == 0){
         //   pCount = 1;
         // }
         // $scope.pageObject.totalPage = pCount;
         // $scope.hidePages = false;
         // paginationService.updatePagination($scope, $scope.pageObject);
       }, function onError(message) {
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = 'データの取得に失敗しました。';
           }]
         });
       });
     }

     $scope.getTeamPic = function (pic) {
         $scope.teamPic = [];
         if(pic.length>1){
           for(var index in pic){
             $scope.teamPic.push(new Array(pic.picUrl));
          }
         }

          //$scope.teamPic.push(new Array(pic));


           $('#gallery').remove();
           var htmlStr = '<div class="dowebok"><div id="gallery" style="display:none;"><a href="'+pic[0]+'"></a></div></div>';
           $('body').append(htmlStr);
           $('#gallery').responsivegallery({
            media: $scope.teamPic
          });
          $('#gallery').click();
          $compile($('#galleryinner').contents())($scope);
     }

     $scope.closefp = function (){
       document.getElementById("responsivegallery").remove();
    }

    $scope.initPage = function(totalPage){
      $('#pagesChange').children().remove();
      for(var i=0;i<totalPage;i++){
        var classStr = '';
        if(i+1 == $routeParams.page){
          classStr = ' class="checked"';
        }
        var htmlCode = '<a href="/team/'+ (i + 1) + '/">' +
          '<li style="margin: 0 5px"'+classStr+'>'+(i+1)+'</li>' +
        '</a>';
        $('#pagesChange').append(htmlCode);
        $scope.hidePages = false;
      }
    }

    $scope.upPageClick = function(){
      if($scope.lastPage){
        $location.path($scope.lastPage);
      }
    }

    $scope.downPageClick = function(){
      if($scope.nextPage){
        $location.path($scope.nextPage);
      }
    }

     $scope.getData();
     $('html,body').animate({scrollTop:0}, 0);
   }]);
