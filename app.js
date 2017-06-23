'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/db');

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// init database
db.initDb(function(err){
  console.log(err);
})

// server
app.listen(3000, function(){
  console.log('Backend server listening on: ', '3000');
})

