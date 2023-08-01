const mongoose = require('mongoose');

const todoItems = new mongoose.Schema({
    item:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('todo',todoItems);