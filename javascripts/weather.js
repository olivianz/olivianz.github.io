var myApp = angular.module('weatherApp');
myApp.controller('weatherCtrl', myFunction);
function myFunction($scope, $location, $routeParams, $resource, $localStorage) {
    var locationInfo = $resource("http://sitwww.lincoln.ac.nz/wuautocomplete.php/?query=:searchtext");
    var weatherInfo = $resource("http://api.wunderground.com/api/02db7dc5a95f8654/conditions/forecast10day/q/zmw::zmwid.json");

    $scope.storage = $localStorage;

    //The code below sets the default temperature of $localStorage to celsius.
    $localStorage.$default({ temperature: "celsius" });

    //getLocation() replaces the placeholder in locationInfo with the place user typed in, 
    $scope.getLocation = function () {
        $scope.locations = locationInfo.get({ searchtext: $scope.place });
    }

    //$scope.locationSelected indicated if the getWeather button is clicked.
    $scope.locationSelected = false;

    //getWeather() replaces the placeholder in weatherInfo with the zmwid selected, and call a callback function called statistics.
    //and sets $scope.locationSelected to true, so all the weather information would display.
    $scope.getWeather = function (location) {
        $scope.locationSelected = false;
        $scope.status = "Please wait...";
        $scope.storage.zmw = location.zmw;
        $scope.weather = weatherInfo.get({ zmwid: $scope.storage.zmw }, statistics);
        $scope.place = "";
        $scope.inputForm.$setUntouched();
    }

    //$scope.max is the maximum high temperature. It is set to -460 because absolute zero is −459.67 °F.
    //$scope.min is the minimum low temperature. 
    //A for loop is used to find the maximum high temperature and the minimum low temperature by using bubble sort algorithm. 
    //extrema() data-binds to radio buttons, so when the user changes temperature units, the corresponding statistics would be updated.
    $scope.extrema = function () {
        $scope.max = -460;
        $scope.min = 460;
        for (var i = 0; i < 5; i++) {
            if ($scope.storage.temperature === 'celsius') {
                if ($scope.max < parseFloat($scope.weather.forecast.simpleforecast.forecastday[i].high.celsius))
                { $scope.max = parseFloat($scope.weather.forecast.simpleforecast.forecastday[i].high.celsius); }
                if ($scope.min > parseFloat($scope.weather.forecast.simpleforecast.forecastday[i].low.celsius))
                { $scope.min = parseFloat($scope.weather.forecast.simpleforecast.forecastday[i].low.celsius); }
            }
            else {
                if ($scope.max < parseFloat($scope.weather.forecast.simpleforecast.forecastday[i].high.fahrenheit))
                { $scope.max = parseFloat($scope.weather.forecast.simpleforecast.forecastday[i].high.fahrenheit); }
                if ($scope.min > parseFloat($scope.weather.forecast.simpleforecast.forecastday[i].low.fahrenheit))
                { $scope.min = parseFloat($scope.weather.forecast.simpleforecast.forecastday[i].low.fahrenheit); }
            }
        }
    }

    //statistics() is a callback function passed as argument in $scope.getWeather().
    //extrema() is called to calculate the maximum and minimum temperature.
    //The $scope.fine would be incremented if the condition is clear or sunny.
    function statistics() {
        $scope.status = "";
        $scope.fine = 0;
        $scope.extrema();
        for (var i = 0; i < 5; i++) {
            if ($scope.weather.forecast.simpleforecast.forecastday[i].conditions === 'Clear' || $scope.weather.forecast.simpleforecast.forecastday[i].conditions === 'Sunny')
            { $scope.fine++; }
        }
        $scope.locationSelected = true;
    }

    //fresh() is similar to getWeather().
    $scope.fresh = function () {
        $scope.status = "Please wait...";
        $scope.weather = weatherInfo.get({ zmwid: $scope.storage.zmw }, statistics);        
    }
}
