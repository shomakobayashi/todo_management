'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moveupApp
 */
angular.module('moveupApp')
  .controller('MainCtrl', ['$scope', '$http', '$timeout', 'ApiService', '$location','$sce',function ($scope, $http, $timeout, apiService,$location,$sce) {
      $scope.hideFooter = true;
      $scope.videoUrl = '';

      apiService.getTopList(function onSuccess(resultList) {
        if($scope.hasPerson == false){
          $location.path('/entry');
        }
        $scope.hideFooter = false;
        $scope.results = resultList;

        $scope.bannerLeftUrl = $scope.getBannerUrl($scope.results[0].itemTypeLeft,$scope.results[0].linkUrlLeft);
        $scope.bannerRightUrl1 = $scope.getBannerUrl($scope.results[0].itemTypeRight1,$scope.results[0].linkUrlRight1);
        $scope.bannerRightUrl2 = $scope.getBannerUrl($scope.results[0].itemTypeRight2,$scope.results[0].linkUrlRight2);
        $scope.bannerRightUrl3 = $scope.getBannerUrl($scope.results[0].itemTypeRight3,$scope.results[0].linkUrlRight3);
        //alert("left="+$scope.bannerLeftUrl+";right1="+$scope.bannerRightUrl1+";right2="+$scope.bannerRightUrl2+";right3="+$scope.bannerRightUrl3+";");

        $scope.videoUrl = $sce.trustAsResourceUrl($scope.results[0].videoUrl);
        $timeout(function() {
          $('#owl-demo').owlCarousel({
            items: 5,
            itemsMobile: [479,4],
            navigation: true,
            navigationText: [
            "<",
            ">"
            ],
            itemsScaleUp : true
          });
          var primary = $("#carousel-top");
          var secondary = $("#thumbnails-top");
          $(document).ready(function() {
            primary.owlCarousel({
              items: 1,
              singleItem: true,
              itemsScaleUp : true,
              slideSpeed: 500,
              autoplay: true,
              mouseDrag:false,
              loop:true
            });
            secondary.owlCarousel({
              items                 : 3,
              itemsDesktop          : [1200,3],
              itemsDesktopSmall     : [992,3],
              itemsTablet           : [768,3],
              itemsMobile           : [480,3],
              autoplay              : true,
              loop                  :true,
              stopOnHover:false,
              mouseDrag:false,
              pagination            : false,
              slideSpeed            : 500,
              responsiveRefreshRate : 100
            });
          });
        }, 500);
        $scope.topInitHide = true;
      }, function onError(message) {
      });

      $scope.getBannerUrl = function(type,uuid){
        $scope.bannerUrl = '/';
        if(type == 1){
          $scope.bannerUrl = '/login';
        }else if(type == 2){
          $scope.bannerUrl = '/newsDetail/'+uuid;
        }else if(type == 3){
          $scope.bannerUrl = '/eventDetail/'+uuid;
        }else if(type == 4){
          $scope.bannerUrl = '/freepaper/';
        }else if(type == 6){
          $scope.bannerUrl = '/shop/detail/'+uuid;
        }else if(type == 7){
          $scope.bannerUrl = '/place/detail/'+uuid;
        }else if(type == 8){
          $scope.bannerUrl = '/corporateinfo/detail/'+uuid;
        }else if(type == 9){
          $scope.bannerUrl = '/recruitDetail/'+uuid;
        }else if(type == 10){
          $scope.bannerUrl = '/goodsDetail/'+uuid;
        }else if(type == 11){
          $scope.bannerUrl = '/tvDetail/'+uuid;
        }else if(type == 12){
          $scope.bannerUrl = '/jmuw'
        }else if(type == 13){
          $scope.bannerUrl = '/jmuwweb'
        }else if(type == 14){
          $scope.bannerUrl = '/reportDetail/'+uuid;
        }else if(type == 15){
		  $scope.bannerUrl = uuid;
		}
        return $scope.bannerUrl;
      }

      $('html,body').animate({scrollTop:0}, 0);
  }]);
