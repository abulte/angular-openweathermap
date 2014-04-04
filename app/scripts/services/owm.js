'use strict';

var endpoint = 'http://api.openweathermap.org/data/2.5/forecast';

// http://api.openweathermap.org/data/2.5/forecast/daily?q=Poissy,fr&mode=json&units=metric&cnt=14
// http://api.openweathermap.org/data/2.5/forecast?q=Poissy,fr&mode=json&units=metric

var doTransformResponse = function(data) {
  var list = JSON.parse(data).list;
  // converting to JS timestamp
  angular.forEach(list, function(fc){
    fc.dt = parseInt(fc.dt, 10) * 1000;
  });
  return list;
};

angular.module('owmServices', [])

  .factory('DailyForecast', function ($resource) {
    return $resource(endpoint + '/daily', {
      mode: 'json',
      units: 'metric',
      q: 'Poissy',
      cnt: '14',
    }, {
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: function(data){
          return doTransformResponse(data);
        },
        cache: false
      },
    });
  })

  .factory('Forecast', function ($resource) {
    return $resource(endpoint, {
      mode: 'json',
      units: 'metric',
      q: 'Poissy',
    }, {
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: function(data){
          return doTransformResponse(data);
        },
        cache: false
      },
    });
  });
