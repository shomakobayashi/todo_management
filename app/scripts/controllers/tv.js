'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:TvCtrl
 * @description
 * # rise
 * Controller of the rise
 */
angular.module('moveupApp')
  .controller('TvCtrl', ['$scope', '$http','ApiService', '$location', '$routeParams', 'ngDialog', '$timeout',function ($scope, $http, apiService,$location,$routeParams,ngDialog,$timeout) {
    $scope.hideFooter = false;
    $scope.hidePages = true;
    $scope.pageSize = 30;
    $scope.lastPage = '';
    $scope.nextPage = '';

    $scope.getData = function () {

      apiService.getTvList($routeParams.type,$scope.pageSize, $scope.pageSize * ($routeParams.page-1),function onSuccess(resultList) {
        $scope.results = resultList;
        if(resultList.tvList.length < 2){
          $scope.ad = '<div id="ad" class="ad displayPc" style="" align="center"></div>';
        }

        var pageCount = $scope.results.tvListCount / $scope.pageSize;
        var totalPage = parseInt(pageCount);
         if(pageCount - totalPage > 0){
           totalPage ++;
         }
         if(totalPage == 0){
           totalPage = 1;
         }
        $scope.initPage(totalPage);
        if($routeParams.page > 1){
          $scope.lastPage = '/tv/' + $routeParams.type + '/' + (parseInt($routeParams.page) - 1) + '/';
        }
        if($routeParams.page < totalPage){
          $scope.nextPage = '/tv/' + $routeParams.type + '/' + (parseInt($routeParams.page) + 1) + '/';
        }
        // var pageCount = $scope.results.tvListCount / $scope.pageObject.pageSize;
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
        $('html,body').animate({scrollTop:0}, 0);

        $timeout(function() {
          $scope.loadScript();
        }, 500);

      }, function onError(message) {
        ngDialog.open({
          showClose: false,
          template:'templateTip',
          className: 'ngdialog-theme-default',
          controller: ['$scope', function($scope) {
              $scope.content = message;
          }]
        });
      });
  }

    // $scope.pageObject = {
    //    currentPageList: [],
    //    currentPage: 1,
    //    totalPage: 0,
    //    pageSize: 30,
    //    pages:[],
    //    pagesId: 'pagesChange',
    //    updateFunc: $scope.getData
    // };

    if($routeParams.type == 0){
      $scope.typeValue = "ALL";
    }else if($routeParams.type == 1){
      $scope.typeValue = "SPECIAL";
    }else if($routeParams.type == 2){
      $scope.typeValue = "KIDS";
    }else if($routeParams.type == 3){
      $scope.typeValue = "GIRLS";
    }else if($routeParams.type == 4){
      $scope.typeValue = "LIFE";
    }else if($routeParams.type == 5){
      $scope.typeValue = "OKAYAMA";
    }

    $scope.initPage = function(totalPage){
      $('#pagesChange').children().remove();
      for(var i=0;i<totalPage;i++){
        var classStr = '';
        if(i+1 == $routeParams.page){
          classStr = ' class="checked"';
        }
        var htmlCode = '<a href="/tv/'+$routeParams.type+'/'+ (i + 1) + '/">' +
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

    $scope.loadScript = function () {
      var script=document.createElement("script");
      script.type="text/javascript";
      script.src="//ad-api-v01.uliza.jp/player.php?player_type=1&campaign=1841&pc_width=600";
      document.getElementById("ad").appendChild(script);
     }

    $scope.getData();
    $('html,body').animate({scrollTop:0}, 0);

  }]);
