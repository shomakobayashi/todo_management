'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ShopCtrl
 * @description
 * # rise
 * Controller of the rise
 */
angular.module('moveupApp')
  .controller('ShopCtrl', ['$scope', '$http', 'ApiService', '$location', '$window', 'ngDialog', '$routeParams', function($scope, $http, apiService, $location, $window, ngDialog, $routeParams) {
    $scope.hideFooter = true;
    $scope.MoreCheckBox = false;
    $scope.hideMoerCheckBox = true;
    $scope.area = '';
    $scope.address1 = '';
    $scope.address2 = '';
    $scope.pageMark = 0;
    $scope.shopSearch = {};
    $scope.addressArr1 = [];
    $scope.addressArr2 = [];

    $scope.shopSearch.mainMenu = '0';
    $scope.shopSearch.shopType = '0';
    $scope.PriceType = '';
    $scope.PriceLow = '0';
    $scope.PriceHigh = '0';
    $scope.shopSearch.dayPriceLow = '';
    $scope.shopSearch.dayPriceHigh = '';
    $scope.shopSearch.nightPriceLow = '';
    $scope.shopSearch.nightPriceHigh = '';
    $scope.shopSearch.areaModel = [];
    $scope.shopSearch.area = [];
    $scope.shopSearch.shopTime = '0';
    $scope.shopSearch.business = '';
    $scope.shopSearch.businessModel = '';
    $scope.shopSearch.scene = '0';
    $scope.shopSearch.detailSearchModel = [];
    $scope.shopSearch.character = [];
    $scope.shopSearch.now4 = '';
    $scope.shopSearch.now5 = '';

    $scope.shopSearchR = {};
    $scope.shopSearchR.shopType = '0';
    $scope.shopSearchR.keyWord = '';
    $scope.shopSearchR.mainMenu = 0;
    $scope.shopSearchR.area = 0;
    $scope.shopSearchR.mainMenuModel = '0';
    $scope.shopSearchR.areaModel = '0';

    $scope.selectHide0 = true;
    $scope.selectHide1 = true;
    $scope.selectDesc1 = "ジャンル選択";
    $scope.selectContent1 = 0;
    $scope.selectHide2 = true;
    $scope.selectDesc2 = "エリアを選択";
    $scope.selectHide3 = true;
    $scope.selectDesc3 = "ジャンルから探す";


    $scope.selHide1 = true;
    $scope.selDesc1 = "指定なし";
    $scope.selContent1 = 0;
    $scope.selHide2 = true;
    $scope.selDesc2 = "指定なし";
    $scope.selContent2 = 0;
    $scope.selHide3 = true;
    $scope.selDesc3 = "指定なし";
    $scope.selNow4 = 0;
    $scope.selNow5 = 0;
    $scope.selHide4 = true;
    $scope.selDesc4 = "指定なし";
    $scope.shopNow4 = 0;
    $scope.shopNow5 = 0;
    $scope.hidePages = true;
    $scope.pageSize = 6;
    $scope.lastPage = '';
    $scope.nextPage = '';
    $scope.results = [];


    $(function() {
      $('input:radio').click(function() {
        var domName = $(this).attr('name');
        var $radio = $(this);
        if ($radio.data('waschecked') == true) {
          $radio.prop('checked', false);
          $("input:radio[name='" + domName + "']").data('waschecked', false);
        } else {
          $radio.prop('checked', true);
          $("input:radio[name='" + domName + "']").data('waschecked', false);
          $radio.data('waschecked', true);
        }
      });
    });

    $scope.getData = function() {
      $scope.pageMark = 1;
      if ($scope.hasPerson == false) {
        $location.path('/entry');
      }
      apiService.getShopList($routeParams.type, $scope.pageSize, $scope.pageSize * ($routeParams.page - 1), function onSuccess(resultList) {
        $scope.hideFooter = false;
        $scope.results = resultList;
        $scope.shopType = $routeParams.type;
        $scope.shopSearch.shopType = $routeParams.type;
        $scope.shopSearchR.shopType = $routeParams.type;

        var pageCount = $scope.results[0].shopCount / $scope.pageSize;
        var totalPage = parseInt(pageCount);
        if (pageCount - totalPage > 0) {
          totalPage++;
        }
        if (totalPage == 0) {
          totalPage = 1;
        }
        $scope.initPage(totalPage, 0);
        if ($routeParams.page > 1) {
          $scope.lastPage = '/shop/list/' + $routeParams.type + '/' + (parseInt($routeParams.page) - 1) + '/0/';
        }
        if ($routeParams.page < totalPage) {
          $scope.nextPage = '/shop/list/' + $routeParams.type + '/' + (parseInt($routeParams.page) + 1) + '/0/';
        }
      }, function onError(message) {
        ngDialog.open({
          showClose: false,
          template: 'templateTip',
          className: 'ngdialog-theme-default',
          controller: ['$scope', function($scope) {
            $scope.content = message;
          }]
        });
      });
    }

    $scope.pageObject = {
      currentPageList: [],
      currentPage: 1,
      totalPage: 0,
      // pageSize: 10,
      pages: [],
      pagesId: 'pagesChange',
      updateFunc: $scope.getData
    };

    $scope.appearMoerCheckBox = function() {
      $scope.MoreCheckBox = true;
      $scope.hideMoerCheckBox = false;
    }

    $scope.moerCheckBoxHide = function() {
      $scope.MoreCheckBox = false;
      $scope.hideMoerCheckBox = true;
    }

    $scope.shopCloseAllSelect = function() {
      $scope.selectHide0 = true;
      $scope.selectHide1 = true;
      $scope.selectHide2 = true;
      $scope.selectHide3 = true;
      $scope.selHide1 = true;
      $scope.selHide2 = true;
      $scope.selHide3 = true;
      $scope.selHide4 = true;
    }

    $scope.shopSel1 = function() {
      $scope.selHide1 = false;
      $scope.selectHide0 = false;
    }
    $scope.shopCloseSel1 = function() {
      $scope.selHide1 = true;
      $scope.selectHide0 = true;
    }
    $scope.shopSelValue1 = function(desc, content) {
      if (content == 0) {
        $scope.selDesc1 = desc;
      } else {
        $scope.selDesc1 = desc + '円';
      }
      $scope.selContent1 = content;
    }
    $scope.shopSel2 = function() {
      $scope.selHide2 = false;
      $scope.selectHide0 = false;
    }
    $scope.shopCloseSel2 = function() {
      $scope.selHide2 = true;
      $scope.selectHide0 = true;
    }
    $scope.shopSelValue2 = function(desc, content) {
      if (content == 0) {
        $scope.selDesc2 = desc;
      } else {
        $scope.selDesc2 = desc + '円';
      }
      $scope.selContent2 = content;
    }
    $scope.shopSel3 = function() {
      $scope.selHide3 = false;
      $scope.selectHide0 = false;
    }
    $scope.shopCloseSel3 = function() {
      $scope.selHide3 = true;
      $scope.selectHide0 = true;
    }
    $scope.shopSelValue3 = function(desc, content) {
      $scope.selDesc3 = desc;
      $scope.selContent3 = content;
      $scope.selNow4 = content;
      $scope.selNow5 = content;
    }
    $scope.shopSel4 = function() {
      $scope.selHide4 = false;
      $scope.selectHide0 = false;
    }
    $scope.shopCloseSel4 = function() {
      $scope.selHide4 = true;
      $scope.selectHide0 = true;
    }
    $scope.shopSelValue4 = function(desc, content) {
      $scope.selDesc4 = desc;
      $scope.selContent4 = content;
    }
    $scope.shopSelect3 = function() {
      $scope.selectHide3 = false;
      $scope.selectHide0 = false;
    }
    $scope.shopCloseSelect3 = function() {
      $scope.selectHide3 = true;
      $scope.selectHide0 = true;
    }
    $scope.shopSelectValue3 = function(desc, content) {
      $scope.selectDesc3 = desc;
      $scope.selectContent3 = content;
    }

    $scope.changeNow4 = function(shopSearch) {
      if ($scope.shopNow4 == undefined || $scope.shopNow4 == 1) {
        $scope.shopNow4 = 0;
      } else {
        $scope.shopNow4 = 1;
      }
    }
    $scope.changeNow5 = function(shopSearch) {
      if ($scope.shopNow5 == undefined || $scope.shopNow5 == 1) {
        $scope.shopNow5 = 0;
      } else {
        $scope.shopNow5 = 1;
      }
    }

    $scope.dayBudget = function(shopSearch) {
      if ($scope.PriceType == undefined || $scope.PriceType == 1) {
        $scope.PriceType = 0;
      } else {
        $scope.PriceType = 1;
      }
    }
    $scope.nightBudget = function(shopSearch) {
      if ($scope.PriceType == undefined || $scope.PriceType == 2) {
        $scope.PriceType = 0;
      } else {
        $scope.PriceType = 2;
      }
    }

    $scope.search = function(shopSearch) {
      $scope.pageMark = 2;

      if ($scope.PriceType == 1) {
        $scope.shopSearch.dayPriceLow = $scope.selContent1;
        $scope.shopSearch.dayPriceHigh = $scope.selContent2;
        $scope.shopSearch.nightPriceLow = '';
        $scope.shopSearch.nightPriceHigh = '';
      } else if ($scope.PriceType == 2) {
        $scope.shopSearch.nightPriceLow = $scope.selContent1;
        $scope.shopSearch.nightPriceHigh = $scope.selContent2;
        $scope.shopSearch.dayPriceLow = '';
        $scope.shopSearch.dayPriceHigh = '';
      } else {
        $scope.shopSearch.dayPriceLow = '';
        $scope.shopSearch.dayPriceHigh = '';
        $scope.shopSearch.nightPriceLow = $scope.selContent1;
        $scope.shopSearch.nightPriceHigh = $scope.selContent2;
      }

      $scope.shopSearch.area = [];
      if ($scope.shopSearch.areaModel.length > 0) {
        for (var index in $scope.shopSearch.areaModel) {
          if ($scope.shopSearch.areaModel[index] == true) {
            $scope.shopSearch.area[index++] = index;
          }
        }
      }

      $scope.shopSearch.character = [];
      for (var index in $scope.shopSearch.detailSearchModel) {
        if ($scope.shopSearch.detailSearchModel[index] == true) {
          $scope.shopSearch.character[index++] = index;
        }
      }

      if ($scope.shopSearch.businessModel == true) {
        $scope.shopSearch.business = 0;
      } else {
        $scope.shopSearch.business = null;
      }
      $scope.pageObject.updateFunc = $scope.search;
      $scope.shopSearch.now4 = $scope.shopNow4;
      $scope.shopSearch.now5 = $scope.shopNow5;
      $scope.shopSearch.mainMenu = $scope.selectContent3;
      $scope.shopSearch.shopTime = $scope.selContent3;
      $scope.shopSearch.scene = $scope.selContent4;
      $scope.shopSearch.limit = $scope.pageSize;
      $scope.shopSearch.offset = $scope.pageSize * ($routeParams.page - 1);
      apiService.postShopSearch($scope.shopSearch, function onSuccess(result) {
        $scope.results[0].contentList = result.contentList;
        $scope.results[0].shopCount = result.shopCount;
        $scope.area = result.area;
        var pageCount = $scope.results[0].shopCount / $scope.pageSize;
        var pCount = parseInt(pageCount);
        if (pageCount - pCount > 0) {
          pCount++;
        }
        if (pCount == 0) {
          pCount = 1;
        }
        $scope.initPage(pCount);
        if ($routeParams.page > 1) {
          $scope.lastPage = '/shop/list/' + $routeParams.type + '/' + (parseInt($routeParams.page) - 1) + '/';
        }
        if ($routeParams.page < pCount) {
          $scope.nextPage = '/shop/list/' + $routeParams.type + '/' + (parseInt($routeParams.page) + 1) + '/';
        }
      }, function onError(message) {});
    }

    $scope.shopSelect1 = function() {
      $scope.selectHide1 = false;
      $scope.selectHide0 = false;
    }
    $scope.shopCloseSelect1 = function() {
      $scope.selectHide1 = true;
      $scope.selectHide0 = true;
    }
    $scope.shopSelectValue1 = function(desc, content) {
      $scope.selectDesc1 = desc;
      $scope.selectContent1 = content;
    }

    $scope.shopSelect2 = function() {
      $scope.selectHide2 = false;
      $scope.selectHide0 = false;
    }
    $scope.shopCloseSelect2 = function() {
      $scope.selectHide2 = true;
      $scope.selectHide0 = true;
    }
    $scope.shopSelectValue2 = function(desc, content) {
      $scope.selectDesc2 = desc;
      $scope.selectContent2 = content;
    }

    $scope.searchR = function() {
      $scope.pageMark = 3;
      $scope.pageObject.updateFunc = $scope.searchR;
      $scope.shopSearchR.keyWord = $scope.shopSearchR.keyWord;
      $scope.shopSearchR.mainMenu = $scope.selectContent1;
      $scope.shopSearchR.area = $scope.selectContent2;
      $scope.shopSearchR.limit = $scope.pageSize;
      $scope.shopSearchR.offset = $scope.pageSize * ($routeParams.page - 1);
      $scope.results[0].shopSearchR = $scope.shopSearchR;
      var timestamp = new Date().getTime();
      $window.localStorage[timestamp] = JSON.stringify($scope.results);
      $location.path('/shop/list/' + $routeParams.type + '/' + $routeParams.page + '/' + timestamp + '/');
    }

    $scope.initPage = function(totalPage, timestamp) {
      $('#pagesChange').children().remove();
      for (var i = 0; i < totalPage; i++) {
        var classStr = '';
        if (i + 1 == $routeParams.page) {
          classStr = ' class="checked"';
        }
        var htmlCode = '<a href="/shop/list/' + $routeParams.type + '/' + (i + 1) + '/' + timestamp + '/">' +
          '<li style="margin: 0 5px"' + classStr + '>' + (i + 1) + '</li>' +
          '</a>';
        $('#pagesChange').append(htmlCode);
        $scope.hidePages = false;
      }
    }

    $scope.upPageClick = function() {
      if ($scope.lastPage) {
        $location.path($scope.lastPage);
      }
    }

    $scope.downPageClick = function() {
      if ($scope.nextPage) {
        $location.path($scope.nextPage);
      }
    }

    $scope.doSearch = function(searchParams, timestamp) {
      $scope.results = searchParams;
      var params = searchParams[0].shopSearchR;
      for (var i = 0; i < $scope.results[0].mainMenu.length; i++) {
        if ($scope.results[0].mainMenu[i].content == params.mainMenu) {
          $scope.selectDesc1 = $scope.results[0].mainMenu[i].desc;
        }
      }
      params.limit = $scope.pageSize;
      params.offset = (parseInt($routeParams.page) - 1) * params.limit;
      apiService.postShopSearch(params, function onSuccess(result) {
        if (result.area!=""&&result.area!=null) {
          $scope.selectDesc2 = result.area;
        }else {
          $scope.selectDesc2 = "エリアを選択";
        }
        $scope.results[0].contentList = result.contentList;
        $scope.results[0].couponList = result.couponList;
        $scope.results[0].now5List = result.now5List;
        $scope.results[0].shopCount = result.shopCount;
        $scope.area = result.area;
        var pageCount = $scope.results[0].shopCount / $scope.pageSize;
        var pCount = parseInt(pageCount);
        if (pageCount - pCount > 0) {
          pCount++;
        }
        if (pCount == 0) {
          pCount = 1;
        }
        $scope.initPage(pCount, timestamp);
        if ($routeParams.page > 1) {
          $scope.lastPage = '/shop/list/' + $routeParams.type + '/' + (parseInt($routeParams.page) - 1) + '/' + timestamp + '/';
        }
        if ($routeParams.page < pCount) {
          $scope.nextPage = '/shop/list/' + $routeParams.type + '/' + (parseInt($routeParams.page) + 1) + '/' + timestamp + '/';
        }
      }, function onError(message) {});
    }

    var timestamp = $routeParams.timestamp;
    var searchParams = $window.localStorage[timestamp];
    if (searchParams) {
      searchParams = JSON.parse(searchParams);
      $scope.doSearch(searchParams, timestamp);
    } else {
      $scope.getData();
      $('html,body').animate({scrollTop: 0}, 0);
    }
  }]);
