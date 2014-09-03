// js/servers/todos.js

angular.module('todoService', [])

	.factory('Todos', function($http) {
		return {
			get: function() {
				return $http.get('/api/todos');
			},
			create: function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete: function(id) {
				return $http.delete('/api/todos/' + id);
			},
			getDetails: function(id) {
				return $http.get('/api/todos/' + id);
			},
			update: function(id, todoStatus) {
				return $http.put('/api/todos/' + id, todoStatus);
			}
		}
	});