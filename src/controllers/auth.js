"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config");
const UserModel = require("../models/user");
const OrganizationModel = require("../models/organization");
const DomainModel = require("../models/domain");
const sendEmail = require("../helper/sendEmail");
const emailTemplate = require("../helper/emailTemplate");
const emailTemplate_Org_Verification = require("../helper/emailTemplate_Org_Verification");

const login = async (req, res) => {
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
    // get the user form the database
    let user = await UserModel.findOne({
      username: req.body.username,
    }).exec();

    // check if user exists
    if (!user) return res.status(404).json({
      error: "User does not exist.",
    });

    // check if the password is valid
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) return res.status(404).json({
      error: "Passwort incorrect.",
    });

    // check if user confirmed his email to login
    if (!user.confirmed) return res.status(401).send({ token: null });

    // if user is found and password is valid
    // create a token
    const token = jwt.sign(
      { _id: user._id, username: user.username, role: user.role },
      config.JwtSecret,
      {
        expiresIn: 86400, // expires in 24 hours
      }
    );

    return res.status(200).json({
      token: token,
    });
  } catch (err) {
    return res.status(404).json({
      error: "User not found.",
      message: err.message,
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

  if (!Object.prototype.hasOwnProperty.call(req.body, "email"))
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a email property",
    });

  // handle the request
  try {
    // hash the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
  // // Check if username already exists
  // let checkUser = await UserModel.findOne({
  //   username: req.body.username,
  // }).exec();
  // if (checkUser)
  //   return res.status(404).json({
  //     error: "Username already exists.",
  //   });

    // create a user object
    const user = {
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      role: req.body.isAdmin ? "admin" : "member",
    };

    // create the user in the database
    let retUser = await UserModel.create(user);

    // send a confirmation email
    try {
      sendEmail(retUser.email, emailTemplate.confirm(retUser._id));
    } catch (err) {
      return res.status(404).json({
        error: "Sending Email failed.",
        message: err.message,
      });
    }

    if (req.body.compname != "") {
        const org = {
            company_name: req.body.compname,
            account_owner: retUser._id,
        };

        let retOrg = await OrganizationModel.create(org);

        const domains = req.body.domains.replace(" ", "").split(',');
        const retDoms = new Array();

        for (var mail of domains) {
            const d = mail.split('@')[1]
            const dom = {
                name: d,
                confirmed: false,
                verified_by: retUser._id,
                organization: retOrg._id,
            };
            let retDom = await DomainModel.create(dom);
            retDoms.push(retDom._id);

            try {
                sendEmail(mail, emailTemplate_Org_Verification.confirm(retDom._id, d));
            } catch (err) {
                console.log(err);
            }
        }

        await OrganizationModel.findOneAndUpdate(
            { _id: retOrg._id },
            { domains: retDoms },
            { new: true }
        );

        await UserModel.findOneAndUpdate(
        { _id: retUser._id },
        { account_owner_of_organization: retOrg._id },
        { new: true }
        );
    }

    // return new user
    res.status(200).json(retUser);
  } catch (err) {
    console.log("Getting in here");
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

const registerOrganization = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (!Object.prototype.hasOwnProperty.call(req.body, "user_id"))
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body must contain a user property",
    });

  // handle the request
  try {
    // get user from the database

    let id = req.body.user_id;
    let retUser = await UserModel.findById(id);

    if (req.body.compname != "") {
      const org = {
        company_name: req.body.compname,
        account_owner: retUser._id,
        domains: [req.body.domains],
      };

      let retOrg = await OrganizationModel.create(org);
      await UserModel.findOneAndUpdate(
        { _id: retUser._id },
        { account_owner_of_organization: retOrg._id },
        { new: true }
      );
    }

    // return new user
    res.status(200).json(retUser);
  } catch (err) {
    console.log("Getting in here");
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

const confirm = async (req, res) => {
  try {
    const id = req.body.id;
    //console.log("ID: " + id);

    // check if valid ObjectID
    //...

    // get user name from database
    let user = await UserModel.findById(id).exec();

    //if user not found, search for object_id of domain
    if(!user){
        let obj = await DomainModel.findById(id).exec();

        if (!obj)
            return res.status(404).json({
                error: "Not Found",
                message: `Object not found`,
            });
        else if (obj && !obj.confirmed) {
            await DomainModel.findByIdAndUpdate(id, { confirmed: true }).exec();
            return res.status(200).json(obj);
        }

    }else if (user && !user.confirmed) {
        await UserModel.findByIdAndUpdate(id, { confirmed: true }).exec();
        return res.status(200).json(user);
    }


  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const me = async (req, res) => {
  try {
    // get own user name from database
    let user = await UserModel.findById(req.userId).select("username").exec();

    if (!user)
      return res.status(404).json({
        error: "Not Found",
        message: `User not found`,
      });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const logout = (req, res) => {
  res.status(200).send({ token: null });
};

module.exports = {
  login,
  register,
  registerOrganization,
  confirm,
  logout,
  me,
};
