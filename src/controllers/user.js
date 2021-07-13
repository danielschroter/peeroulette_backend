"use strict";

const UserModel = require("../models/user");

const update = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  }

  // handle the request
  try {
    // find and update movie with id
    let user = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body, {
        new: true,
        runValidators: true,
      }
    ).exec();

    // return updated movie
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const available = async (req, res) => {
  console.log("Ava.: " + req.params.id);
  if(req.params.page){
    var page = parseInt(req.params.page);
  }else{
    var page = 0;
  }
  try {
    // get movie with id from database
    let user = await UserModel.findOne({
      $and: [{
        "online": true
      }, {
        "_id": {
          $ne: req.params.id
        }
      }]
    }).sort({_id:1}).skip(page).limit(1).exec();
    // if no movie with id is found, return 404
    if (!user)
      return res.status(404).json({
        error: "Not Found",
        message: `User not found`,
      });
    // return gotten movie
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const read = async (req, res) => {
  console.log("Read: " + req.params.id);
  try {
    // get movie with id from database
    let user = await UserModel.findById(req.params.id).exec();
    // if no movie with id is found, return 404
    if (!user)
      return res.status(404).json({
        error: "Not Found",
        message: `User not found`,
      });
    // return gotten movie
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

// { "_id": { $ne: objectId } },
// let users = await UserModel.find({ $or: [  { "online": true } ] }).exec();
// var ObjectId = require('mongodb').ObjectId;
// var objectId = new ObjectId(req.params.id); // wrap in ObjectID
// var objectId = mongoose.Types.ObjectId(req.params.id);

const remove = async (req, res) => {
  try {
    await UserModel.findByIdAndRemove(req.params.id).exec();

    return res.status(200).json({
      message: `organization with id${req.params.id} was deleted`
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }
};

const list = async (req, res) => {
  try {
    let users = await UserModel.find({}).exec();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }
};

module.exports = {
  read,
  update,
  remove,
  list,
  available,
};
