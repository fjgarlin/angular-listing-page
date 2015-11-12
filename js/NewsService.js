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
        self.categories = [
            { id: 1, name: 'UK' },
            { id: 2, name: 'World' },
            { id: 3, name: 'Business' },
            { id: 4, name: 'Politics' },
            { id: 5, name: 'Tech' },
            { id: 6, name: 'Science' },
            { id: 7, name: 'Education' }
        ];
        self.article = {
            data: null
        };

        //functions offered
        self.getPage = getPage;
        self.getArticle = getArticle;
        self.likeArticle = likeArticle;
        self.disliketArticle = dislikeArticle;

        //local variables to service
        var api = $resource('http://jsonplaceholder.typicode.com/posts/:article', {
          article: '@article'
        },{
          'update': { method:'PUT' }
        });

        /////////////////////
        function likeArticle(id) {
            api.update({ article: id }, { like: true }, function(data) {
                console.log(data);
            });
        }
        function dislikeArticle(id) {
            api.update({ article: id }, { dislike: true }, function(data) {
                console.log(data);
            });
        }

        function getArticle(id) {
            api.get({ article: id }, function(data) {
                data.img = "http://lorempixel.com/900/300/?" + data.id;
                self.article.data = data;
            });
        }

        function getPage(page, category) {
            //update immediate data
            self.articles.currentCategory = category;
            self.articles.data = {};

            //and query api for new data
            api.query(
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
