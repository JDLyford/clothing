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
  app.get("/api/top/", function(req, res) {
    db.Top.findAll({})
      .then(function(dbClothing) {
        res.json(dbClothing);
      });
  });

  app.get("/api/bottom/", function (req, res) {
    db.Bottom.findAll({})
      .then(function (dbClothing) {
        res.json(dbClothing);
      });
  });

  // Get route for returning posts of a specific category
  app.get("/api/top/category/:category", function(req, res) {
    db.Top.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbClothing) {
        res.json(dbClothing);
      });
  });

  app.get("/api/bottom/category/:category", function (req, res) {
    db.Bottom.findAll({
        where: {
          category: req.params.category
        }
      })
      .then(function (dbClothing) {
        res.json(dbClothing);
      });
  });

  //Get route for a single link
  app.get("/api/top/link/:link", function (req, res) {
    db.Top.findAll({
        where: {
          link: req.params.link
        }
      })
      .then(function (dbClothing) {
        res.json(dbClothing);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/top/:id", function(req, res) {
    db.Top.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbClothing) {
        res.json(dbClothing);
      });
  });

  app.get("/api/bottom/:id", function (req, res) {
    db.Bottom.findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function (dbClothing) {
        res.json(dbClothing);
      });
  });

  // POST route for saving a new part
  // Need to add different route for top/bottom based on selection
  app.post("/api/top", function(req, res) {
    console.log(req.body);
    db.Top.create({
      category: req.body.category,
      link: req.body.link,
      link2: req.body.link2,
      color: req.body.color
    })
      .then(function(dbClothing) {
        res.json(dbClothing);
      });
  });

  app.post("/api/bottom", function (req, res) {
    console.log(req.body);
    db.Bottom.create({
        category: req.body.category,
        link: req.body.link,
        color: req.body.color
      })
      .then(function (dbClothing) {
        res.json(dbClothing);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/top/:id", function(req, res) {
    db.Top.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbClothing) {
        res.json(dbClothing);
      });
  });

  app.delete("/api/bottom/:id", function (req, res) {
    db.Bottom.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function (dbClothing) {
        res.json(dbClothing);
      });
  });

  // PUT route for updating posts
  app.put("/api/top", function (req, res) {
    db.Top.update(req.body, {
        where: {
          id: req.body.title
        }
      })
      .then(function (dbClothing) {
        res.json(dbClothing);
      });
  });

  app.put("/api/bottom", function (req, res) {
    db.Bottom.update(req.body, {
        where: {
          id: req.body.title
        }
      })
      .then(function (dbClothing) {
        res.json(dbClothing);
      });
  });
};
