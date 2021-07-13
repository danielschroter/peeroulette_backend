"use strict";

const UserModel = require("../models/user");

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
        let user = await UserModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        // return updated movie
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const read = async (req, res) => {
    try {
        // get movie with id from database
        let user = await UserModel.findById(req.params.id).exec();

        // if no movie with id is found, return 404
        if (!user)
            return res.status(404).json({
                error: "Not Found",
                message: `User not found`,
            });

        // return gotten movie
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const remove = async (req, res) => {
    try {
        await UserModel.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({message: `organization with id${req.params.id} was deleted`});
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const getEmployeeFilter = async (req,res) => {
    try {
        console.log("Getting here");
        console.log("this is the req.body " + req.body.id);
        let retUser = await UserModel.findById(req.body.id).exec();
        console.log(retUser.employeeFilter);
        return res.status(200).json(retUser.employeeFilter);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
}

const list  = async (req, res) => {
    try {
        let users = await UserModel.find({}).exec();

        return res.status(200).json(users);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


module.exports = {
    read,
    update,
    getEmployeeFilter,
    remove,
    list
};