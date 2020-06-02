require('dotenv').config('../');

const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use(require('./routes'));

//static content
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('App is running on port 3000'));
