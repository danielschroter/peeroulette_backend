"use strict";

const mongoose = require("mongoose");

// Define the user schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
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
});

UserSchema.set("versionKey", false);

// Export the Movie model
module.exports = mongoose.model("User", UserSchema);
