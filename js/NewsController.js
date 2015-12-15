(function() {
    'use strict';

    angular
        .module('dev-challenge')
        .controller('NewsController', NewsController);

    NewsController.$inject = ['NewsService'];

    /* @ngInject */
    function NewsController(NewsService) {
      var vm = this;
      vm.title = 'NewsController';
      vm.articles = NewsService.articles;
      vm.getPage = NewsService.getPage;

      activate();
      //*************************************************

      function activate() {
        NewsService.getPage(1, null);
      }
    }
})();
