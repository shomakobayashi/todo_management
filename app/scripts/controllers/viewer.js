'use strict';

/**
 * @ngdoc function
 * @name moveupApp.controller:TermsCtrl
 * @description
 * # AboutCtrl
 * Controller of the moveupApp
 */
angular.module('moveupApp')
  .controller('ViewerCtrl',  ['$scope', '$http','ApiService', 'PaginationService', '$location', '$routeParams', function ($scope, $http, apiService, paginationService,$location,$routeParams) {
    $scope.hideFooter = false;

    $scope.url = $location.search().url;
    //$scope.url = $routeParams.path
    $scope.content = 'JAPAN MOVE UP WEST WEB 利用規約';

    var pageNum = 1;
    var pdfScale = 0.855; // make pdfScale a global variable
    if(window.screen.width<415){
  		pdfScale = 0.532;
  	}
  	if(window.screen.width<376){
  		pdfScale = 0.482;
  	}
    var shownPdf; // another global we'll use for the buttons
    var url = $scope.url; // PDF to load: change this to a file that exists;


    function renderPage(page) {
      var scale = pdfScale; // render with global pdfScale variable
      var viewport = page.getViewport(scale);
      var canvas = document.getElementById('the-canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    }

    function displayPage(pdf, num) {
      pdf.getPage(num).then(function getPage(page) { renderPage(page); });
    }

    // var pdfDoc = PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {

    // This dosent goes well
    //
    var pdfDoc = PDFJS.getDocument({
      url: url,
      httpHeaders: {
        // "Access-Control-Allow-Origin" : "*"
        // "Access-Control-Allow-Methods" : "POST, GET, OPTIONS",
        // "Access-Control-Allow-Headers" : "Origin, Authorization, Accept"
      },
      withCredentials: true,
    }).then(function getPdfHelloWorld(pdf) {

        displayPage(pdf, 1);
      shownPdf = pdf;
    });


    var zoominbutton = document.getElementById("zoominbutton");
    zoominbutton.onclick = function() {
      pdfScale = pdfScale + 0.25;
      displayPage(shownPdf, pageNum);
    }

    var zoomoutbutton = document.getElementById("zoomoutbutton");
    zoomoutbutton.onclick = function() {
      if (pdfScale <= 0.25) {
        return;
      }
      pdfScale = pdfScale - 0.25;
      displayPage(shownPdf, pageNum);
    }

    $('html,body').animate({scrollTop:0}, 0);
  }]);
