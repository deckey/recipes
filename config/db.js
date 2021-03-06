'use strict'

const pg = require('pg');
const config = require('dotenv').config().parsed;

// db connect string
const db = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: 5432,
  max: 5,
  idleTimeoutMillis: 30000
};

const client = new pg.Pool(db);

module.exports.initDb = function (next) {
  client.connect(err => {
    if (err) next(`Error connecting to database. ${err}`);
    client.query(
      `CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL NOT NULL,
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

module.exports.getRecipes = function (done) {
  client.query(
    `SELECT * FROM recipes ORDER BY id ASC`,
    (err, rows) => {
      if (err) throw Error(`Cannot execute query. ${err}`);
      done(rows);
    })
}

module.exports.updateRecipeById = function (recipe, done) {
  client.query(
    'UPDATE recipes SET name=$2, ingredients=$3, description=$4 WHERE id=$1',
    [recipe.id, recipe.name, recipe.ingredients, recipe.description],
    (err, recipe) => {
      if (err) throw Error(`Cannot update recipe! ${err}`);
      done(recipe);
    })
}

module.exports.addRecipe = function (recipe, done) {
  client.query(
    'INSERT INTO recipes(name, ingredients, description) VALUES ($1, $2, $3);',
    [recipe.name, recipe.ingredients, recipe.description],
    (err, recipe) => {
      if (err) throw Error(`Cannot add recipe! ${err}`);
      done(recipe);
    })
}

module.exports.deleteRecipe = function (id, done) {
  client.query(
    'DELETE FROM recipes WHERE id = $1;',
    [id],
    (err, recipe) => {
      if (err) throw Error(`Cannot remove recipe! ${err}`);
      done(recipe);
    })
}

module.exports.client = client;
module.exports.port = process.env.PORT || 3000;
