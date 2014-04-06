'use strict';

angular
  .module('meteoApp', [
    // 'ngCookies',
    'ngResource',
    // 'ngSanitize',
    'ngRoute',
    'owmServices',
    'ngLadda'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/details', {
        templateUrl: 'views/details.html',
        controller: 'DetailsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($cacheFactory){
    // create our own little cache
    $cacheFactory('meteoCache');
    // cant use because incompatible with CORS...
    // $http.defaults.headers.common['x-api-key'] = '9a01d8b49d3a28557fa0dec0cb61e0ad';
  });
