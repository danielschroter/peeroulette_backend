"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const UserController = require('../controllers/user');


router.post("/register", UserController.register); // register a new user
router.get('/', UserController.list); // List all movies
router.post('/create', middlewares.checkAuthentication, UserController.create); // Create a new movie
router.get('/read', UserController.read); // Read a movie by Id
router.put('/update', UserController.update); // Update a movie by Id
router.delete('/delete', middlewares.checkAuthentication, UserController.remove); // Delete a movie by Id


module.exports = router;