"use strict";

const mongoose = require('mongoose');


// Define the movie schema
const InterestsSchema  = new mongoose.Schema({
    facebookInterests: [{
        type: String,
        required: true,
    }],
});

InterestsSchema.set('versionKey', false);
InterestsSchema.set('timestamps', true);

// Export the Movie model
InterestsSchema.set("versionKey", false);

// Export the Movie model
module.exports = mongoose.model("Interests", InterestsSchema);