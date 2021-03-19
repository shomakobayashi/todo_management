'use strict';

/**
 * @ngdoc overview
 * @name moveupApp
 * @description
 * # moveupApp
 *
 * Main module of the application.
 */
angular
  .module('moveupApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFileUpload',
    'ngMap',
    'ngDialog'
  ])
  .constant('EVENTS', {
      routeChangeSuccess: 'route_change_success'
  })
  .run(['$rootScope','$templateCache','EVENTS', function($rootScope, $templateCache, EVENTS) {
    $templateCache.put('templateTip',
    '<div>'+
      '<div class="dialog-contents">'+
        '<p>{{content}}</p>'+
      '</div>'+
      '<div class="ngdialog-buttons">'+
        '<button type="button" class="ngdialog-button ngdialog-button-primary" style="background: #f2914a;" ng-click="closeThisDialog(0)">OK</button>'+
      '</div>'+
    '</div>');

    $rootScope.$on('$routeChangeSuccess', function (event, next) {
      $rootScope.$broadcast(EVENTS.routeChangeSuccess);
    });
  }])
  .config(function ($httpProvider,$compileProvider) {
    $httpProvider.defaults.withCredentials = true;
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|javascript):/);
  })
  .config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/signup/:token/', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/signupSend/', {
        templateUrl: 'views/forgetEnd.html',
        controller: 'SignupSendCtrl',
        controllerAs: 'signupSend'
      })
      .when('/changeMail', {
        templateUrl: 'views/changeMail.html',
        controller: 'ChangeMailCtrl',
        controllerAs: 'changeMail'
      })
      .when('/changeMail/:token/', {
        templateUrl: 'views/changeMail.html',
        controller: 'ChangeMailCtrl',
        controllerAs: 'changeMail'
      })
      .when('/changeMailSend/', {
        templateUrl: 'views/forgetEnd.html',
        controller: 'ChangeMailSendCtrl',
        controllerAs: 'changeMailSend'
      })
      .when('/changeMailEnd/', {
        templateUrl: 'views/changeMailEnd.html',
        controller: 'ChangeMailEndCtrl',
        controllerAs: 'changeMailEnd'
      })
      .when('/forget', {
        templateUrl: 'views/signup.html',
        controller: 'ForgetCtrl',
        controllerAs: 'forget'
      })
      .when('/forget/:token/', {
        templateUrl: 'views/signup.html',
        controller: 'ForgetCtrl',
        controllerAs: 'forget'
      })
      .when('/forgetSend/', {
        templateUrl: 'views/forgetEnd.html',
        controller: 'ForgetSendCtrl',
        controllerAs: 'forgetSend'
      })
      .when('/forgetConfirm', {
        templateUrl: 'views/forgetConfirm.html',
        controller: 'ForgetConfirmCtrl',
        controllerAs: 'forgetConfirm'
      })
      .when('/forgetEnd', {
        templateUrl: 'views/forgetEnd.html',
        controller: 'ForgetEndCtrl',
        controllerAs: 'forgetEnd'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/rise', {
        templateUrl: 'views/rise.html',
        controller: 'RiseCtrl',
        controllerAs: 'rise',
      })
      .when('/event/:year/:page/', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl',
        controllerAs: 'event',
      })
      .when('/eventDetail/:uuid/', {
        templateUrl: 'views/eventDetail.html',
        controller: 'EventDetailCtrl',
        controllerAs: 'eventDetail',
      })
      .when('/news/:type/:page/', {
        templateUrl: 'views/news.html',
        controller: 'NewsCtrl',
        controllerAs: 'news'
      })
      .when('/newsDetail/:uuid/', {
        templateUrl: 'views/newsDetail.html',
        controller: 'NewsDetailCtrl',
        controllerAs: 'newsDetail',
      })
      //20210318　楊追加
      .when('/report/:type/:page/', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl',
        controllerAs: 'report'
      })
      //20210318　楊追加
      .when('/reportDetail/:uuid/', {
        templateUrl: 'views/reportDetail.html',
        controller: 'ReportDetailCtrl',
        controllerAs: 'reportDetail',
      })
      .when('/shop/list/:type/:page/:timestamp/', {
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl',
        controllerAs: 'shop'
      })
      .when('/shop/detail/:uuid/', {
        templateUrl: 'views/shopDetail.html',
        controller: 'ShopDetailCtrl',
        controllerAs: 'shopDetail',
      })
      .when('/shop/corporateinfo/list/:type/:page/', {
        templateUrl: 'views/shopCorporateinfo.html',
        controller: 'ShopCorporateinfoCtrl',
        controllerAs: 'shopCorporateinfo'
      })
      .when('/shop/corporateinfo/detail/:uuid/', {
        templateUrl: 'views/shopCorporateinfoDetail.html',
        controller: 'ShopCorporateinfoDetailCtrl',
        controllerAs: 'shopCorporateinfoDetail',
      })
      .when('/recruit/:page/:timestamp/', {
        templateUrl: 'views/recruit.html',
        controller: 'RecruitCtrl',
        controllerAs: 'recruit'
      })
      .when('/recruitDetail/:uuid/', {
        templateUrl: 'views/recruitDetail.html',
        controller: 'RecruitDetailCtrl',
        controllerAs: 'recruitDetail',
      })
      .when('/goods/:page/', {
        templateUrl: 'views/goods.html',
        controller: 'GoodsCtrl',
        controllerAs: 'goods'
      })
      .when('/goodsDetail/:uuid/', {
        templateUrl: 'views/goodsDetail.html',
        controller: 'GoodsDetailCtrl',
        controllerAs: 'goodsDetail',
      })
      .when('/purchaseCart', {
        templateUrl: 'views/purchaseCart.html',
        controller: 'PurchaseCartCtrl',
        controllerAs: 'purchaseCart',
      })
      .when('/purchaseInfoMation', {
        templateUrl: 'views/purchaseInfoMation.html',
        controller: 'PurchaseInfoMationCtrl',
        controllerAs: 'purchaseInfoMation',
      })
      .when('/purchaseInfoConfirm', {
        templateUrl: 'views/purchaseInfoConfirm.html',
        controller: 'PurchaseInfoConfirmCtrl',
        controllerAs: 'purchaseInfoConfirm',
      })
      .when('/purchaseInfoOver', {
        templateUrl: 'views/purchaseInfoOver.html',
        controller: 'PurchaseInfoOverCtrl',
        controllerAs: 'purchaseInfoOver',
      })
      .when('/purchaseHistory', {
        templateUrl: 'views/purchaseHistory.html',
        controller: 'PurchaseHistoryCtrl',
        controllerAs: 'purchaseHistory',
      })
      .when('/payment', {
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl',
        controllerAs: 'payment',
      })
      .when('/paymentCvs', {
        templateUrl: 'views/paymentCvs.html',
        controller: 'PaymentCvsCtrl',
        controllerAs: 'paymentCvs',
      })
      .when('/place/:page/', {
        templateUrl: 'views/place.html',
        controller: 'PlaceCtrl',
        controllerAs: 'place'
      })
      .when('/place/detail/:uuid/', {
        templateUrl: 'views/placeDetail.html',
        controller: 'PlaceDetailCtrl',
        controllerAs: 'placeDetail',
      })
      .when('/freePaper/:page/', {
        templateUrl: 'views/freePaper.html',
        controller: 'FreePaperCtrl',
        controllerAs: 'freePaper',
      })
      .when('/freePaper/:uuid/', {
        templateUrl: 'views/freePaper.html',
        controller: 'FreePaperCtrl',
        controllerAs: 'freePaper',
      })
      .when('/entry', {
        templateUrl: 'views/entry.html',
        controller: 'EntryCtrl',
        controllerAs: 'entry',
      })
      .when('/entry/:token/', {
        templateUrl: 'views/entry.html',
        controller: 'EntryCtrl',
        controllerAs: 'entry',
      })
      .when('/entryConfirm', {
        templateUrl: 'views/entryConfirm.html',
        controller: 'EntryConfirmCtrl',
        controllerAs: 'entryConfirm',
      })
      .when('/entryEnd', {
        templateUrl: 'views/entryEnd.html',
        controller: 'EntryEndCtrl',
        controllerAs: 'entryEnd',
      })
      .when('/nowFor/:type/:page/', {
        templateUrl: 'views/nowFor.html',
        controller: 'NowForCtrl',
        controllerAs: 'nowFor',
      })
      .when('/nowGo/:type/:page/', {
        templateUrl: 'views/nowGo.html',
        controller: 'NowGoCtrl',
        controllerAs: 'nowGo',
      })
      .when('/privacy', {
        templateUrl: 'views/privacy.html',
        controller: 'PrivacyCtrl',
        controllerAs: 'privacy',
      })
      .when('/terms', {
        templateUrl: 'views/terms.html',
        controller: 'TermsCtrl',
        controllerAs: 'terms',
      })
      .when('/personalProtection', {
        templateUrl: 'views/personalProtection.html',
        controller: 'PersonalProtectionCtrl',
        controllerAs: 'personalProtection',
      })
      .when('/jmuw', {
        templateUrl: 'views/jmuw.html',
        controller: 'JmuwCtrl',
        controllerAs: 'jmuw',
      })
      .when('/jmuwweb', {
        templateUrl: 'views/jmuwweb.html',
        controller: 'JmuwwebCtrl',
        controllerAs: 'jmuwweb',
      })
      .when('/applicationConfirm', {
        templateUrl: 'views/applicationConfirm.html',
        controller: 'ApplicationConfirmCtrl',
        controllerAs: 'applicationConfirm',
      })
      .when('/applicationOver', {
        templateUrl: 'views/applicationOver.html',
        controller: 'ApplicationOverCtrl',
        controllerAs: 'applicationOver',
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'accountCtrl',
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact',
      })
      .when('/contactConfirm', {
        templateUrl: 'views/contactConfirm.html',
        controller: 'ContactConfirmCtrl',
        controllerAs: 'contactConfirm',
      })
      .when('/contactEnd', {
        templateUrl: 'views/contactEnd.html',
        controller: 'ContactEndCtrl',
        controllerAs: 'contactEnd',
      })
      .when('/resetConfirm', {
        templateUrl: 'views/forgetConfirm.html',
        controller: 'ResetConfirmCtrl',
        controllerAs: 'resetConfirmCtrl',
      })
      .when('/resetEnd', {
        templateUrl: 'views/resetEnd.html',
        controller: 'ResetEndCtrl',
        controllerAs: 'resetEndCtrl',
      })
      .when('/profileConfirm', {
        templateUrl: 'views/profileConfirm.html',
        controller: 'ProfileConfirmCtrl',
        controllerAs: 'profileConfirm',
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'ProfileCtrl',
      })
      .when('/carry', {
        templateUrl: 'views/carry.html',
        controller: 'CarryCtrl',
        controllerAs: 'carry',
      })
      .when('/carryOver', {
        templateUrl: 'views/carryOver.html',
        controller: 'CarryOverCtrl',
        controllerAs: 'carryOver',
      })
      .when('/myPage/:type/:page/', {
        templateUrl: 'views/myPage.html',
        controller: 'MyPageCtrl',
        controllerAs: 'myPage',
      })
      .when('/myPage', {
        templateUrl: 'views/myPage.html',
        controller: 'MyPageCtrl',
        controllerAs: 'myPage',
      })
      .when('/myPageNotify/:page/', {
        templateUrl: 'views/myPageNotify.html',
        controller: 'MyPageNotifyCtrl',
        controllerAs: 'myPageNotify',
      })
      .when('/withdraw', {
        templateUrl: 'views/withdraw.html',
        controller: 'WithdrawCtrl',
        controllerAs: 'withdraw',
      })
      .when('/withdrawReason', {
        templateUrl: 'views/withdrawReason.html',
        controller: 'WithdrawReasonCtrl',
        controllerAs: 'withdrawReason',
      })
      .when('/withdrawEnd', {
        templateUrl: 'views/withdrawEnd.html',
        controller: 'WithdrawEndCtrl',
        controllerAs: 'withdrawEnd',
      })
      .when('/team/:page/', {
        templateUrl: 'views/team.html',
        controller: 'TeamCtrl',
        controllerAs: 'team',
      })
      .when('/studioMoveup', {
        templateUrl: 'views/studioMoveup.html',
        controller: 'StudioMoveupCtrl',
        controllerAs: 'studioMoveup',
      })
      .when('/viewer', {
        templateUrl: 'views/viewer.html',
        controller: 'ViewerCtrl',
        controllerAs: 'viewer',
      })
      .when('/point', {
        templateUrl: 'views/point.html',
        controller: 'PointCtrl',
        controllerAs: 'point',
      })
      .when('/tv/:type/:page/', {
        templateUrl: 'views/tv.html',
        controller: 'TvCtrl',
        controllerAs: 'tv',
      })
      .when('/tvDetail/:uuid/', {
        templateUrl: 'views/tvDetail.html',
        controller: 'TvDetailCtrl',
        controllerAs: 'tvDetail',
      })
      .when('/settings/', {
        templateUrl: 'views/myPageSettings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings',
      })
      .when('/404', {
        templateUrl: 'views/404.html',
        controller: '404Ctrl',
        controllerAs: '404',
      })
      .when('/cuowu', {
        redirectTo: '/'
      })
      // .when('/', {
      //   redirectTo: '/moveup'
      // })
      .otherwise({
        redirectTo: '/404'
      })
  });
