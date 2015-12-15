(function() {
    'use strict';

    angular
        .module('dev-challenge')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['NewsService'];

    /* @ngInject */
    function CategoriesController(NewsService) {
      var vm = this;
      vm.title = 'CategoriesController';
      vm.categories = NewsService.categories;
      vm.getPage = NewsService.getPage;

      activate();
      //*************************************************

      function activate() {
        NewsService.getCategories();
      }
    }
})();
