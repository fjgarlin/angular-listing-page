(function() {
    'use strict';

    angular
        .module('dev-challenge')
        .config(function ($routeProvider) {
            $routeProvider
                // route for the home page
                .when('/', {
                    templateUrl : 'pages/listing.html',
                    controller  : 'NewsController as news'
                })
                // route for the detail
                .when('/article/:id', {
                    templateUrl : 'pages/article.html',
                    controller  : 'ArticleController as article'
                })
                .otherwise({
                    redirectTo: '/'
                });
            }
        );

})();
