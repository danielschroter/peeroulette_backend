"use strict";

const InterestsModel = require("../models/interests");

const list  = async (req, res) => {
    try {
        let interests = await InterestsModel.find({}).exec();

        return res.status(200).json(interests);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


module.exports = {
    list
};