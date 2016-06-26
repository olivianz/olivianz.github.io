var portfolioApp = angular.module("portfolioApp", ["ngResource", "ngRoute", "ngMessages", 'ngStorage']);

// Define routes for the different page views

portfolioApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/CRUD', {
            templateUrl: 'Views/CRUD.html',
            controller: 'CRUDCtrl'
        }).
        when('/weather', {
            templateUrl: 'Views/weather.html',
            controller: 'weatherCtrl'
        }).
        otherwise({
            redirectTo: '/weather'
        });
  }]);
