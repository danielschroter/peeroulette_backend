"use strict";

const ice_questionsModel = require("../models/ice_questions");

const getIceQuestions = async (req, res) => {
    try {
        // get all interests in database
        let questions = await ice_questionsModel.find({}).exec();

        // return gotten movies
        return res.status(200).json(questions);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    getIceQuestions,
};