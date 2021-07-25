"use strict";

const mongoose = require('mongoose');

// Define the movie schema
const Ice_QuestionsSchema  = new mongoose.Schema({
    icebreakerQuestions: [{
        type: String,
        required: true,
    }],
});

Ice_QuestionsSchema.set('versionKey', false);
Ice_QuestionsSchema.set('timestamps', true);

// Export the Movie model
Ice_QuestionsSchema.set("versionKey", false);

// Export the Movie model
module.exports = mongoose.model("Ice_Questions", Ice_QuestionsSchema);