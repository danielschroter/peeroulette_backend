"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const OrganizationController = require('../controllers/organization');


router.get('/', OrganizationController.list); // List all movies
router.post('/', middlewares.checkAuthentication, OrganizationController.create); // Create a new movie
router.get('/:id', OrganizationController.read); // Read a movie by Id
router.put('/:id', middlewares.checkAuthentication, OrganizationController.update); // Update a movie by Id
router.delete('/:id', OrganizationController.remove); // Delete an organization by Id

module.exports = router;