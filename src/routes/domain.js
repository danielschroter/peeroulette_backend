"use strict";

const express  = require('express');
const router   = express.Router();

const DomainController = require('../controllers/domain');

router.get("/", DomainController.getDomain); // List all users

module.exports = router;