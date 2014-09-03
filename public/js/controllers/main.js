angular.module('todoController', [])

	.controller('MainCtrl', ['$scope', '$http', 'Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		// set default order to show newest todos first
		$scope.reverse = true;

		// GET====================================
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
			});

		// CREATE=================================
		$scope.createTodo = function() {
			if (!$.isEmptyObject($scope.formData)) {
				Todos.create($scope.formData).success(function(data) {
					$scope.formData = {};
					$scope.todos = data;
				});
			}
		};

		// DELETE=================================
		$scope.deleteTodo = function(id) {
			Todos.delete(id).success(function(data) {
				$scope.todos = data;
			});
		};

		// UPDATE=================================
		$scope.updateTodo = function(id, fields, item) {
			Todos.update(id, fields).success(function(data) {
				// pass whole todo object through and use indexOf(item) because 
				// angular's orderby filter points $index to the ordered list
				$scope.todos[$scope.todos.indexOf(item)] = data;
			});
		};		

	}])

	.controller('TodoDetailsCtrl', ['$scope', '$http', 'Todos', '$routeParams', '$location', function($scope, $http, Todos, $routeParams, $location) {
		Todos.getDetails($routeParams.todo_id).success(function(data) {
			$scope.todoDetails = data;
			// save copy of original text in case user cancels updating
			$scope.originalText = $scope.todoDetails.text;
		});

		// DELETE FROM TODO DETAILS PAGE==========
		$scope.deleteTodo = function() {
			Todos.delete($routeParams.todo_id).success(function(data) {
				$location.path('/');
			});
		};

		// UPDATE TODO ===========================
		$scope.updateTodo = function(fields) {
			Todos.update($routeParams.todo_id, fields).success(function(data) {
				$scope.todoDetails = data;
				$scope.originalText = $scope.todoDetails.text;
			});
		};

	}]);