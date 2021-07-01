"use strict";

const express  = require('express');
const router   = express.Router();

const InterestsController = require('../controllers/interests');

router.get("/", InterestsController.getInterests); // List all users

module.exports = router;