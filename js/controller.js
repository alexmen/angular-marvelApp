(function () {
	'use strict';

	angular
		.module('controllers', [])
        .controller('HeaderController', ['$scope', '$location', function($scope, $location) {
            $scope.isActive = function (viewLocation) {
                return viewLocation === $location.path();
            };
        }])
        .controller('HeroesController', ['$scope', 'marvelApi', function($scope, marvelApi){
            $scope.processForm = {};
            
            $scope.processForm = function(){
                $scope.heroes = [];
            
                marvelApi.getHeroes($scope.formData.name)
                    .then(function(response){
                        if(response){
                            displayHeroes(response);
                        }

                        $scope.searchHeroes = 'success';
                    }, function(response){
                        $scope.errorMsg = response.message;
                        $scope.searchHeroes = 'fail';
                    });
            
                function displayHeroes (response) {
                    $scope.heroes = [];
                    
                    response.result.forEach(function(character){
                        var temp = [];
                        temp.name = character.name,
                        //temp.description = (character.description === '' ? 'No description.' :  character.description);
                        temp.description = (character.description === '' ? 'No description.' : formatString(character.description));
 

                        temp.url = "#!/hero/" + character.id;
                        temp.image = parseImage(character.thumbnail.path, character.thumbnail.extension, sizeImage.landscape_amazing);

                    $scope.heroes.push(temp);
                    });
                }
            };
        }])
        .controller('HeroInfoController', ['$scope', '$location', '$routeParams', 'marvelApi', 
            function($scope, $location, $routeParams, marvelApi){
                var characterId = $routeParams.id;
                $scope.hero = [];

                marvelApi.getHero(characterId)
                    .then(function(response){
                        var character = response.result[0];
                        if(response){
                            $scope.hero.name = character.name;
                            $scope.hero.description = character.description;
                            $scope.hero.image = parseImage(character.thumbnail.path, character.thumbnail.extension, sizeImage.default);
                        }

                        $scope.infoHero = 'success';
                        $scope.tabs="tabComics";
                    }, function(response){
                        displayError(response.message);

                        $scope.errorMsg = response.message;
                        $scope.infoHero = 'fail';
                    });  

                 $scope.showInfo = {};
            
            $scope.showInfo = function(){
                $scope.tabs = "tabInfo";
            };
            $scope.showComics = function(){
                $scope.tabs = "tabComics";
            };  
        }])

        .controller('ComicsController', ['$scope', '$routeParams', 'marvelApi', 
            function($scope, $routeParams, marvelApi){
                var characterId = $routeParams.id;
                $scope.hero = [];

                marvelApi.getComics(characterId)
                    .then(function(response){
                        if(response){
                            displayComics(response);
                        }

                        $scope.comicsHero = 'success';
                    }, function(response){
                        $scope.errorMsg = response.message;
                        $scope.comicsHero = 'fail';
                    });

                function displayComics (response) {
                    $scope.comics = [];
                    
                    response.result.forEach(function(comic){
                        var temp = [];
                        temp.name = comic.title,
                        temp.image = parseImage(comic.thumbnail.path, comic.thumbnail.extension, sizeImage.portrait_small);

                    $scope.comics.push(temp);
                    });
                }
        }]);
        
        

        var sizeImage = {
            small: 0,
            portrait_small: 1,
            xlarge: 2,
            landscape_amazing: 3,
            default: 4
        };

        var parseImage = function (path, extension, size) {
            switch(size){
                case sizeImage.small:
                    return path + '/landscape_small.' + extension;
                case sizeImage.xlarge:
                    return path + '/landscape_xlarge.' + extension;
                case sizeImage.landscape_amazing:
                    return path + '/landscape_amazing.' + extension;
                case sizeImage.portrait_small:
                    return path + '/portrait_small.' + extension;
                default:
                    return path + '.' + extension;
            }
        };

        var formatString = function(stringToFormat){
             if(stringToFormat.length > 50)
                return stringToFormat.substring(0, 47) + "...";
             
             return stringToFormat;
        }
})();