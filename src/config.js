"use strict";

// Configuration variables
const port = process.env.PORT || "4000";
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/moviedb";
const JwtSecret = process.env.JWT_SECRET || "very secret secret";

// Frontend API for emailTemplate.js
const frontendURL = "http://localhost:3000";

module.exports = {
  port,
  mongoURI,
  JwtSecret,
  frontendURL,
};
