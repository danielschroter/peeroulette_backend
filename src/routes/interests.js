"use strict";

const express  = require('express');
const router   = express.Router();

const InterestsController = require('../controllers/interests');

router.get("/", InterestsController.list); // List all interests


module.exports = router;