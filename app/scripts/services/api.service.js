/**
 * Created by JiaHongWei on 2018/04/04.
 */
"use strict";

/**
 * API操作統一サービス
 */

angular.module('moveupApp')
  .service('ApiService', ['$http','$httpParamSerializer','$location','$cookies',
    function($http, $httpParamSerializer, $location, $cookies){
        // URLルート
        // Grunt build automatic replace start
        //var API_BASE = 'https://www.japanmoveupwest.website';
        // Grunt build automatic replace end
        // var API_BASE = 'http://54.95.211.232'; // for prod2 test
         var API_BASE = 'http://3.20.225.251';
        // すべてのAPIの定義
        var API_PATH = {
            AUTH_FACEBOOK: '/api/auth/facebook/',
            AUTH_TWITTER: '/api/auth/twitter/',
            MAIL_LOGIN: '/api/auth/mail/login/',
            MAIL_CONFIRM_SEND: '/api/auth/mail/confirm/',
            MAIL_FORGET_SEND: '/api/auth/mail/forget/',
            MAIL_REGIST: '/api/auth/mail/regist/{token}',
            MAIL_FORGET: '/api/auth/mail/forget/{token}',
            MAIL_REGIST_FORM: '/api/auth/mail/regist/form/',
            MAIL_FORGET_FORM: '/api/auth/mail/reset/',
            MAIL_CHANGE:'/api/auth/mail/change/',
            MAIL_CHANGE_TOKEN:'/api/auth/mail/change/{token}',
            AUTH_LOGOUT: '/api/auth/logout/',
            AUTH_ISLOGIN: '/api/person/islogin/',
            PERSON_GET: '/api/person/',
            PERSON_UPDATE: '/api/person/update/',
            PERSON_HEADER: '/api/person/header/',
            TOP_LIST: '/api/top/',
            EVENT_LIST: '/api/event/list/{year}/{limit}/{offset}/',
            EVENT_DETAIL:'/api/event/{uuid}/',
            NEWS_LIST: '/api/news/list/{type}/{limit}/{offset}/',
            NEWS_DETAIL:'/api/news/detail/{uuid}/',
            SHOP_LIST: '/api/shop/list/{type}/{limit}/{offset}/',
            SHOP_SEARCH: '/api/shop/search/',
            SHOP_DETAIL: '/api/shop/detail/{uuid}/',
            SHOP_CORPORATEINFO_LIST: '/api/corporateinfo/list/{shopType}/{limit}/{offset}/',
            SHOP_CORPORATEINFO_DETAIL: '/api/corporateinfo/detail/{uuid}/',
            INFO_SEARCH: '/api/corporateinfo/search/',
            RECRUIT_LIST: '/api/recruit/list/{limit}/{offset}/',
            RECRUIT_DETAIL: '/api/recruit/{uuid}/',
            RECRUIT_SEARCH: '/api/recruit/search/',
            PLACE_LIST: '/api/place/list/area/{area}/{limit}/{offset}/',
            PLACE_DETAIL: '/api/place/{uuid}/',
            FREEPAPER_LIST: '/api/freePaper/list/{limit}/{offset}/',
            FREEPAPER_DETAIL: '/api/freePaper/detail/{uuid}/',
            GOODS_LIST: '/api/goods/list/{limit}/{offset}/',
            GOODS_DETAIL: '/api/goods/{uuid}/',
            GOODS_SEARCH:  '/api/goods/list/search/',
            PURCHASE_ADD_CART: '/api/goods/purchase/addCart/',
            PURCHASE_EDIT_CART: '/api/goods/purchase/editCart/',
            PURCHASE_OUT_CART: '/api/goods/purchase/outCart/',
            PURCHASE_CART: '/api/goods/purchase/cart/',
            PURCHASE_INFO: '/api/goods/purchase/info/',
            PURCHASE_INFO_CONFIRM: '/api/goods/purchase/infoConfirm/',
            PURCHASE_HISTORY: '/api/goods/purchase/history/',
            PURCHASE_END: '/api/goods/purchase/end/',
            PAYMENT: '/api/goods/payment/',
            PAYMENTCVS: '/api/goods/payment/cvs/',
            CONTACT: '/api/user/inquire/',
            NOW4: '/api/shopcoupon/list/{type}/{limit}/{offset}/',
            NOW4_SEARCH: '/api/shopcoupon/search/',
            NOW5: '/api/shopnowgo/list/{type}/{limit}/{offset}/',
            NOW5_SEARCH: '/api/shopnowgo/search/',
            CARRY: '/api/insert/carry/',
            MYPAGE: '/api/favorite/{type}/{limit}/{offset}/',
            ADD_MYPAGE: '/api/favorite/insert/',
            REMOVE_MYPAGE: '/api/favorite/remove/',
            STATUS_MYPAGE: '/api/favorite/{favid}/{type}/',
            APPLICATION: '/api/insert/entry/',
            WITHDRAW: '/api/auth/withdraw/',
            TEAM_LIST: '/api/team2020/list/{type}/{limit}/{offset}/',
            NOTIFY_NAV: '/api/notification/nav/',
            NOTIFY_LIST: '/api/notification/{limit}/{offset}/',
            NOTIFY_READ: '/api/notification/read/',
            STUDIO_MOVEUP: '/api/studioNews/list/{sortScore}/',
            POINT_LIST: '/api/coin/list/{limit}/{offset}/',
            POINT_AD: '/api/coin/ad/',
            TV_LIST: '/api/tvList/{type}/{limit}/{offset}/',
            TV_DETAIL: '/api/tv/detail/{uuid}/',
            SETTINGS_MYPAGE:'/api/user/notify/',
            SETTINGS_NOTIFY:'/api/user/settings/{type}/{uuid}/{settingKey}/{settingValue}/'
        };

        // ここではステータスコードを定義します。
        var STATUS_CODE = {
          	SUCCESS: 'S00000',
          	UNKONWN_ERROR: 'S99999',
          	ACCESS_DENY: 'S00001',
          	PERMISSION_DENY: 'S00002',
          	USER_ID_INVALID: 'S00003',
          	TOKEN_INVALID: 'S00004',
          	PARAMETER_ERROR: 'S00101',
          	DATA_NOT_FOUND: 'S00102',
          	DATA_SAVE_FAILED: 'S00103',
          	PAGE_SIZE_TOO_LARGE: 'S00104',
            DATA_EXISTED: 'S00105',
            COIN_OPERATION_FAILED: 'S00201',
            COIN_EXCESS: 'S00202',
            STOCK_OPERATION_FAILED: 'S00301',
          	API_NOT_FOUND: 'S00901',
            REGISTED: 'AT0001',
            WRONG_PASSWORD: 'AT0002',
            INIT_PROFILE: 'AT0003'
        };

        // Format string example "I am {0}，has {1} apple" or "I am {name}，has {count} apple"
        var stringFormat = function(str, args) {
           var result = str;
           if (arguments.length > 0) {
               if (arguments.length == 2 && typeof (args) == "object") {
                   for (var key in args) {
                       if(args[key]!==undefined){
                           var reg = new RegExp("({" + key + "})", "g");
                           result = result.replace(reg, args[key]);
                       }
                   }
               }
               else {
                   for (var i = 1; i < arguments.length; i++) {
                       if (arguments[i] !== undefined) {
                           //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题
       　　　　　　　　　　　　var reg2= new RegExp("({)" + (i-1) + "(})", "g");
                           result = result.replace(reg2, arguments[i]);
                       }
                   }
               }
           }
           return result;
       };

       var getHeaders = function(){


         var result = {};
         // var uid = $cookies.get('jsuid');
         // var sid = $cookies.get('jssid');
         // if(uid) result.uid = uid;
         // if(sid) result.sid = sid;
         return result;
       };

       var getPostHeaders = function(){
         var result = {};
         result['Content-Type'] = 'application/x-www-form-urlencoded';
         return result;
       };

        // HTTP GETパッケージ、内部使用
        var httpGet = function(url, success, error){
          var config = {
            headers:getHeaders()
          };
          $http.get(url, config).then(function onSuccess(response) {
              if(response.data.statusCode){
                if(response.data.statusCode === STATUS_CODE.SUCCESS){
                  success(response.data.resultList);
                }else if(response.data.statusCode === STATUS_CODE.ACCESS_DENY){
                  $location.path('/login');
                }else{
                  error(response.data.message, response.data.statusCode, STATUS_CODE);
                }
              }else{
                error('ネットワークの要求に失敗', null, STATUS_CODE);
              }
          }, function onError(response) {
              if(response.status == 500){
                error('サーバーエラー', null, STATUS_CODE);
              }else{
                error('ネットワークの要求エラー', null, STATUS_CODE);
              }
          });
        };

        // HTTP POSTパッケージ、内部使用
        var httpPost = function(url, data, success, error){
          var config = {
            // withCredentials: true,
            transformRequest: $httpParamSerializer,
            headers:getPostHeaders()
          };
          $http.post(url, data, config).then(function onSuccess(response) {
            if(response.data.statusCode){
              if(response.data.statusCode === STATUS_CODE.SUCCESS){
                success(response.data.resultList);
              }else if(response.data.statusCode === STATUS_CODE.ACCESS_DENY){
                $location.path('/login');
              }else{
                error(response.data.message, response.data.statusCode, STATUS_CODE);
              }
            }else{
              error('ネットワークの要求に失敗', null, STATUS_CODE);
            }
          }, function onError(response) {
            if(response.status == 500){
              error('サーバーエラー', null, STATUS_CODE);
            }else{
              error('ネットワークの要求エラー', null, STATUS_CODE);
            }
          });
        };

        this.getApiBase = function () {
          return API_BASE;
        };

        this.getApiPath = function () {
          return API_PATH;
        };

        // 請求登録メール
        this.postLogin = function(username, password, success, error) {
          httpPost(API_BASE+API_PATH.MAIL_LOGIN, {mail: username, password: password}, success, error);
        };

        // Logout
        this.postLogout = function(success, error) {
          httpPost(API_BASE+API_PATH.AUTH_LOGOUT, {}, success, error);
        };

        // Check is login
        this.getIsLogin = function(success, error) {
          httpGet(API_BASE+API_PATH.AUTH_ISLOGIN, success, error);
        };

        // 登録メールを送信する
        this.postMailConfirm = function(mail, response, success, error) {
          httpPost(API_BASE+API_PATH.MAIL_CONFIRM_SEND, {mail: mail, gResponse: response}, success, error);
        };

        // パスワードメールを送信する
        this.postMailForget = function(mail, response, success, error) {
          httpPost(API_BASE+API_PATH.MAIL_FORGET_SEND, {mail: mail, gResponse: response}, success, error);
        };

        // 登録Tokenを検証する
        this.getMailRegist = function(token, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.MAIL_REGIST, {token:token}), success, error);
        };

        // パスワードを確認するToken
        this.getMailForget = function(token, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.MAIL_FORGET, {token:token}), success, error);
        };

        // 登録者に要請する
        this.postMailRegist = function(data, success, error) {
          httpPost(API_BASE+API_PATH.MAIL_REGIST_FORM, data, success, error);
        };

        // パスワードの設定をお願いします
        this.postMailReset = function(data, success, error) {
          httpPost(API_BASE+API_PATH.MAIL_FORGET_FORM, data, success, error);
        };

        // 登録者に要請する
        this.postChangeMail = function(mail, success, error) {
          httpPost(API_BASE+API_PATH.MAIL_CHANGE, {mail:mail}, success, error);
        };

        // 登録Tokenを検証する
        this.getChangeMail = function(token, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.MAIL_CHANGE_TOKEN, {token:token}), success, error);
        };

        // Get person info
        this.getPerson = function(success, error) {
          httpGet(API_BASE+API_PATH.PERSON_GET, success, error);
        };

        // Update person info
        this.updatePerson = function(data, success, error) {
          httpPost(API_BASE+API_PATH.PERSON_UPDATE, data, success, error);
        };

        // Get person info
        this.getPersonHeader = function(success, error) {
          httpGet(API_BASE+API_PATH.PERSON_HEADER, success, error);
        };

        // 請求トップリスト
        this.getTopList = function(success, error) {
          httpGet(API_BASE+API_PATH.TOP_LIST, success, error);
        };

        // 請求トップリスト
        this.getEventList = function(year, limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.EVENT_LIST, {year:year,limit:limit,offset:offset}), success, error);
        };

        // 請求トップリスト
        this.getEventDetail = function(uuid, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.EVENT_DETAIL, {uuid:uuid}), success, error);
        };

        // 請求トップリスト
        this.getNewsList = function(type, limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.NEWS_LIST, {type:type,limit:limit,offset:offset}), success, error);
        };

        this.getNewsDetail = function(uuid, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.NEWS_DETAIL, {uuid:uuid}), success, error);
        };

       this.getReportList = function(type, limit, offset, success, error) {
         httpGet(API_BASE+stringFormat(API_PATH.REPORT_LIST, {type:type,limit:limit,offset:offset}), success, error);
       };

       this.getReportDetail = function(uuid, success, error) {
         httpGet(API_BASE+stringFormat(API_PATH.REPORT_DETAIL, {uuid:uuid}), success, error);
       };

        // 請求
        this.getShopList = function(type,limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.SHOP_LIST, {type:type,limit:limit,offset:offset}), success, error);
        };

        //
        this.postShopSearch = function(data, success, error) {
          httpPost(API_BASE+API_PATH.SHOP_SEARCH, data, success, error);
        };

        this.getShopDetail = function(uuid, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.SHOP_DETAIL, {uuid:uuid}), success, error);
        };

        // 請求
        this.getShopCorporateinfoList = function(shopType,limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.SHOP_CORPORATEINFO_LIST, {shopType:shopType,limit:limit,offset:offset}), success, error);
        };

        this.getShopCorporateinfoDetail = function(uuid, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.SHOP_CORPORATEINFO_DETAIL, {uuid:uuid}), success, error);
        };

        this.postInfoSearch = function(data, success, error) {
          httpPost(API_BASE+API_PATH.INFO_SEARCH, data, success, error);
        };

        // 請求
        this.getRecruitList = function(limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.RECRUIT_LIST, {limit:limit,offset:offset}), success, error);
        };

        this.getRecruitDetail = function(uuid, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.RECRUIT_DETAIL, {uuid:uuid}), success, error);
        };

        this.postRecruitSearch = function(data, success, error) {
          httpPost(API_BASE+API_PATH.RECRUIT_SEARCH, data, success, error);
        };

        // 請求
        this.getPlaceList = function(area,limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.PLACE_LIST, {area:area,limit:limit,offset:offset}), success, error);
        };

        this.getPlaceDetail = function(uuid, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.PLACE_DETAIL, {uuid:uuid}), success, error);
        };

        // 請求
        this.getFreePaperList = function(limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.FREEPAPER_LIST, {limit:limit,offset:offset}), success, error);
        };

        // 請求
        this.getGoodsList = function(limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.GOODS_LIST, {limit:limit,offset:offset}), success, error);
        };

        this.getGoodsDetail = function(uuid, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.GOODS_DETAIL, {uuid:uuid}), success, error);
        };

        //
        this.postGoodsSearch = function(data, success, error) {
          httpPost(API_BASE+API_PATH.GOODS_SEARCH, data, success, error);
        };

        //
        this.postAddCart = function(data, success, error) {
          httpPost(API_BASE+API_PATH.PURCHASE_ADD_CART, data, success, error);
        };

        //
        this.postOutCart = function(data, success, error) {
          httpPost(API_BASE+API_PATH.PURCHASE_OUT_CART, data, success, error);
        };

        //
        this.postEditCart = function(data, success, error) {
          httpPost(API_BASE+API_PATH.PURCHASE_EDIT_CART, data, success, error);
        };

        //
        this.postPurchaseInfo = function(data, success, error) {
          httpPost(API_BASE+API_PATH.PURCHASE_INFO, data, success, error);
        };

        //
        this.postPurchaseInfoConfirm = function(data, success, error) {
          httpPost(API_BASE+API_PATH.PURCHASE_INFO_CONFIRM, data, success, error);
        };


        this.getPurchaseHistory = function(success, error) {
          httpGet(API_BASE+API_PATH.PURCHASE_HISTORY, success, error);
        };

        //
        this.postPayment = function(data, success, error) {
          httpPost(API_BASE+API_PATH.PAYMENT, data, success, error);
        };

        this.postPaymentCvs = function(data, success, error) {
          httpPost(API_BASE+API_PATH.PAYMENTCVS, data, success, error);
        };

        this.postCart = function(success, error) {
          httpPost(API_BASE+API_PATH.PURCHASE_CART, {},success, error);
        };

        this.postContact = function(data, success, error) {
          httpPost(API_BASE+API_PATH.CONTACT, data, success, error);
        };

        // 請求トップリスト
        this.getNow4List = function(type, limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.NOW4, {type:type,limit:limit,offset:offset}), success, error);
        };

        this.postNow4Search = function(data, success, error) {
          httpPost(API_BASE+API_PATH.NOW4_SEARCH, data, success, error);
        };

        // 請求トップリスト
        this.getNow5List = function(type, limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.NOW5, {type:type,limit:limit,offset:offset}), success, error);
        };

        this.postNow5Search = function(data, success, error) {
          httpPost(API_BASE+API_PATH.NOW5_SEARCH, data, success, error);
        };

        this.getFreePaperDetail = function(uuid, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.FREEPAPER_DETAIL, {uuid:uuid}), success, error);
        };

        this.postApplication = function(data, success, error) {
          httpPost(API_BASE+API_PATH.APPLICATION, data, success, error);
        };

        // 請求トップリスト
        this.getMyPageList = function(type, limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.MYPAGE, {type:type,limit:limit,offset:offset}), success, error);
        };

        // 請求トップリスト
        this.getMyPageStatus = function(favid, type, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.STATUS_MYPAGE, {favid:favid,type:type}), success, error);
        };

        //
        this.postRemoveMyPage = function(data, success, error) {
          httpPost(API_BASE+API_PATH.REMOVE_MYPAGE, data, success, error);
        };

        //
        this.postAddMyPage = function(data, success, error) {
          httpPost(API_BASE+API_PATH.ADD_MYPAGE, data, success, error);
        };

        //
        this.postCarry = function(data, success, error) {
          httpPost(API_BASE+API_PATH.CARRY, data, success, error);
        };

        //
        this.postWithdraw = function(data, success, error) {
          httpPost(API_BASE+API_PATH.WITHDRAW , data, success, error);
        };

        // 請求トップリスト
        this.getTeamList = function(type, limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.TEAM_LIST, {type:type,limit:limit,offset:offset}), success, error);
        };

        // 請求トップリスト
        this.getNotifyNav = function(success, error) {
          httpGet(API_BASE+API_PATH.NOTIFY_NAV, success, error);
        };

        // 請求トップリスト
        this.getNotifyList = function(limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.NOTIFY_LIST, {limit:limit,offset:offset}), success, error);
        };

        //
        this.postNotifyRead = function(data, success, error) {
          httpPost(API_BASE+API_PATH.NOTIFY_READ , data, success, error);
        };

        this.getStudioMoveup = function(sortScore, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.STUDIO_MOVEUP, {sortScore:sortScore}), success, error);
        };

        this.getPointList = function(limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.POINT_LIST, {limit:limit,offset:offset}), success, error);
        };

        this.postPointAD = function(data, success, error) {
          httpPost(API_BASE+API_PATH.POINT_AD , data, success, error);
        };

        this.postPurchaseEnd = function(data, success, error) {
          httpPost(API_BASE+API_PATH.PURCHASE_END , data, success, error);
        };

        this.getTvList = function(type, limit, offset, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.TV_LIST, {type:type,limit:limit,offset:offset}), success, error);
        };

        this.getTvDetail = function(uuid, success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.TV_DETAIL, {uuid:uuid}), success, error);
        };

        // 請求
        this.getSettings = function(success, error) {
          httpGet(API_BASE+API_PATH.SETTINGS_MYPAGE, success, error);
        };

        this.getSettingsNotify = function(type,uuid,settingKey,settingValue,success, error) {
          httpGet(API_BASE+stringFormat(API_PATH.SETTINGS_NOTIFY, {type:type,uuid:uuid,settingKey:settingKey,settingValue:settingValue}), success, error);
        };
    }
]);
