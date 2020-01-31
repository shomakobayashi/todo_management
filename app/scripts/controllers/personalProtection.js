'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:PersonalProtection
 * @description
 * # AboutCtrl
 * Controller of the moveupApp
 */
angular.module('moveupApp')
  .controller('PersonalProtectionCtrl',['$scope', '$http','ApiService', '$location', '$routeParams' ,function ($scope, $http, apiService, $location,$routeParams) {
    $scope.hideFooter = false;

    $scope.content = '</br><ul><li><h4>個人情報保護方針</h4></li></ul>'+
    '株式会社HEADLINE WEST（以下『当社』といいます。）は、情報誌、インターネット、モバイル、さらにはイベントなど多様なメディアを活用し、『岡山の街と人、街と街、人と人をつなぐ場』を提供しています。当社では事業運営上多くのお客様や従業者の個人情報を取扱うこととなるため、本方針を定め、個人情報管理体制を確立し、企業として責任ある対応を実現するものとします。'+
    '</br>'+
    '</br>'+
    '<ul><li><h4>１（個人情報の取得、利用、第三者への提供について）</h4></li></ul>'+
    '(１)　個人情報は、適法かつ適正な方法で取得します。'+
    '</br>(２)　個人情報の利用の目的をできる限り特定し、当該目的の達成に必要な範囲内で適切に取り扱います。'+
    '</br>(３)　個人情報は、プライバシーポリシー規程の例外に該当しない限り、本人の同意なく第三者に提供しません。'+
    '</br>'+
    '</br>'+
    '<ul><li><h4>２（法の遵守と社内規定の策定等について）</h4></li></ul>'+
    '(１)　個人情報保護に関する法令を遵守します。'+
    '</br>(２)　個人情報保護に関する社内規程を定め、継続的な見直しを行い遵守します。'+
    '</br>'+
    '</br>'+
    '<ul><li><h4>３（個人情報の安全管理について）</h4></li></ul>'+
    '(１)　個人情報の管理にあたっては、漏洩・滅失・毀損の防止及び是正、その他の安全管理のために必要かつ適正な措置を講じます。'+
    '</br>(２)　個人情報の目的外利用を行わないための措置を講じます。'+
    '</br>'+
    '</br>'+
    '<ul><li><h4>４（苦情および相談への対応について）</h4></li></ul>'+
    '個人情報保護に関する苦情及び相談に対応する窓口を設けて、適切に対応するよう努めます。'+
    '</br>'+
    '</br>'+
    '<ul><li><h4>５（個人情報保護の取組みについて）</h4></li></ul>'+
    '個人情報保護の取組みについて、定期的に見直し、継続的に改善していきます。'+
    '</br>'+
    '</br>'+
    '</br><div align="right">制定日　　2018年５月４日</div>'+
    '</br><div align="right">株式会社HEADLINE WEST</div>'+
    '</br><div align="right">代表取締役社長　源　眞典</div>';

    $('html,body').animate({scrollTop:0}, 0);
  }]);
