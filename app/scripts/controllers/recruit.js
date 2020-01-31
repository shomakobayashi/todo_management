'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:RecruitCtrl
 * @description
 * # rise
 * Controller of the rise
 */
 angular.module('moveupApp')
   .controller('RecruitCtrl', ['$scope', '$http', 'ApiService','$location','ngDialog','$window','$routeParams',
   function ($scope, $http, apiService, $location,ngDialog,$window,$routeParams) {
     $scope.hideFooter = true;
     $scope.hideMoerCheckBox = true;
     $scope.hidePages = true;

     $scope.pageSize = 10;
     $scope.lastPage = '';
     $scope.nextPage = '';

     $scope.recruitSearch = {};
     $scope.recruitSearch.areaModel = [];
     $scope.recruitSearch.areaList = [];
     $scope.recruitSearch.modesModel = [];
     $scope.recruitSearch.modeList = [];
     $scope.recruitSearch.detailSearchModel = [];
     $scope.recruitSearch.detailList = [];

     $scope.recruitSearch.workTimeList = [];
     $scope.recruitSearch.workPeriodList = [];
     $scope.recruitSearch.capacityList = [];
     $scope.recruitSearch.workWayList = [];
     $scope.recruitSearch.specialList = [];
     $scope.recruitSearch.environmentList = [];
     $scope.recruitSearch.treatmentNewList = [];

     $scope.selectHide0 = true;
     $scope.selectHide1 = true;
     $scope.selectDesc1 = "業種を選択";
     $scope.selectContent1 = 0;
     $scope.selectHide2 = true;
     $scope.selectHide4 = true;
     $scope.selectDesc2 = "エリアを選択";
     $scope.selectContent2 = null;
     $scope.selectHide3 = true;
     $scope.selectDesc3 = "業種から探す";
     // $scope.selectContent3 = 0;
     $scope.keyWord = '';
     $scope.recruitSearchR = {};
     $scope.recruitSearchR.keyWord = '';
     $scope.results = {};

     $scope.selHide1 = true;
     $scope.selDesc1 = "指定なし";
     // $scope.selContent1 = 0;
     $scope.selHide2 = true;
     $scope.selDesc2 = "指定なし";
     // $scope.selContent2 = 0;

     $scope.pageObject = {
        currentPageList: [],
        currentPage: 1,
        totalPage: 0,
        pageSize: 10,
        pages:[],
        pagesId: 'pagesChange',
        updateFunc: $scope.getData
     };

     // Get data from http
     $scope.getData = function () {
       if($scope.hasPerson == false){
         $location.path('/entry');
       }
       apiService.getRecruitList($scope.pageObject.pageSize, $scope.pageSize * ($scope.currentPage-1), function onSuccess(resultList) {
         $scope.hideFooter = false;
         $scope.results = resultList;

         var pageCount = $scope.results.count / $scope.pageSize;
         var totalPage = parseInt(pageCount);
          if(pageCount - totalPage > 0){
            totalPage ++;
          }
          if(totalPage == 0){
            totalPage = 1;
          }
         $scope.initPage(totalPage, 0);
         if($routeParams.page > 1){
           $scope.lastPage = '/recruit/' + (parseInt($routeParams.page) - 1) + '/';
         }
         if($routeParams.page < totalPage){
           $scope.nextPage = '/recruit/'  + (parseInt($routeParams.page) + 1) + '/';
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
       })
     }

     $scope.addMyPage = function(index){
           $scope.addMyPage.favId = $scope.results.data[index].id;
           $scope.addMyPage.type = 17;
           apiService.postAddMyPage($scope.addMyPage, function onSuccess(result) {
             $scope.results.data[index].favorite = true;
         }, function onError(message) {
           ngDialog.open({
             showClose: false,
             template:'templateTip',
             className: 'ngdialog-theme-default',
             controller: ['$scope', function($scope) {
                 $scope.content = 'お気に入りに登録済みです。';
             }]
           });
         });
     }

     $scope.RemoveMyPage = function(index){
           $scope.addMyPage.favId = $scope.results.data[index].id;
           $scope.addMyPage.type = 17;
           apiService.postRemoveMyPage($scope.addMyPage, function onSuccess(result) {
               $scope.results.data[index].favorite = false;
         }, function onError(message) {
           ngDialog.open({
             showClose: false,
             template:'templateTip',
             className: 'ngdialog-theme-default',
             controller: ['$scope', function($scope) {
                 $scope.content = 'お気に入りに登録済みです。';
             }]
           });
         });
     }

      $scope.appearMoerCheckBox = function () {
        $scope.MoreCheckBox = true;
        $scope.hideMoerCheckBox = false;
      }

      $scope.moerCheckBoxHide = function () {
        $scope.MoreCheckBox = false;
        $scope.hideMoerCheckBox = true;
      }
      $scope.shopCloseAllSelect = function () {
        $scope.selectHide0 = true;
        $scope.selectHide1 = true;
        $scope.selectHide2 = true;
        $scope.selectHide3 = true;
        $scope.selHide1 = true;
        $scope.selHide2 = true;
      }

      $scope.shopSelectCareer = function (desc,content) {
        $scope.selectDesc3 = desc;
        $scope.selectCareer = content;
      }
      $scope.shopSel1 = function () {
        $scope.selHide1 = false;
        $scope.selectHide0 = false;
      }
      $scope.shopCloseSel1 = function () {
        $scope.selHide1 = true;
        $scope.selectHide0 = true;
      }
      $scope.shopSelValue1 = function (desc,content) {
        $scope.selDesc1 = desc;
        $scope.selContent1 = content;
      }
      $scope.shopSel2 = function () {
        $scope.selHide2 = false;
        $scope.selectHide0 = false;
      }
      $scope.shopCloseSel2 = function () {
        $scope.selHide2 = true;
        $scope.selectHide0 = true;
      }
      $scope.shopSelValue2 = function (desc,content) {
        $scope.selDesc2 = desc;
        $scope.selContent2 = content;
      }

      $scope.shopSelect1 = function () {
        $scope.selectHide1 = false;
        $scope.selectHide0 = false;
      }
      $scope.shopCloseSelect1 = function () {
        $scope.selectHide1 = true;
        $scope.selectHide0 = true;
      }
      $scope.shopSelectValue1 = function (desc,content) {
        $scope.selectDesc3 = desc;
        $scope.selectContent3 = content;
      }

      $scope.shopSelect2 = function () {
        $scope.selectHide2 = false;
        $scope.selectHide0 = false;
      }
      $scope.shopCloseSelect2 = function () {
        $scope.selectHide2 = true;
        $scope.selectHide0 = true;
      }
      $scope.shopSelectValue2 = function (desc,content) {
        $scope.selectDesc2 = desc;
        $scope.selectContent2 = content;
      if( $scope.selectDesc2=="エリアを選択"){
        $scope.selectHide4 = true;
      }else{
        $scope.selectHide4 = false;
      }
      }
      $scope.shopSelect3 = function () {
        $scope.selectHide3 = false;
        $scope.selectHide0 = false;
      }
      $scope.shopCloseSelect3 = function () {
        $scope.selectHide3 = true;
        $scope.selectHide0 = true;
      }
      $scope.shopSelectValue3 = function (desc,content) {
        $scope.selectDesc1 = desc;
        $scope.selectContent1 = content;
      }

      $scope.search = function (recruitSearch) {
        $scope.recruitSearch.carerr = $scope.selectContent3;

        $scope.recruitSearch.areaList = [];
        for(var index in recruitSearch.areaModel){
          if(recruitSearch.areaModel[index] == true){
            $scope.recruitSearch.areaList[index++] = index ;
          }
        }

        $scope.recruitSearch.modeList = [];
        for(var index in recruitSearch.modesModel){
          if(recruitSearch.modesModel[index] == true){
            $scope.recruitSearch.modeList[index++] = index;
          }
        }

        $scope.recruitSearch.detailList = [];
        for(var index in recruitSearch.detailSearchModel){
          if(recruitSearch.detailSearchModel[index] == true){
            $scope.recruitSearch.detailList[index++] = index;
          }
        }

        $scope.recruitSearch.workTimeList = [];
        for(var index in recruitSearch.workTimeModel){
          if(recruitSearch.workTimeModel[index] == true){
            $scope.recruitSearch.workTimeList[index++] = index;
          }
        }
//alert($scope.recruitSearch.workTimeList);
        $scope.recruitSearch.workPeriodList = [];
        for(var index in recruitSearch.workPeriodModel){
          if(recruitSearch.workPeriodModel[index] == true){
            $scope.recruitSearch.workPeriodList[index++] = index;
          }
        }
//alert($scope.recruitSearch.workPeriodList);
        $scope.recruitSearch.capacityList = [];
        for(var index in recruitSearch.capacityModel){
          if(recruitSearch.capacityModel[index] == true){
            $scope.recruitSearch.capacityList[index++] = index;
          }
        }
//alert($scope.recruitSearch.capacityList);
        $scope.recruitSearch.workWayList = [];
        for(var index in recruitSearch.workWayModel){
          if(recruitSearch.workWayModel[index] == true){
            $scope.recruitSearch.workWayList[index++] = index;
          }
        }
//alert($scope.recruitSearch.workWayList);
        $scope.recruitSearch.specialList = [];
        for(var index in recruitSearch.specialModel){
          if(recruitSearch.specialModel[index] == true){
            $scope.recruitSearch.specialList[index++] = index;
          }
        }
//alert($scope.recruitSearch.specialList);
        $scope.recruitSearch.environmentList = [];
        for(var index in recruitSearch.environmentModel){
          if(recruitSearch.environmentModel[index] == true){
            $scope.recruitSearch.environmentList[index++] = index;
          }
        }
//alert($scope.recruitSearch.environmentList);
        $scope.recruitSearch.treatmentNewList = [];
        for(var index in recruitSearch.treatmentNewModel){
          if(recruitSearch.treatmentNewModel[index] == true){
            $scope.recruitSearch.treatmentNewList[index++] = index;
          }
        }
//alert($scope.recruitSearch.treatmentNewList);
        $scope.recruitSearch.workingTimeStart = $scope.selContent1;
        $scope.recruitSearch.workingTimeEnd = $scope.selContent2;
        $scope.recruitSearch.limit = $scope.pageObject.pageSize;
        $scope.recruitSearch.offset = $scope.pageObject.pageSize * ($scope.pageObject.currentPage-1);
        apiService.postRecruitSearch(recruitSearch,function onSuccess(results) {
          $scope.result = results;
          $scope.results.data = $scope.result.data;
          $scope.results.count = $scope.result.count;
          $scope.area = $scope.result.areaString;
          var pageCount = $scope.results.count / $scope.pageObject.pageSize;
          var pCount = parseInt(pageCount);
          if(pageCount - pCount > 0){
            pCount ++;
          }
          if(pCount == 0){
            pCount = 1;
          }
          $scope.pageObject.totalPage = pCount;
          $scope.pageObject.updateFunc = $scope.search;
          paginationService.updatePagination($scope, $scope.pageObject);
        }, function onError(message) {
        });
      }

     $scope.searchR = function () {
       $scope.recruitSearchR.keyWord = $scope.recruitSearchR.keyWord;
       $scope.recruitSearchR.carerr = $scope.selectContent1;
       $scope.recruitSearchR.areaList = $scope.selectContent2;
       $scope.recruitSearchR.limit = $scope.pageObject.pageSize;
       $scope.recruitSearchR.offset = $scope.pageObject.pageSize * ($scope.pageObject.currentPage-1);
       $scope.recruitSearchR.selectDesc2 = $scope.selectDesc2;
       var timestamp = new Date().getTime();
       $window.localStorage[timestamp] = JSON.stringify($scope.recruitSearchR);
       $location.path('/recruit/0/' + timestamp + '/');
       // apiService.postRecruitSearch($scope.recruitSearchR,function onSuccess(results) {
       //   $scope.result = results;
       //   $scope.results.data = $scope.result.data;
       //   $scope.results.count = $scope.result.count;
       //   $scope.area = $scope.result.areaString;
       //   var pageCount = $scope.results[0].count / $scope.pageSize;
       //   var pCount = parseInt(pageCount);
       //   if(pageCount - pCount > 0){
       //     pCount ++;
       //   }
       //   if(pCount == 0){
       //     pCount = 1;
       //   }
       //   $scope.pageObject.totalPage = pCount;
       //   $scope.pageObject.updateFunc = $scope.searchR;
       //   paginationService.updatePagination($scope, $scope.pageObject);
       // }, function onError(message) {
       // });
     }

     $scope.initPage = function(totalPage,timestamp){
       $('#pagesChange').children().remove();
       for(var i=0;i<totalPage;i++){
         var classStr = '';
         if(i+1 == $routeParams.page){
           classStr = ' class="checked"';
         }
         var htmlCode = '<a href="/recruit/0/'+ (i + 1) + '/">' +
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

     $scope.doSearch = function(params, timestamp) {
       params.limit = $scope.pageSize;
       params.offset = (parseInt($routeParams.page) - 1) * params.limit;
       // apiService.postRecruitSearch($scope.recruitSearchR,function onSuccess(results) {
       //   $scope.result = results;
       //   $scope.results.data = $scope.result.data;
       //   $scope.results.count = $scope.result.count;
       //   $scope.area = $scope.result.areaString;
       //   var pageCount = $scope.results[0].count / $scope.pageSize;
       //   var pCount = parseInt(pageCount);
       //   if(pageCount - pCount > 0){
       //     pCount ++;
       //   }
       //   if(pCount == 0){
       //     pCount = 1;
       //   }
       //   $scope.pageObject.totalPage = pCount;
       //   $scope.pageObject.updateFunc = $scope.searchR;
       //   paginationService.updatePagination($scope, $scope.pageObject);
       // }, function onError(message) {
       // });
       apiService.postRecruitSearch(params, function onSuccess(result) {
           $scope.result = results;
           $scope.results.data = $scope.result.data;
           $scope.results.count = $scope.result.count;
           $scope.area = $scope.result.areaString;
           var pageCount = $scope.results[0].count / $scope.pageSize;
           var pCount = parseInt(pageCount);
           if(pageCount - pCount > 0){
             pCount ++;
           }
           if(pCount == 0){
             pCount = 1;
           }
         $scope.initPage(pCount, timestamp);
         if ($routeParams.page > 1) {
           $scope.lastPage = '/recruit/0/' + (parseInt($routeParams.page) - 1) + '/' + timestamp + '/';
         }
         if ($routeParams.page < pCount) {
           $scope.nextPage = '/recruit/0/' + (parseInt($routeParams.page) + 1) + '/' + timestamp + '/';
         }
       }, function onError(message) {});
     }


     var timestamp = $routeParams.timestamp;
     var searchParams = $window.localStorage[timestamp];
     if (searchParams) {
       searchParams = JSON.parse(searchParams);
     }
     if (searchParams) {
       $scope.doSearch(searchParams, timestamp);
       $scope.selectDesc2 = searchParams.selectDesc2;
     } else {
       $scope.getData();
     }

     $scope.getData();
     $('html,body').animate({scrollTop:0}, 0);
   }]);
