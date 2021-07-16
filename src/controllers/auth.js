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

    // check if the password is valid
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) return res.status(401).send({ token: null });

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
      error: "User Not Found",
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
      console.log(err);
    }

    if (req.body.compname != "") {
        const org = {
            company_name: req.body.compname,
            account_owner: retUser._id,
        };

        let retOrg = await OrganizationModel.create(org);

        const domains = req.body.domains.toString().replace(" ", "").split(',');
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
      let organization = {};

      // first create organisation with empty domains here
      if (req.body.compname != "") {
        const org = {
            domains: [],
            company_name: req.body.compname,
            account_owner: retUser._id,
      };

            // Check if one of the domains already exists, then continue with process
          let i = 0;
          for (i; i < req.body.domainNames.length; i++) {
              let domainNameTail = req.body.domainNames[i].toString().replace(" ", "").split('@')[1];
              // if domain already exists throw error
              try {
                  let dom = await DomainModel.findOne({
                      name: domainNameTail,
                  }).exec();

                  if (dom) {
                      return res.status(400).json({
                          error: "Domain already exists",
                      });
                  }
              } catch (err) {
                  return res.status(500).json({
                      error: "Internal Server error 2",
                      message: err.message,
                  });
              }
          }

          // create all domains
          let retOrg = await OrganizationModel.create(org);


          i = 0;
          for (i; i < req.body.domainNames.length; i++) {
              let fullDomainName = req.body.domainNames[i];
              let domainNameTail = req.body.domainNames[i].toString().replace(" ", "").split('@')[1];
              let newDomain = Object();
              console.warn("debug")
              console.warn(domainNameTail)
              newDomain.name = domainNameTail;
              newDomain.confirmed = false;
              newDomain.verified_by = retUser._id;
              newDomain.organization = retOrg._id;
              let createdDomain = await DomainModel.create(newDomain);
              try {
                  sendEmail(fullDomainName, emailTemplate_Org_Verification.confirm(createdDomain._id, domainNameTail));
              } catch (err) {
                  console.log(err);
              }
          }
          // update organisation with user id and organisation id
          await UserModel.findOneAndUpdate(
        { _id: retUser._id },
        { account_owner_of_organization: retOrg._id },
        { new: true }
          );

          // get all domainIds of current user
          let allDomains = await DomainModel.find({}).exec();
          let domainIds = [];
          let j = 0;
          for (j; j < allDomains.length; j++) {
              if(allDomains[j].verified_by.equals(retUser._id)) {
                  domainIds.push(allDomains[j]._id)
              }
          }

          // update organisation with new domainIds
          await OrganizationModel.findOneAndUpdate(
              { _id: retOrg._id },
              { domains: domainIds },
          );
          organization = retOrg;
      }
    return res.status(200).json({organization: organization});
  } catch (err) {
    if (err.code == 11000) {
        console.warn("11100 error")
      return res.status(400).json({
        error: "Organization already exists",
        message: err.message,
      });
    } else {
        console.warn("500 error")
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
