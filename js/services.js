(function () {
'use strict';

angular.module('services', [])
    .factory('marvelApi', ['$http', '$q', function($http, $q){
        var apiSettings = {
            url: 'http://gateway.marvel.com:80/v1/public',
            key: '7909a2ff13d37c8d61e69dd9088dfabe'
        };

        var doCall = function(url){
            var defer = $q.defer();
            
            $http({
                method: 'get',
                url: url
            }).then(function (response) { 
                if (response.data.data.results.length > 0) {
                    defer.resolve({
                        result: response.data.data.results
                    });
                }
                else {
                    defer.reject({
                    message: 'Unable to find that comics'
                    });
                } 
            }, function errorCallback(response) {
                    defer.reject({
                         message: 'API error'
                     });    
            });

            return defer.promise;
        };

        var getHeroes = function(name){
            var charactersQueryString = '/characters?limit=10' + '&nameStartsWith=' + name;
		    var apiKeyQueryString = '&apikey=' + apiSettings.key;

            return doCall(apiSettings.url + charactersQueryString + apiKeyQueryString);
        };

        var getHero = function(id){
            var charactersQueryString = '/characters/' + id;
            var apiKeyQueryString = '?apikey=' + apiSettings.key;
            
            return doCall(apiSettings.url + charactersQueryString + apiKeyQueryString);
        };
        
        var getComics = function(id){
            var charactersQueryString = '/comics?format=comic&formatType=comic&characters=' + id;
            var apiKeyQueryString = '&limit=5&apikey=' + apiSettings.key;

            return doCall(apiSettings.url + charactersQueryString + apiKeyQueryString);
        };

    return { 
        getHeroes: getHeroes,
        getHero: getHero,
        getComics: getComics 
    };
  }]);    
})();