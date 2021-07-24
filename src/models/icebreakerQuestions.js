"use strict";

const mongoose = require('mongoose');


// Define the movie schema
const IcebreakerQuestions  = new mongoose.Schema({
    icebreakerQuestions: [{
        type: String,
        required: true,
    }],
});

IcebreakerQuestions.set('versionKey', false);
IcebreakerQuestions.set('timestamps', true);

// Export the Movie model
IcebreakerQuestions.set("versionKey", false);

// Export the Movie model
module.exports = mongoose.model("IcebreakerQuestions", IcebreakerQuestions);