"use strict";

const OrganizationModel = require('../models/organization');


const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    try {
        let organization = await OrganizationModel.create(req.body);

        return res.status(201).json(organization)
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const read = async (req, res) => {
    try {
        let organization = await OrganizationModel.findById(req.params.id).exec();

        if (!organization) return res.status(404).json({
            error: 'Not Found',
            message: `organization not found`
        });

        return res.status(200).json(organization)
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
        let organization = await OrganizationModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec();

        return res.status(200).json(organization);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const remove = async (req, res) => {
    try {
        await OrganizationModel.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({message: `organization with id${req.params.id} was deleted`});
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const list  = async (req, res) => {
    try {
        let organizations = await OrganizationModel.find({}).exec();

        return res.status(200).json(organizations);
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
    list
};