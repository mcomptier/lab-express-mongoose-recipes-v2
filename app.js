const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', async (req, res) => {
    Recipe.create({
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image: req.body.image,
      duration: req.body.duration, // Fix here
      creator: req.body.creator
    })
    .then((newRecipe) => {
      res.status(201).json(newRecipe);
    })
    .catch((error) => {
      console.log(error);
      if (error.code === 11000) {
        res.status(400).json({ error, message: 'Duplicate somewhere' });
      } else {
        res.status(500).json({ error, message: 'Something happened maybe on the server' });
      }
    });
  });
  
   


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (request,response) => {

    Recipe.find()
    .then((allRecipes) => {
        response.status(200).json(allRecipes);
    })
    .catch((error) => {
        this.response.status(500).json({ message : "Error getting all Recipe"})
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (request,response) => {

    Recipe.findById(req.params.id)
    .then((recipe) => {
        response.status(200).json(recipe);
    })
    .catch((error) => {
        this.response.status(500).json({ message : "Error getting one recipe"})
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (request,response) => {

    Recipe.findByIdAndUpdate(req.params.id, req.body, { new : true})
    .then((updatedRecipe) => {
        response.status(200).json(updatedRecipe);
    })
    .catch((error) => {
        this.response.status(500).json({ message : "Error updating one recipe"})
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.put('/recipes/:id', (request,response) => {

    Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
        response.status(204).send;
    })
    .catch((error) => {
        this.response.status(500).json({ message : "Error deleting one recipe"})
    });
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
