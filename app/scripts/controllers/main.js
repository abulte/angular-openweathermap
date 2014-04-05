'use strict';

var showNotifCallback = function(temp, NotifObj) {
  new NotifObj('Il va geler !', {'body': 'Il est prévu ' + temp + '° cette nuit.'});
  // n.onclick = function () {
  //   this.close();
  // };
};

angular.module('meteoApp')

.controller('MainCtrl', function($scope, $rootScope, DailyForecast, $window) {
  $rootScope.jourLoading = 1;

  // get data
  var doLoadData = function(town) {
    var params = {};
    if (typeof town !== 'undefined') {
      params = {q: town};
    }
    return DailyForecast.query(params, function(data) {
      // freezing alert - put that elsewhere
      var tempNight = data[0].temp.night;
      if (parseFloat(tempNight) < 5) {
        if ('Notification' in $window) {
          var perm = $window.Notification.permission;
          if (perm === 'default') {
            $window.Notification.requestPermission(function(perm) {
              if(perm === 'granted') {
                showNotifCallback(tempNight, $window.Notification);
              }
            });
          } else if (perm === 'granted') {
            showNotifCallback(tempNight, $window.Notification);
          }
        } else {
          console.log('No notification API support.');
        }
      }
      // loading = 0
      $rootScope.jourLoading = 0;
    }, function(error) {
      $scope.errorMsg = error;
      $rootScope.jourLoading = 0;
    });
  };
  $scope.dailyForecast = doLoadData();

  $rootScope.$on('doSearch', function(event, town) {
    $rootScope.jourLoading = 1;
    $scope.dailyForecast = doLoadData(town);
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

.controller('MenuCtrl', function($scope, $rootScope) {
  $scope.$on('$routeChangeSuccess', function (ev, current) {
    var currentCtrl = current.$$route.controller;
    if (currentCtrl === 'MainCtrl') {
      $scope.activeTab = 'jour';
    } else if (currentCtrl === 'DetailsCtrl') {
      $scope.activeTab = 'heure';
    }
  });

  $scope.doSearch = function() {
    if (typeof $scope.town !== 'undefined') {
      $rootScope.$emit('doSearch', $scope.town);
    }
  };
});