"use strict";

const express  = require('express');
const router   = express.Router();

const DomainController = require('../controllers/domain');

router.get("/", DomainController.list); // list domains
router.get("/:id", DomainController.read); // list domains
router.delete('/:id', DomainController.remove); // Delete an organization by Id
router.post("/addDomain", DomainController.create); // register a new user

module.exports = router;