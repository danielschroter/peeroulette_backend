"use strict";

const AppointmentModel = require("../models/appointment");

const getAppointments = async (req, res) => {
    try {
        // get all appointments from database

        console.log("Getting here");
        let appointments = await AppointmentModel.find({}).exec();

        console.log("appointments " + appointments);
        // return appointments
        return res.status(200).json(appointments);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const update = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    }

    // handle the request
    try {
        // find and update movie with id
        console.log("id " + req.params.id);
        console.log("body " + req.body);
        let appointment = await AppointmentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        // return updated movie
        return res.status(200).json(appointment);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const create = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });

    // handle the request
    try {
        console.log("req.body:  " + req.body);
        // create appointment in database
        let appointment = await AppointmentModel.create(req.body);

        // return created movie
        return res.status(201).json([appointment]);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const remove = async (req, res) => {
    try {
        // find and remove movie
        await AppointmentModel.findByIdAndRemove(req.params.id).exec();

        // return message that movie was deleted
        return res
            .status(200)
            .json({ message: `Movie with id${req.params.id} was deleted` });
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
    update,
    create,
    remove
};