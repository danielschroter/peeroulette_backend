"use strict";

const MatchModel = require('../models/match');


const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    try {
        let match = await MatchModel.create(req.body);

        return res.status(201).json(match)
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const read = async (req, res) => {
    try {
        let match = await MatchModel.findById(req.params.id).exec();

        if (!match) return res.status(404).json({
            error: 'Not Found',
            message: `Match not found`
        });

        return res.status(200).json(match)
    } catch(err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
};

const update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    try {
        let match = await MatchModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec();

        return res.status(200).json(match);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const remove = async (req, res) => {
    try {
        await MatchModel.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({message: `Match with id${req.params.id} was deleted`});
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const list  = async (req, res) => {
    try {
        let matches = await MatchModel.find({}).exec();

        return res.status(200).json(matches);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const getLastMatches  = async (req, res) => {
    try {
        let matches = await MatchModel.find({
            "$or": [{
                "usera": req.params.userId
            }, {
                "userb": req.params.userId
            }]
        }).exec();

        return res.status(200).json(matches);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const getCurrentMatch  = async (req, res) => {
    try {
        let matches = await MatchModel.findOne({
            "$or": [{
                "usera": req.params.userId
            }]
        }).sort({createdAt:-1}).exec();

        return res.status(200).json(matches);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};


module.exports = {
    create,
    read,
    update,
    remove,
    list,
    getLastMatches,
    getCurrentMatch,
};