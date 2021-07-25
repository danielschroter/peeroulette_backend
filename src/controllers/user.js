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
            req.body,
            {
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
    let user = await UserModel.findById(req.params.id).exec();
    if (!user){
      return res.status(404).json({
        error: "Not Found",
        message: `User not found`,
      });
    }
    // else{
      // return res.status(200).json(user.interests);
    // }

    console.log(req.params.id);

    if(user.employeeFilter){
      var filter = { "organization": {$eq: user.organization} };
    }else{
      var filter = {};
    }

    let available = await UserModel.aggregate([
      {
        $match: {
          $and: [
            { "online": true },
            { "interests": { $in: user.interests } },
            { "username": {$ne: user.username} },
            filter
          ]
        }
      },
      {
        $set: {
          matchedCount: {
            $size: {
              $setIntersection: ["$interests", user.interests]
            }
          }
        }
      },
      {$project: {
        username: 1,
        city: 1,
        university: 1,
        organization: 1,
        matchedCount: 1,
      }},
      {
        $sort: {
          matchedCount: -1
        }
      }
    ]).skip(page).exec();

    // sort({_id:1})
    // $size: {
    //   $setIntersection: [
    //     user.interest, "interests"
    //   ]
    // }

    // let available2 = await UserModel.findOne({
    //   $and: [
    //     { "online": true },
    //     { "interests": { $in: user.interests } },
    //     { "_id": { $ne: req.params.id } }
    //   ]
    // }).skip(page).limit(1).exec();
    // if no movie with id is found, return 404
    if (available.length == 0){
      return res.status(404).json({
        error: "None Available",
        message: `No Match found`,
      });
    }else{
      return res.status(200).json(available[0]);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const read = async (req, res) => {
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

const switchEmployeeFilter = async (req,res) => {
    try {
        console.log("Getting here");
        console.log("this is the req.body " + req.body.id);
        let oldUser = await UserModel.findByIdAndUpdate(req.body.id).exec();

        let updatedUser = await UserModel.findOneAndUpdate(
            { _id: req.body.id },
            { employeeFilter: !oldUser.employeeFilter },
            { new: true }
        );

        return res.status(200).json(updatedUser.employeeFilter);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
}

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


module.exports = {
  read,
  update,
  remove,
  list,
  available,
  switchEmployeeFilter,
};
