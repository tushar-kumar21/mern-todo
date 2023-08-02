// const mongoose = require('mongoose');

// const todoItems = new mongoose.Schema({
//     item:{
//         type:String,
//         required:true
//     }

// })

// module.exports = mongoose.model('todo',todoItems);

const mongoose = require('mongoose');

const todoItems = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String, // Add the description field as a string
    required: true // Modify this based on your requirements
  },
  category: {
    type: String, // Add the category field as a string
    required: true // Modify this based on your requirements
  },
  dueDate: {
    type: String, // Add the dueDate field as a string
    required: true // Modify this based on your requirements
  },
  status: {
    type:String,
    required:true,
  }
});

module.exports = mongoose.model('todo', todoItems);
