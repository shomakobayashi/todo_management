'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:EntryCtrl
 * @description
 * # EntryCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('EntryCtrl', ['$scope', '$location', '$window', 'ApiService','$routeParams','ngDialog',function ($scope, $location, $window, apiService,$routeParams,ngDialog) {
     $scope.hideFooter = true;
     $scope.passwordHide = false;
     $scope.mailDisabled = false;
     $scope.checked = false;
     $scope.errStr = '';
     $scope.formData = {
       gender: 1,
       birthyear: '2018',
       birthmonth: '1',
       birthday: '1',
       career: '0'
     };

     $scope.selectHide0 = true;
     $scope.selHide1 = true;
     $scope.selDesc1 = "職業を選択";
     $scope.selContent1 = 0;

     $scope.selectYearHide = true;
     $scope.selectYearDesc = '';

     $scope.selectMonthHide = true;
     $scope.selectMonthDesc = '';

     $scope.selectDayHide = true;
     $scope.selectDayDesc = '';
     //get year
     $scope.date = new Date().getFullYear();
     $scope.yearList = [];
     //yearList
     for(var i = $scope.date;i >= $scope.date - 80;i--){
       $scope.yearList.push({'desc' : i});
     }
     //monthList
     $scope.monthList = [
       {'desc':'12'},{'desc':'11'},{'desc':'10'},{'desc':'09'},{'desc':'08'},{'desc':'07'},
       {'desc':'06'},{'desc':'05'},{'desc':'04'},{'desc':'03'},{'desc':'02'},{'desc':'01'}
     ];
     //dayList
     $scope.dayList = [
       {'desc':'31'},{'desc':'30'},{'desc':'29'},{'desc':'28'},{'desc':'27'},{'desc':'26'},{'desc':'25'},{'desc':'24'},{'desc':'23'},{'desc':'22'},
       {'desc':'21'},{'desc':'20'},{'desc':'19'},{'desc':'18'},{'desc':'17'},{'desc':'16'},{'desc':'15'},{'desc':'14'},{'desc':'13'},{'desc':'12'},
       {'desc':'11'},{'desc':'10'},{'desc':'09'},{'desc':'08'},{'desc':'07'},{'desc':'06'},{'desc':'05'},{'desc':'04'},{'desc':'03'},{'desc':'02'},
       {'desc':'01'}
     ];

     $scope.onzipcodeChanged = function() {
       AjaxZip3.zip2addr(document.getElementById('zipcode1'),'','address','address');
     }

     $scope.getPersonInfo = function(){
       if($scope.hasPerson == false){
         $location.path('/entry');
       }
       apiService.getPerson(function onSuccess(result) {
         $scope.formData.firstName = result.firstName;
         $scope.formData.secondName = result.secondName;
         $scope.formData.firstNameKana = result.firstNameKana;
         $scope.formData.secondNameKana = result.secondNameKana;
         $scope.formData.gender = result.gender;
         $scope.formData.zipcode = result.zipcode;
         $scope.formData.address = result.address;
         $scope.formData.address2 = result.address2;
         $scope.selectYearDesc = result.birthyear;
         $scope.selectMonthDesc = result.birthmonth;
         $scope.selContent1 = result.career;
         $scope.selectDayDesc = result.birthday;
         $scope.formData.mail = result.mail;
         $scope.formData.nickname = result.nickname;

         if($scope.selContent1 == 1){
           $scope.selDesc1 = '中学生';
         }else if($scope.selContent1 == 2){
           $scope.selDesc1 = '高校生';
         }else if($scope.selContent1 == 3){
           $scope.selDesc1 = '専門学生';
         }else if($scope.selContent1 == 4){
           $scope.selDesc1 = '大学生';
         }else if($scope.selContent1 == 5){
           $scope.selDesc1 = '公務員';
         }else if($scope.selContent1 == 6){
           $scope.selDesc1 = '自営業';
         }else if($scope.selContent1 == 7){
           $scope.selDesc1 = '会社役員';
         }else if($scope.selContent1 == 8){
           $scope.selDesc1 = '会社員';
         }else if($scope.selContent1 == 9){
           $scope.selDesc1 = '派遣社員';
         }else if($scope.selContent1 == 10){
           $scope.selDesc1 = '契約社員';
         }else if($scope.selContent1 == 11){
           $scope.selDesc1 = '専業主婦';
         }else if($scope.selContent1 == 12){
           $scope.selDesc1 = '専業主夫';
         }else if($scope.selContent1 == 13){
           $scope.selDesc1 = 'パート・アルバイト';
         }else if($scope.selContent1 == 14){
           $scope.selDesc1 = 'その他';
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

     if($window.localStorage['registMail']){
       $scope.formData.mail = $window.localStorage['registMail'];
       $scope.mailDisabled = true;
     }else{
       $scope.passwordHide = true;
       $scope.getPersonInfo();
     }

     $scope.shopCloseAllSelect = function () {
         $scope.selectHide0 = true;
         $scope.selHide1 = true;
         $scope.selectYearHide = true;
         $scope.selectMonthHide = true;
         $scope.selectDayHide = true;
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

     $scope.yearSelect = function () {
         $scope.selectYearHide = false;
         $scope.selectHide0 = false;
     }
     $scope.yearSelectClose = function () {
         $scope.selectYearHide = true;
         $scope.selectHide0 = true;
     }
     $scope.yearSelectValue = function (desc) {
         $scope.selectYearDesc = desc;
     }

     $scope.monthSelect = function () {
         $scope.selectMonthHide = false;
         $scope.selectHide0 = false;
     }
     $scope.monthSelectClose = function () {
         $scope.selectMonthHide = true;
         $scope.selectHide0 = true;
     }
     $scope.monthSelectValue = function (desc) {
         $scope.selectMonthDesc = desc;
     }

     $scope.daySelect = function () {
         $scope.selectDayHide = false;
         $scope.selectHide0 = false;
     }
     $scope.daySelectClose = function () {
         $scope.selectDayHide = true;
         $scope.selectHide0 = true;
     }
     $scope.daySelectValue = function (desc) {
         $scope.selectDayDesc = desc;
     }

     $scope.gotoConfirm = function(){
       var reg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

       $('#errContainer').children().remove();
       if(!$scope.formData.firstName){
         $('#errContainer').append('<div id="firstName.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・氏名（漢字）姓を入力してください。</div>');
       }
       if(!$scope.formData.secondName){
         $('#errContainer').append('<div id="secondName.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・氏名（漢字）名を入力してください。</div>');
       }
       if(!$scope.formData.firstNameKana){
         $('#errContainer').append('<div id="firstNameKana.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・氏名（カナ）姓を入力してください。</div>');
       }
       if(!$scope.formData.secondNameKana){
         $('#errContainer').append('<div id="secondNameKana.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・氏名（カナ）名を入力してください。</div>');
       }
       if($scope.selContent1 == '0'){
         $('#errContainer').append('<div id="occupation.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・職業を入力してください。</div>');
       }
       if(!$scope.formData.zipcode){
         $('#errContainer').append('<div id="zipcode1.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・郵便番号前半を入力してください。</div>');
       }
       $scope.formData.address = $('#address').val();
       if(!$scope.formData.address){
         $('#errContainer').append('<div id="address.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・住所を入力してください。</div>');
       }
       if(!$scope.formData.mail || $scope.formData.mail.length == 0 || !reg.test($scope.formData.mail)){
         $('#errContainer').append('<div id="mail.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・有効なメールアドレスを入力してください。</div>');
       }
       if(!$scope.passwordHide && !$scope.formData.password){
         $('#errContainer').append('<div id="password.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・パースワードを入力してください。</div>');
       }
       if(!$scope.checked){
         $('#errContainer').append('<div id="isTerms.errors" style="color:#F23B26" class="waring_Label col-lg-offset-3 col-xs-offset-1">・利用規約を承認してください。</div>');
       }
       if($('#errContainer').children().length == 0){
         $scope.formData.birthyear = $scope.selectYearDesc;
         $scope.formData.birthmonth = $scope.selectMonthDesc;
         $scope.formData.birthday = $scope.selectDayDesc;
         $scope.formData.career = $scope.selContent1;
         $window.localStorage['profile'] = JSON.stringify($scope.formData);
         $location.path('/entryConfirm');
       }
     }
     $('html,body').animate({scrollTop:0}, 0);
  }]);
