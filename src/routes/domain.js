"use strict";

const express  = require('express');
const router   = express.Router();

const DomainController = require('../controllers/domain');

router.get("/", DomainController.list); // list domains
router.get("/:id", DomainController.read); // list domains

module.exports = router;