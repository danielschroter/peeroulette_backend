"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const MatchController = require('../controllers/match');


router.get('/', MatchController.list); // List all matches
router.post('/', MatchController.create); // Create a new match
router.get('/:id', MatchController.read); // Read a match by Id
router.put('/:id', middlewares.checkAuthentication, MatchController.update); // Update a match by Id
router.delete('/:id', MatchController.remove); // Delete a match by Id
router.get('/last/:userId', MatchController.getLastMatches); // Get last matches of user


module.exports = router;