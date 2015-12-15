(function() {
    'use strict';

    angular
        .module('dev-challenge')
        .controller('ArticleController', ArticleController);

    ArticleController.$inject = ['NewsService', '$routeParams'];

    /* @ngInject */
    function ArticleController(NewsService, $routeParams) {
      //console.log($routeParams);

      var vm = this;
      vm.title = 'ArticleController';
      vm.id = $routeParams.id;
      vm.article = NewsService.article;
      vm.getArticle = getArticle;
      vm.like = like;
      vm.dislike = dislike;

      activate();
      //*************************************************

      function activate() {
        vm.getArticle(vm.id);
      }

      function getArticle(id) {
        NewsService.getArticle(id);
      }

      function like() {
        NewsService.likeArticle(vm.id);
      }

      function dislike() {
        NewsService.dislikeArticle(vm.id);
      }
    }
})();
