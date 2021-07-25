"use strict";

const AppointmentModel = require("../models/appointment");
const UserModel = require("../models/user");

const getAppointments = async (req, res) => {
    try {
        // get all appointments from database



        var mapping = {};
        var appointments = await AppointmentModel.find({}).exec();
        for (var i in appointments){
            // console.log("app vor Änderung " + appointments[i]);
            try{
                const userid = appointments[i].user;
                // console.log("Das ist user type "+ typeof(appointments[i].user) + " user: " + appointments[i].user);
                let user = await UserModel.findById(userid);
                // console.log("username " +user.username);
                // appointments[i] = { ...appointments[i], user: user.username };
                mapping[userid] = user.username;
                // console.log("App nach Änderung " + appointments[i]);
            }catch (e) {
                // console.log("app: " + appointments[i].title + " hat keinen User eingetragen");
            }
        }
        // console.log(mapping);
        return res.status(200).json({appointments: appointments, mapping:mapping});
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};


const getRecommendations = async (req, res) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    }

    try {
        // get all appointments from database
        var interests = [];
        if(req.body.id != "") {
            let user = await UserModel.findById(req.body.id).exec();
            if (!user){
                return res.status(404).json({
                    error: "Not Found",
                    message: `User not found`,
                });
            }
            interests = user.interests;
        }

        if(req.body.searchInterests.length != 0){
            interests = req.body.searchInterests;
        }





        let appointments = await AppointmentModel.aggregate([
            {
                $set: {
                    matchedCount: {
                        $size: {
                            $setIntersection: ["$interests", interests]
                        }
                    }
                }
            },
            {
                $sort: {
                    matchedCount: -1
                }
            }
        ]).limit(3).exec();




        console.log("Getting here");
        var mapping = {};
        console.log("Das sind appointments[0] " + appointments[0] + " type " + typeof(appointments));
        for (var i in appointments){
            try{
                const userid = appointments[i].user;
                let user = await UserModel.findById(userid);
                mapping[userid] = user.username;
            }catch (e) {
            }
        }

        appointments.map(elem => console.log("elems of array: " + elem.interests ));

        if (appointments.length == 0){
            return res.status(404).json({
                error: "None Available",
                message: `No Appointments found`,
            });
        }else{
            return res.status(200).json({appointments: appointments, mapping: mapping});
        }
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


const getAppointment = async (req, res) => {
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
        console.log("id " + req.body.id);
        let appointment = await AppointmentModel.findById(req.body.id).exec();
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
    getRecommendations,
    getAppointments,
    getAppointment,
    update,
    create,
    remove
};