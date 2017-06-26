'use strict';

const express = require('express');
const app = express();

// middleware
const bodyParser = require('body-parser');
const logger = require('morgan');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));

// init database
const db = require('./config/db');
db.initDb(function(err){
  console.log(err);
})

// view engine setup
const dust = require('express-dustjs');
app.engine('dust', dust.engine());
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//static files serving
app.use(express.static(__dirname + '/public'));

//favicon
const favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/images/favicon.ico'));

//routes
const index = require('./routes/index');
app.use('/', index);

// server
app.listen(db.port, function(){
  console.log('Backend server listening on: ', db.port);
})

