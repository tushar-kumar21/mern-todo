const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}));

const todoItemRoutes = require('./routes/index');

mongoose.connect(process.env.DB_URI)
.then(()=> console.log("connected"))
.catch(err=>console.log(err))

app.use('/', todoItemRoutes)

app.listen(8000, ()=> console.log("Server Connected"));