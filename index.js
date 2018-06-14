var app = angular.module("WeatherApp", []);
app.controller("MainCtrl", function($scope, $http, $timeout) {
  var api = "https://fcc-weather-api.glitch.me/api/current?";
  var lat, lon;
  var tempUnit = "C";
  var currentTempInCelsius;
  $scope.city = "";
  
  $scope.tempChange = tempChange;
  $scope.getIcon = getIcon
  
  activate();
  
  function activate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = "lat=" + position.coords.latitude;
        var lon = "lon=" + position.coords.longitude;
        getWeather(lat, lon);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function tempChange() {
    if ($scope.tempType == "C") {
      var fahTemp = Math.round($scope.currentTempInCelsius * 9 / 5 + 32);
      $scope.currentTemp = fahTemp;
      $scope.tempType = "F";
    } else {
      $scope.currentTemp = $scope.currentTempInCelsius;
      $scope.tempType = "C";
    }
  }

  function getWeather(lat, lon) {
    var urlString = api + lat + "&" + lon;
    $http.get(urlString).then(
      function successCallback(response) {
        $scope.city = response.data.name;
        $scope.country = response.data.sys.country;
        $scope.currentTempInCelsius =
          Math.round(response.data.main.temp * 10) / 10;
        $scope.desc = response.data.weather[0].main;
        $scope.currentTemp = $scope.currentTempInCelsius;
        $scope.tempType = "C";
      },
      function errorCallback(response) {
        $scope.error = response.statusText;
      }
    );
  }

  function getIcon(desc) {
    var desc = desc.toLowerCase();
    console.log(desc);
    switch (desc) {
      case "drizzle":
         return "fa fa-tint fa-5x";
        break;
      case "clouds":
         return "fa fa-cloud fa-5x";
        break;
      case "rain":
        return "fa fa-tint fa-5x";
        break;
      case "snow":
         return "fa fa-snowflake-o fa-5x";
        break;
      case "clear":
        return "fa fa-sun-o fa-5x";
        break;
      case "thunderstom":
        return "fa fa-bolt fa-5x";
        break;
        case "mist":
        return "fa fa-tint fa-5x";
        break;
      default:
       return "";
    }
  }

  function addIcon(desc) {
    $("div." + desc).removeClass("hide");
  }
});