'use strict';

angular.module('meteoApp')

.controller('MainCtrl', function($scope, $rootScope, DailyForecast) {
  $rootScope.jourLoading = 1;
  $scope.dailyForecast = DailyForecast.query({}, function() {
    $rootScope.jourLoading = 0;
  }, function(error) {
    $scope.errorMsg = error;
    $rootScope.jourLoading = 0;
  });
})

.controller('DetailsCtrl', function($scope, $rootScope, Forecast) {
  $rootScope.heureLoading = 1;
  $scope.forecast = Forecast.query({}, function() {
    $rootScope.heureLoading = 0;
  }, function(error) {
    $scope.errorMsg = error;
    $rootScope.heureLoading = 0;
  });
})

.controller('MenuCtrl', function($scope) {
  $scope.$on('$routeChangeSuccess', function (ev, current) {
    var currentCtrl = current.$$route.controller;
    if (currentCtrl === 'MainCtrl') {
      $scope.activeTab = 'jour';
    } else if (currentCtrl === 'DetailsCtrl') {
      $scope.activeTab = 'heure';
    }
  });
});