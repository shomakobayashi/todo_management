'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the moveupApp
 */
 angular.module('moveupApp')
   .controller('ProfileConfirmCtrl', ['$scope', '$location', '$window', 'ApiService','Upload','ngDialog',function ($scope, $location, $window, apiService,Upload,ngDialog) {
     $scope.hideFooter = false;

     $scope.resetHide = true;
     $scope.thumbnailUrl = 'images/thumbnail.png';

     $scope.newsDetailInfoStr = $window.localStorage['newsDetailInfo'];
     $scope.eventDetailInfoStr = $window.localStorage['eventDetailInfo'];
	 $scope.reportDetailInfoStr = $window.localStorage['reportDetailInfo'];
     $scope.formDataStr = $window.localStorage['formData'];
     $scope.formData = JSON.parse($scope.formDataStr);
     $scope.formData2 = JSON.parse($scope.formDataStr);

     if($scope.formData.gender == 1){
       $scope.formData.gender = '男性';
     }else{
       $scope.formData.gender = '女性';
     }
    if($scope.formData.career == 1){
      $scope.formData.career = '中学生';
    }else if($scope.formData.career == 2){
      $scope.formData.career = '高校生';
    }else if($scope.formData.career == 3){
      $scope.formData.career = '専門学生';
    }else if($scope.formData.career == 4){
      $scope.formData.career = '大学生';
    }else if($scope.formData.career == 5){
      $scope.formData.career = '公務員';
    }else if($scope.formData.career == 6){
      $scope.formData.career = '自営業';
    }else if($scope.formData.career == 7){
      $scope.formData.career = '会社役員';
    }else if($scope.formData.career == 8){
      $scope.formData.career = '会社員';
    }else if($scope.formData.career == 9){
      $scope.formData.career = '派遣社員';
    }else if($scope.formData.career == 10){
      $scope.formData.career = '契約社員';
    }else if($scope.formData.career == 11){
      $scope.formData.career = '専業主婦';
    }else if($scope.formData.career == 12){
      $scope.formData.career = '専業主夫';
    }else if($scope.formData.career == 13){
      $scope.formData.career = 'パート・アルバイト';
    }else if($scope.formData.career == 14){
      $scope.formData.career = 'その他';
    }

     // if(!$scope.newsDetailInfoStr){
     //   $location.path('/');
     // }
     // if(!$scope.formDataStr){
     //   $location.path('/');
     // }

     // $scope.uploader = new FileUploader({
     //    url:apiService.getApiBase() + apiService.getApiPath().PERSON_UPDATE,
     //    withCredentials: true
     // });
     // $scope.uploader.onAfterAddingFile = function(fileItem) {
     //    // $scope.uploader.queue
     // };

    //  $scope.accountImgPreview = function(fileDom){
    //     if (window.FileReader){
    //         var reader = new FileReader();
    //     } else {
    //         alert("このデバイスは画像アップロードをサポートしていません！");
    //     }
    //
    //     var file = fileDom.files[0];
    //     var imageType = /^image\//;
    //
    //     if(!imageType.test(file.type)){
    //         alert("画像を選択してください！");
    //         return;
    //     }
    //
    //     reader.onload = function(e) {
    //         var img = document.getElementById("account_preview");
    //         img.src = e.target.result;
    //     }
    //     reader.readAsDataURL(file);
    //     $scope.formData.thumbnail = file;
    // }

    // $scope.gotoReset = function(){
    //   $location.path('/resetConfirm');
    // }

     // $scope.getPersonInfo = function(){
     //   apiService.getPerson(function onSuccess(result) {
     //     $scope.hideFooter = false;
     //
     //     $scope.formData.firstName = result.firstName;
     //     $scope.formData.secondName = result.secondName;
     //     $scope.formData.firstNameKana = result.firstNameKana;
     //     $scope.formData.secondNameKana = result.secondNameKana;
     //     $scope.formData.gender = result.gender;
     //     $scope.formData.career = result.career+"";
     //     $scope.formData.zipcode = result.zipcode;
     //     $scope.formData.address = result.address;
     //     $scope.formData.birthyear = result.birthyear;
     //     $scope.formData.birthmonth = result.birthmonth;
     //     $scope.formData.birthday = result.birthday;
     //     $scope.formData.mail = result.mail;
     //     $scope.formData.nickname = result.nickname;
     //     if(result.thumbnailUrl){
     //       $scope.thumbnailUrl = result.thumbnailUrl
     //     }
     //     if(result.loginType && result.loginType == 3){
     //       $scope.resetHide = false;
     //     }
     //   }, function onError(message) {
     //     ngDialog.open({
     //       showClose: false,
     //       template:'templateTip',
     //       className: 'ngdialog-theme-default',
     //       controller: ['$scope', function($scope) {
     //           $scope.content = 'データの取得に失敗しました。';
     //       }]
     //     });
     //   });
     // }

     // $scope.updateProfile = function(){
       // var errMsg = '';
       // if($scope.formData.password && $scope.formData.password.length < 6){
       //   errMsg = 'パスワードは6文字以上で入力してください。';
       // }else if($scope.formData.password && $scope.formData.password != $scope.formData.password_re){
       //   errMsg = 'パスワードが一致していません。';
       // }
       //
       // if(errMsg.length > 0){
       //   ngDialog.open({
       //     showClose: false,
       //     template:'templateTip',
       //     className: 'ngdialog-theme-default',
       //     controller: ['$scope', function($scope) {
       //         $scope.content = errMsg;
       //     }]
       //   });
       //   return;
       // }
       // Upload.upload({
       //    url: apiService.getApiBase() + apiService.getApiPath().PERSON_UPDATE,
       //    data: $scope.formData2,
       //    withCredentials: true
       // }).success(function (data) {
       //   // $scope.formData = {};
       //   // $scope.getPersonInfo();
       //   $scope.onApplication();
       // }).error(function () {
       //   ngDialog.open({
       //     showClose: false,
       //     template:'templateTip',
       //     className: 'ngdialog-theme-default',
       //     controller: ['$scope', function($scope) {
       //         $scope.content = '操作が失敗しました。しばらくしてからもう一度お試しください。';
       //     }]
       //   });
       // });
     // }

     $scope.onApplication = function(){
       $scope.event={};
       var newsDetailInfoStr = $window.localStorage['newsDetailInfo'];
       if(newsDetailInfoStr ){
         $scope.result = JSON.parse(newsDetailInfoStr);
           $scope.event.entryId =  $scope.result[0].newsId;
           // $scope.event.type = $scope.result2[0].type;
           if( $scope.result[0].type == 2){
              $scope.event.type = 1
           }else if( $scope.result[0].type == 1){
             $scope.event.type = 2
           }
           $scope.event.title = $scope.result[0].title;
           $scope.event.contents = $scope.result[0].detail;
       }
	   
	   var reportDetailInfoStr = $window.localStorage['reportDetailInfo'];
	   if(reportDetailInfoStr ){
	     $scope.result = JSON.parse(reportDetailInfoStr);
	       $scope.event.entryId =  $scope.result[0].reportId;
	       // $scope.event.type = $scope.result2[0].type;
	       if( $scope.result[0].type == 2){
	          $scope.event.type = 1
	       }else if( $scope.result[0].type == 1){
	         $scope.event.type = 2
	       }
	       $scope.event.title = $scope.result[0].title;
	       $scope.event.contents = $scope.result[0].detail;
	   }

       var eventDetailInfoStr = $window.localStorage['eventDetailInfo'];
       if(eventDetailInfoStr ){
         $scope.result2 = JSON.parse(eventDetailInfoStr);
           $scope.event.entryId = $scope.result2[0].eventId;
           $scope.event.type = 3;
           $scope.event.title = $scope.result2[0].title;
           $scope.event.contents = $scope.result2[0].comment;
       }


         apiService.postApplication($scope.event, function onSuccess(resultList){
           $location.path('/applicationOver');
          }, function onError(message, statusCode, statusList) {
            if(statusCode == statusList.USER_ID_INVALID){
              message = '既に応募済みです。';
            }
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

     //$scope.getPersonInfo();

     $('html,body').animate({scrollTop:0}, 0);
  }]);
