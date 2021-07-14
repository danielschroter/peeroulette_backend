"use strict";

const mongoose = require('mongoose');


// Define the movie schema
const AppointmentSchema  = new mongoose.Schema({
    title: String,
    startDate: String,
    endDate: String,
    description: String,
    link: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
    interests: [{
        type: String,
    }],
    // interests: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Interest',
    //     }
    // ],
});

AppointmentSchema.set('versionKey', false);
AppointmentSchema.set('timestamps', true);


// Export the Movie model
module.exports = mongoose.model('Appointment', AppointmentSchema);