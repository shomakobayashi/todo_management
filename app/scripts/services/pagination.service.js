


angular.module('moveupApp')
    .service('PaginationService', function($compile){
            var getPageData = function(scope,pageObject,page){
                pageObject.currentPage = page;
                $('#'+pageObject.pagesId).children().remove();
                pageObject.pages = [];
                if(pageObject.totalPage > 0){
                  for(var i=0;i<pageObject.totalPage; i++){
                    if(i < 5){
                        if(pageObject.currentPage < 3) {                 // 1 2 3 4 5     1 2 3      1 2
                            var pageInfo = i+1;
                            pageObject.pages.push(pageInfo);
                        }else if(pageObject.totalPage - pageObject.currentPage < 2) {  //     2 3 4 5 6    1 2 3
                            var total = pageObject.totalPage > 5?5:pageObject.totalPage;
                            var offset = pageObject.currentPage - (total - 1 + (pageObject.currentPage - pageObject.totalPage));
                            var pageInfo = i+offset;
                            pageObject.pages.push(pageInfo);
                        }else {
                            var offset = pageObject.currentPage - 2;
                            var pageInfo = i+offset;
                            pageObject.pages.push(pageInfo);
                        }
                    }
                  }
                }
                for(var item in pageObject.pages){
                  var classStr = '';
                  if(pageObject.pages[item] == pageObject.currentPage){
                    classStr = ' class="checked"';
                  }
                  var htmlCode = '<a href="javascript:void(0);">' +
                    '<li style="margin: 0 5px"'+classStr+' ng-click="showCurrentPage('+pageObject.pages[item]+')">'+pageObject.pages[item]+'</li>' +
                  '</a>';
                  $('#'+pageObject.pagesId).append(htmlCode);
                  // var compileFn=$compile(htmlCode);
                  // var $dom=compileFn(scope);
                  // $dom.appendTo(document.getElementsByClassName(pageObject.pagesId));
                }
                if(pageObject.pages.length){
                  $compile($('#'+pageObject.pagesId).contents())(scope);
                }
            };

            var service = {

                upPageClick: function(scope,pageObject,page){
                    if(pageObject.currentPage == 1){
                        return;
                    };
                    pageObject.currentPage --;
                    // getPageData(scope,pageObject,page);
                    pageObject.updateFunc();
                },

                downPageClick: function(scope,pageObject,page){
                    if(pageObject.currentPage >= pageObject.totalPage){
                        return;
                    };
                    pageObject.currentPage ++;
                    // getPageData(scope,pageObject,page);
                    pageObject.updateFunc();
                },

                showFirstPageContent: function(scope,pageObject,page){
                    pageObject.currentPage = 1;
                    getPageData(scope,pageObject,page);
                },

                showLastPageContent: function(scope,pageObject,page){
                    pageObject.currentPage = pageObject.totalPage;
                    getPageData(scope,pageObject,page);
                },

                showCurrentPageContent: function(scope,pageObject,page){
                  if(pageObject.currentPage != page) {
                    pageObject.currentPage = page;
                    // getPageData(scope,pageObject,page);
                    pageObject.updateFunc();
                  }
                },

                updatePagination: function(scope,pageObject){
                  getPageData(scope,pageObject,pageObject.currentPage);
                }
            };
            return service;
});
