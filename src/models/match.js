"use strict";

const mongoose = require('mongoose');


// Define the movie schema
const MatchSchema  = new mongoose.Schema({
    usera: String,
    userb: String,
    timestamp: Number,
    duration: Number
});

MatchSchema.set('versionKey', false);
MatchSchema.set('timestamps', true);


// Export the Movie model
module.exports = mongoose.model('Match', MatchSchema);
