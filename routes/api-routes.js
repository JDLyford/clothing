// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/clothing/", function(req, res) {
    db.Clothing.findAll({})
      .then(function(dbClothing) {
        res.json(dbClothing);
      });
  });

  // Get route for returning posts of a specific category
  app.get("/api/clothing/category/:category", function(req, res) {
    db.Clothing.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbClothing) {
        res.json(dbClothing);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/clothing/:id", function(req, res) {
    db.Clothing.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbClothing) {
        res.json(dbClothing);
      });
  });

  // POST route for saving a new post
  app.post("/api/clothing", function(req, res) {
    console.log(req.body);
    db.Clothing.create({
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
      color: req.body.color
    })
      .then(function(dbClothing) {
        res.json(dbClothing);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/clothing/:id", function(req, res) {
    db.Clothing.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbClothing) {
        res.json(dbClothing);
      });
  });

  // PUT route for updating posts
  app.put("/api/clothing", function (req, res) {
    db.Clothing.update(req.body, {
        where: {
          id: req.body.title
        }
      })
      .then(function (dbClothing) {
        res.json(dbClothing);
      });
  });
};
