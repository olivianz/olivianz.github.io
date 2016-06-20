var weatherApp = angular.module("weatherApp", ["ngResource", "ngRoute", "ngMessages", 'ngStorage']);

// Define routes for the different page views

weatherApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/about', {
            templateUrl: 'Views/about.html'
        }).
        when('/weather', {
            templateUrl: 'Views/weather.html',
            controller: 'weatherCtrl'
        }).
        otherwise({
            redirectTo: '/about'
        });
  }]);
