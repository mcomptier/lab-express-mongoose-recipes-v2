// Your code here ...
const { Schema, model, Types } = require('mongoose')

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
      },
      instructions: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
        required: true,
      },
      ingredients: {
        type: [String],
        default: [],
      },
      image: {
        type: String,
        default: 'https://images.media-allrecipes.com/images/75131.jpg',
      },
      duration: {
        type: Number,
        min: 0,
      },
      isArchived: {
        type: Boolean,
        default: false,
      },
      created: {
        type: Date,
        default: Date.now,
      },
    });
    

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
