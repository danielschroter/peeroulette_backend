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

const getUserDomains = async (req, res) => {

    try {
        // get all interests in database
        let domains = await DomainModel.find({}).exec();
        console.warn("USER ID")
        console.warn(req.body.user_id)
        {/*
        let i = 0;
        let userDomains = [];
        console.warn("USER ID")
        console.warn(req.body.user_id)
        for (i; i < domains.length; i++) {
            if(domains[i].verified_by === req.body.user_id) {
                userDomains.push(domains[i]);
            }
        }
        */}


        // return gotten movies
        return res.status(200).json(domains);
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

const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    // handle the request
    try {
        let domain = await DomainModel.create(req.body.domain)
        console.warn("domain create is called")
        // return new domain
        res.status(200).json(domain);
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                error: "Domain exists",
                message: err.message,
            });
        } else {
            return res.status(500).json({
                error: "Internal server error",
                message: err.message,
            });
        }
    }
};

const remove = async (req, res) => {
    try {
        await DomainModel.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({message: `domain with id${req.params.id} was deleted`});
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

module.exports = {
    getUserDomains,
    create,
    list,
    read,
    remove,
};