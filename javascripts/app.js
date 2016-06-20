var weatherApp = angular.module("weatherApp", ["ngResource", "ngRoute", "ngMessages", 'ngStorage']);

// Define routes for the different page views

weatherApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/about', {
            templateUrl: 'views/about.html'
        }).
        when('/weather', {
            templateUrl: 'views/weather.html',
            controller: 'weatherCtrl'
        }).
        otherwise({
            redirectTo: '/about'
        });
  }]);
