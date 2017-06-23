'use strict'

const pg = require('pg');
const config = require('dotenv').config().parsed;

// db connect string
const db = `postgres://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}/recipes`;
const client = new pg.Client(db);

module.exports.initDb = function (next) {
  client.connect(err => {
    if (err) next(`Error connecting to database. ${err}`);
    client.query(
      `CREATE TABLE IF NOT EXISTS recipes (
      id int NOT NULL,
      name character(255),
      ingredients text,
      description text,
      CONSTRAINT recipe_pk PRIMARY KEY (ID));`
      , (err, result) => {
        if (err) next(`Cannot execute query. ${err}`);
        next(`Connected to database `);
      })
  })
}

module.exports.client = client;
