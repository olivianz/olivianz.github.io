var portfolioApp = angular.module("portfolioApp", ["ngResource", "ngRoute", "ngMessages", 'ngStorage']);

// Define routes for the different page views

portfolioApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/CRUD', {
            templateUrl: 'views/CRUD.html',
            controller: 'CRUDCtrl'
        }).
        when('/weather', {
            templateUrl: 'views/weather.html',
            controller: 'weatherCtrl'
        }).
        otherwise({
            redirectTo: '/weather'
        });
  }]);
