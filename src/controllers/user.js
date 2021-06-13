"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config");
const UserModel = require("../models/user");
const OrganizationModel = require("../models/organization")

const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    try {
        let user = await UserModel.create(req.body);

        return res.status(201).json(user)
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

const read = async (req, res) => {
    try {
        let user = await UserModel.findById(req.params.id).exec();

        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: `organization not found`
        });

        return res.status(200).json(user)
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
        let user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).exec();

        return res.status(200).json(user);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
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

const register = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (!Object.prototype.hasOwnProperty.call(req.body, "password"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a password property",
        });

    if (!Object.prototype.hasOwnProperty.call(req.body, "username"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a username property",
        });

    // handle the request
    try {
        // hash the password before storing it in the database
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);

        // create a user object
        const user = {
            username: req.body.username,
            password: hashedPassword,
            role: req.body.isAdmin ? "admin" : "member",
        };

        // create the user in the database
        let retUser = await UserModel.create(user);

        if (req.body.compname != ""){
            const org = {
                company_name: req.body.compname,
                account_owner: retUser._id,
                domains: [req.body.domains],
            };

            let retOrg = await OrganizationModel.create(org);
            UserModel.findOneAndUpdate({_id:retUser._id}, {account_owner_of_organization:retOrg._id}, {new: true})
        }






        // if user is registered without errors
        // create a token
        const token = jwt.sign(
            {
                _id: retUser._id,
                username: retUser.username,
                role: retUser.role,
            },
            config.JwtSecret,
            {
                expiresIn: 86400, // expires in 24 hours
            }
        );

        // return generated token
        res.status(200).json({
            token: token,
        });
    } catch (err) {
        console.log('Getting in here');
        if (err.code == 11000) {
            return res.status(400).json({
                error: "User exists",
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


module.exports = {
    register,
    create,
    read,
    update,
    remove,
    list
};