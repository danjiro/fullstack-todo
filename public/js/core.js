// js/core.js

angular.module('todoApp', ['ngRoute', 'todoController', 'todoService'])

	.config(['$routeProvider', '$locationProvider', 
		function($routeProvider, $locationProvider) {
			$routeProvider
				.when('/', {
					templateUrl: '/partials/main.html',
					controller: 'MainCtrl',
					controllerAs: 'main'
				})
				.when('/todo/:todo_id', {
					templateUrl: '/partials/todoDetails.html',
					controller: 'TodoDetailsCtrl'
				});
				// .otherwise({
				// 	redirectTo: '/'
				// });

			$locationProvider.html5Mode(true);
	}]);