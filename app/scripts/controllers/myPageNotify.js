'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:MyPageNotifyCtrl
 * @description
 * # MyPageCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('MyPageNotifyCtrl', ['$scope', '$location', '$window', 'ApiService','ngDialog', '$routeParams' ,function ($scope, $location, $window, apiService, ngDialog, $routeParams) {
     $scope.formData = {};
     $scope.notifyList = {};
     $scope.form = {};
     $scope.thumbnailUrlHide= true;
     $scope.hideFooter = true;
     $scope.hidePages = true;
     $scope.pageSize = 10;
     $scope.lastPage = '';
     $scope.nextPage = '';
     $scope.ncjp = {};

     $scope.notifyChecked1 = true;
     $scope.notifyChecked2 = true;
     $scope.notifyChecked3 = true;
     $scope.notifyChecked4 = true;
     $scope.notifyChecked5 = true;
     $scope.notifyChecked6 = true;
     $scope.notifyChecked7 = true;
     $scope.notifyChecked8 = true;

     $scope.getData = function () {
       if($scope.hasPerson == false){
         $location.path('/entry');
       }
       apiService.getNotifyList($scope.pageSize, $scope.pageSize * ($routeParams.page-1), function onSuccess(resultList) {
         $scope.hideFooter = false;
         $scope.results = resultList;
         $scope.ncjp = $scope.results.ncjp;
         // if($scope.ncjp.settingShopValue == 1){
         //   $scope.notifyChecked1 = false;
         // }
         // if($scope.ncjp.settingEventValue == 1){
         //   $scope.notifyChecked2 = false;
         // }
         // if($scope.ncjp.settingTvValue == 1){
         //   $scope.notifyChecked3 = false;
         // }
         // if($scope.ncjp.settingRecruitValue == 1){
         //   $scope.notifyChecked4 = false;
         // }
         // if($scope.ncjp.settingGoodsValue == 1){
         //   $scope.notifyChecked5 = false;
         // }
         // if($scope.ncjp.settingFreepapaerValue == 1){
         //   $scope.notifyChecked6 = false;
         // }
         // if($scope.ncjp.settingNow4Value == 1){
         //   $scope.notifyChecked7 = false;
         // }
         // if($scope.ncjp.settingNow5Value == 1){
         //   $scope.notifyChecked8 = false;
         // }

         if($scope.results.notifyList.length > 0){
           $scope.notifyList = $scope.results.notifyList;
           for(var index in $scope.notifyList){
             $scope.notifyList[index].notifyContentHide = true;
             $scope.notifyList[index].newHide = true;
              if($scope.notifyList[index].status == 1){
                $scope.notifyList[index].newHide = false;
              }
           }
         }
         var pageCount = $scope.results.count / $scope.pageSize;
         var totalPage = parseInt(pageCount);
          if(pageCount - totalPage > 0){
            totalPage ++;
          }
          if(totalPage == 0){
            totalPage = 1;
          }
         $scope.initPage(totalPage);
         if($routeParams.page > 1){
           $scope.lastPage = '/myPageNotify/' + (parseInt($routeParams.page) - 1) + '/';
         }
         if($routeParams.page < totalPage){
           $scope.nextPage = '/myPageNotify/' + (parseInt($routeParams.page) + 1) + '/';
         }
         // var pageCount = $scope.results.count / $scope.pageObject.pageSize;
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
       })
     }

     // $scope.pageObject = {
     //    currentPageList: [],
     //    currentPage: 1,
     //    totalPage: 0,
     //    pageSize: 10,
     //    pages:[],
     //    pagesId: 'pagesChange',
     //    updateFunc: $scope.getData
     // };

     $scope.getPersonInfo = function(){
       apiService.getPerson(function onSuccess(result) {
         $scope.formData.nickname = result.nickname;
         $scope.formData.coin = result.coin;
         if(result.thumbnailUrl){
           $scope.thumbnailUrl = result.thumbnailUrl
         }else{
           $scope.thumbnailUrl = 'images/thumbnail.png';
         }
         $scope.thumbnailUrlHide= false;
         if(result.loginType && result.loginType == 3){
           $scope.resetHide = false;
         }
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

     $scope.sett = function (settingKey,settingValue) {
       if($scope.hasPerson == false){
         $location.path('/entry');
       }
       apiService.getSettingsNotify(settingKey,settingValue,function onSuccess(resultList) {
         $scope.ncjp = resultList;

        }, function onError(message) {
         ngDialog.open({
           showClose: false,
           template:'templateTip',
           className: 'ngdialog-theme-default',
           controller: ['$scope', function($scope) {
               $scope.content = 'データの取得に失敗しました。';
           }]
         });
       })
     }

     $scope.showNotifyContent = function(id,index){
       if(id){
         $scope.form.id = id;
         apiService.postNotifyRead($scope.form,function onSuccess(result) {

         }, function onError(message) {

         });
       }

       for(var index2 in $scope.results.notifyList){
         $scope.notifyList[index2].notifyContentHide = true;
         if(index == index2){
           $scope.notifyList[index].newHide = true;
           $scope.notifyList[index2].notifyContentHide = false;
         }
       }
     }

      $scope.notifyClick = function(key){
        $scope.notifyCheckedValue = null;
        if(key == 1){
          $scope.notifyCheckedValue = !$scope.notifyChecked1;
          $scope.notifyChecked1 = !$scope.notifyChecked1;
        }
        if(key == 2){
          $scope.notifyCheckedValue = !$scope.notifyChecked2;
          $scope.notifyChecked2 = !$scope.notifyChecked2;
        }
        if(key == 3){
          $scope.notifyCheckedValue = !$scope.notifyChecked3;
          $scope.notifyChecked3 = !$scope.notifyChecked3;
        }
        if(key == 4){
          $scope.notifyCheckedValue = !$scope.notifyChecked4;
          $scope.notifyChecked4 = !$scope.notifyChecked4;
        }
        if(key == 5){
          $scope.notifyCheckedValue = !$scope.notifyChecked5;
          $scope.notifyChecked5 = !$scope.notifyChecked5;
        }
        if(key == 6){
          $scope.notifyCheckedValue = !$scope.notifyChecked6;
          $scope.notifyChecked6 = !$scope.notifyChecked6;
        }
        if(key == 7){
          $scope.notifyCheckedValue = !$scope.notifyChecked7;
          $scope.notifyChecked7 = !$scope.notifyChecked7;
        }
        if(key == 8){
          $scope.notifyCheckedValue = !$scope.notifyChecked8;
          $scope.notifyChecked8 = !$scope.notifyChecked8;
        }

        if($scope.notifyCheckedValue == true){
          $scope.notifyCheckedValue = 0;
        }else{
          $scope.notifyCheckedValue = 1;
        }
        //alert("key==="+key+"---value==="+$scope.notifyCheckedValue);
        apiService.getSettingsNotify(key,$scope.notifyCheckedValue,function onSuccess(result) {

        }, function onError(message) {

        });
      }

      $scope.initPage = function(totalPage){
        $('#pagesChange').children().remove();
        for(var i=0;i<totalPage;i++){
          var classStr = '';
          if(i+1 == $routeParams.page){
            classStr = ' class="checked"';
          }
          var htmlCode = '<a href="/myPageNotify/'+ (i + 1) + '/">' +
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
     $scope.getPersonInfo();
     $('html,body').animate({scrollTop:0}, 0);
  }]);
