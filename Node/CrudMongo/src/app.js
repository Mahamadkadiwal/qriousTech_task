const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.route')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); 

app.use('/api/users', userRoutes);

module.exports = app;