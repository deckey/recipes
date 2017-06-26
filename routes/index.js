const express = require('express');
const db = require('../config/db');
const app = express();

//index route
app.get('/', function (req, res, next) {
  db.getRecipes(data => {
    return res.render('index', {
      recipes: data.rows
    });
  });
})

app.post('/add', (req, res) => {
  db.addRecipe(req.body, (recipe) => {
    res.redirect('/');
  })
})

app.post('/edit', (req, res) =>{
  db.updateRecipeById(req.body, recipe =>{
    res.redirect('/');
  })
})

app.delete('/delete/:id', (req, res) => {
  db.deleteRecipe(req.params.id, (recipe) => {
    res.sendStatus(200);
  })
})

module.exports = app;