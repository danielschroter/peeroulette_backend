"use strict";

const mongoose = require('mongoose');


// Define the movie schema
const DomainSchema  = new mongoose.Schema({

    name: String,
    confirmed: Boolean,
    verified_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
});

DomainSchema.set('versionKey', false);
DomainSchema.set('timestamps', true);


// Export the Movie model
module.exports = mongoose.model('Domain', DomainSchema);