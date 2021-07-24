"use strict";

const InterestsModel = require("../models/interests");

const getInterests = async (req, res) => {
    try {
        // get all interests in database
        let interests = await InterestsModel.find({}).exec();

        // return gotten movies
        return res.status(200).json(interests);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    getInterests,
};