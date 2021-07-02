"use strict";

const mongoose = require('mongoose');


// Define the organization schema
const OrganizationSchema  = new mongoose.Schema({
    company_name: {
        type: String,
        unique: true,
        required: true,
    },
    account_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    domains: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Domain',
        }
    ],
    address: {
        street: String,
        housing_number: Number,
        city: String,
        zip: Number,
    }
});

OrganizationSchema.set('versionKey', false);


// Export the Movie model
module.exports = mongoose.model('Organization', OrganizationSchema);