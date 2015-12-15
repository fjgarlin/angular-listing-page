(function() {
    'use strict';

    angular
        .module('dev-challenge')
        .service('NewsService', NewsService);

    NewsService.$inject = ['$resource'];

    /* @ngInject */
    function NewsService($resource) {
        var self = this;

        //data offered
        self.articles = {
            data: null,
            pagination: null,
            currentPage: 1,
            currentCategory: null
        }
        self.categories = {
            data: null,
            currentCategory: null
        };
        self.article = {
            data: null
        };

        //functions offered
        self.getPage = getPage;
        self.getCategories = getCategories;
        self.getArticle = getArticle;
        self.likeArticle = likeArticle;
        self.dislikeArticle = dislikeArticle;

        //local variables to service
        var api_base_url = 'http://jsonplaceholder.typicode.com/';
        var news_endpoint = $resource(api_base_url + 'posts/:article', {
          article: '@article'
        },{
          'update': { method:'PATCH' }
        });
        var categories_endpoint = $resource(api_base_url + 'users');

        /////////////////////
        function likeArticle(id) {
            news_endpoint.update({ article: id }, { userId: 1 }, function(data) {
                console.log(data);
            });
        }
        function dislikeArticle(id) {
            news_endpoint.update({ article: id }, { userId: 1 }, function(data) {
                console.log(data);
            });
        }

        function getArticle(id) {
            news_endpoint.get({ article: id }, function(data) {
                data.img = "http://lorempixel.com/900/300/?" + data.id;
                data.likes = Math.floor(Math.random() * (50 - 2) + 2);
                data.dislikes = Math.floor(Math.random() * (50 - 2) + 2);
                self.article.data = data;
            });
        }

        function getCategories() {
            /*self.categories.data = [
                { id: 1, name: 'UK' },
                { id: 2, name: 'World' },
                { id: 3, name: 'Business' },
                { id: 4, name: 'Politics' },
                { id: 5, name: 'Tech' },
                { id: 6, name: 'Science' },
                { id: 7, name: 'Education' },
                { id: 8, name: 'Food' }
            ];
            */
            self.categories.data = categories_endpoint.query();
        }

        function getPage(page, category) {
            //update immediate data
            self.articles.currentCategory = category;
            self.categories.currentCategory = category;
            self.articles.data = null;

            //and query api for new data
            news_endpoint.query(
              {
                /*page: 1,
                category_id: category*/
              },
              function(data) {
                //console.log(data); //manipulate data if needed
                var min = (page - 1)*10;
                var max = min + 10;
                data = data.slice(min, max);
                for (var i = data.length - 1; i >= 0; i--) {
                  data[i].img = "http://lorempixel.com/300/200/?" + data[i].id;
                  data[i].likes = Math.floor(Math.random() * (50 - 2) + 2);
                  data[i].dislikes = Math.floor(Math.random() * (50 - 2) + 2);
                };

                //update data again
                self.articles.data = data;
                self.articles.pagination = {
                    total: 10,
                    current: page
                };
                self.articles.currentPage = page;
                console.log(self);
              }
            );
        }
    }
})();
