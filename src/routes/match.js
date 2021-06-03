"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const MatchController = require('../controllers/match');


router.get('/', MatchController.list); // List all movies
router.post('/', middlewares.checkAuthentication, MatchController.create); // Create a new movie
router.get('/:id', MatchController.read); // Read a movie by Id
router.put('/:id', middlewares.checkAuthentication, MatchController.update); // Update a movie by Id
router.delete('/:id', middlewares.checkAuthentication, MatchController.remove); // Delete a movie by Id


module.exports = router;