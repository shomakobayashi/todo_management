angular.module('moveupApp')
  .directive('pagination', ['PaginationService',
    function(paginationService){
      return {
            restrict: 'A',
            replace: false,
            link: function(scope,element,attrs){
                scope.upPageClick = function(page){
                    paginationService.upPageClick(scope,scope.pageObject,page);
                    //console.log(scope.pageObject.currentPage);
                };
                scope.downPageClick = function(page){
                    paginationService.downPageClick(scope,scope.pageObject,page);
                    //console.log(scope.pageObject.currentPage);
                };
                scope.showFirstPage = function(page){
                    paginationService.showFirstPageContent(scope,scope.pageObject,page);
                    //console.log(scope.pageObject.currentPage);
                };
                scope.showLastPage = function(page){
                    paginationService.showLastPageContent(scope,scope.pageObject,page);
                    console.log(scope.pageObject.currentPage);
                };
                scope.showCurrentPage = function(page){
                    paginationService.showCurrentPageContent(scope,scope.pageObject,page);
                    //console.log(scope.pageObject.currentPage);
                };
            }
        };
}]);
