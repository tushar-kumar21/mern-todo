const mongoose = require('mongoose');

const todoItems = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String, 
    required: true 
  },
  category: {
    type: String, 
    required: true 
  },
  dueDate: {
    type: String, 
    required: true 
  },
  status: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  }},{collection: 'user-data'});

const todoItemsModel = mongoose.model('todo', todoItems);
const User = mongoose.model('user', UserSchema);

// module.exports = mongoose.model('todo', todoItems);
module.exports = {todoItemsModel, User}