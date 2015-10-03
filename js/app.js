var app = angular.module('NewsApp', ['ngRoute', 'ngSanitize']);
app.config(function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      controller: 'HomeController', 
      templateUrl: 'views/home.html' 
    })
    .when('/news/:id', {
    	controller: 'NewsController',
    	templateUrl: 'views/news.html'
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});

