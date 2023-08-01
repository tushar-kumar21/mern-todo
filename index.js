const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

const itemRoute = require("./routes.todoItems");

console.log(PORT)
const todoItemRoutes = require('./routes/index');

mongoose.connect(process.env.DB_URI)
.then(()=> console.log("connected"))
.catch(err=>console.log(err))

app.use('/',todoItemRoutes)

app.listen(8000, ()=> console.log("Server Connected"));