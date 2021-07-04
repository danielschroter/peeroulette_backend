"use strict";

const DomainModel = require("../models/domain");

const list = async (req, res) => {
    try {
        // get all interests in database
        let domain = await DomainModel.find({}).exec();

        // return gotten movies
        return res.status(200).json(domain);
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
        // get all interests in database
        let domain = await DomainModel.findById(req.params.id).exec();

        // return gotten movies
        return res.status(200).json(domain);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    list,
    read,
};