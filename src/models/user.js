"use strict";

const mongoose = require("mongoose");

// Define the user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  // email for confirmation
  email: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  // role of the user, used for rights management
  role: {
    type: String,
    // role can only take the value "member" and "admin"
    enum: ["member", "admin"],
    // if not specified the role member is choosen
    default: "member",
  },
  account_owner_of_organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  interests: [{
      type: String,
  }],
  city: {
      type: String,
      default: "Your City",
  },
  university: {
      type: String,
      default: "Your University",
  },
  organization: {
      type: String,
      default: "Your Organization",
  },
  online: {
      type: Boolean,
      default: false,
  },
  // online_until: {
  //     type: Int64,
  //     default: 0,
  // },
  employeeFilter: {
    type: Boolean,
    default: false,
  }
});

UserSchema.set("versionKey", false);

// Export the Movie model
module.exports = mongoose.model("User", UserSchema);
