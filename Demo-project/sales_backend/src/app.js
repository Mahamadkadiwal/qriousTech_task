
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser')

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/user', userRoutes);

// shown of error
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal Server Error"
  });
});

module.exports = app;