"use strict";

const DomainModel = require("../models/domain");
const OrganizationModel = require("../models/organization");
const emailTemplate_Org_Verification = require("../helper/emailTemplate_Org_Verification");
const sendEmail = require("../helper/sendEmail");


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
        // get all all users from database
        let domains = await DomainModel.find({}).exec();

        // get only domains of current user
        let i = 0;
        let userDomains = [];
        for (i; i < domains.length; i++) {
            if(domains[i].verified_by.equals(req.body.user_id)) {
                userDomains.push(domains[i]);
            }
        }

        // return gotten domains of user
        return res.status(200).json(userDomains);
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
        let fullDomainName = req.body.domain.name;
        let domainNameTail = fullDomainName.split('@')[1];
        req.body.domain.name = domainNameTail;

        let domain = await DomainModel.create(req.body.domain)

        let org = await OrganizationModel.findById(domain.organization);

        try {
            sendEmail(fullDomainName, emailTemplate_Org_Verification.confirm(domain._id, domainNameTail));
        } catch (err) {
            console.log(err);
        }

        // update domains of organization with new domain
        let domains = org.domains;
        domains.push(domain._id);

        await OrganizationModel.findOneAndUpdate(
            { _id: domain.organization },
            { domains: domains },
            { new: true },
        );

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
        let domain = await DomainModel.findByIdAndRemove(req.params.id).exec();
        let org = await OrganizationModel.findById(domain.organization);

        // remove  domain and then update domains in organisation
        let oldOrgDomains = org.domains;
        oldOrgDomains.splice(domain._id,1)

        await OrganizationModel.findByIdAndUpdate(
            { _id: domain.organization },
            { domains: oldOrgDomains },
            { new: true },
        );

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