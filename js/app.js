(function () {
    'use strict';
	angular
		.module('marvelApp', [
			'ngRoute',
            'controllers',
            'services',
			'components'
		])
		.config(function ($routeProvider) {
  			$routeProvider
				.when('/', {
					templateUrl: 'views/finder.html',
					controller: 'HeroesController'
				})
				.when('/hero/:id', {
					templateUrl: 'views/characterInfo.html',
					controller: 'HeroInfoController'
				})
				.otherwise({
					redirectTo: '/'
				});
		})
		.run(initializeApp);

	function initializeApp ($rootScope) {
		$rootScope.appTitle = 'Marvel Heroes';

		$rootScope.$on('$viewContentLoaded', function () {
      		$(document).foundation();
    	});
	}
})();