"use strict";

const AppointmentModel = require("../models/appointment");

const getAppointments = async (req, res) => {
    try {
        // get all interests in database
        let appointments = await AppointmentModel.find({}).exec();

        console.log("appointments " + appointments);
        // return gotten movies
        return res.status(200).json(appointments);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    getAppointments,
};