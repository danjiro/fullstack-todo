// app/routes.js

	// require Todo model from app/models/todo.js
	var Todo = require('./models/todo.js');

	// export routes to app
	module.exports = function(router) {

		// middleware used for all requests
		// --------------------------------
		router.use(function(req, res, next) {
			// console.log('Going through router...next!');
			next();
		});

		// test api route to make sure we get a connection [ access: GET @ /api ]
		// --------------------------------------------------------------------
		router.get('/', function(req, res) {
			res.json({ message: 'Connected to the API!'});
		});

		// for routes that end in /todo
		// ----------------------------
		router.route('/todos')

			// get all todos [ access: GET @ /api/todos ]
			.get(function(req, res) {

				Todo.find(function(err, todos) {
					if (err) { res.send(err); }

					// return all todos in json
					res.json(todos);
				});

			})

			// create a new todo [ access: POST @ /api/todos ]
			.post(function(req, res) {

				// create a todo, info comes from ajax request from Angular
				Todo.create({
					text: req.body.text,
					done: false
				}, function(err, todos) {
					if (err) { res.send(err); }

					// get and return all todos after creation of new one
					Todo.find(function(err, todos) {
						if (err) { res.send(err); }
						res.json(todos);
					});
				});

			});

		// for routes that end in /todo/:todo_id
		// -------------------------------------
		router.route('/todos/:todo_id')

			// get todo details [ access: GET @ /api/todos/todo_id ]
			.get(function(req, res) {
				Todo.findById( req.params.todo_id, function(err, todo) {
					if (err) { res.send(err); }
					res.json(todo);
				});
			})

			// delete a todo [ access: DELETE @ /api/todos/todo_id ]
			.delete(function(req, res) {

				// delete a todo
				Todo.remove({
					_id: req.params.todo_id
				}, function(err, todo) {
					if (err) { res.send(err); }

					// get and return all todos after deletion of one
					Todo.find(function(err, todos) {
						if (err) { res.send(err); }
						res.json(todos);
					});
				});

			})

			// update a todo [ access: PUT @ /api/todos/todo_id ]
			.put(function(req, res) {

				// update a todo
				Todo.findByIdAndUpdate(req.params.todo_id, 
					req.body,
					function(err, todo) {
						if (err) { res.send(err); }; 
						res.json(todo);
				});

			});

	};