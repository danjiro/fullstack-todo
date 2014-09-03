// app/models/todo.js

	// require mongoose because creating mongoose model
	var mongoose = require('mongoose');

	var todoSchema = mongoose.Schema({
		text: String,
		done: Boolean,
		submitted: { type: Date, default: Date.now }
	});
	module.exports = mongoose.model('Todo', todoSchema);