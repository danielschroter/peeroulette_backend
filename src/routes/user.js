"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const UserController = require('../controllers/user');


router.post("/register", UserController.register); // register a new user

router.get("/", UserController.list); // List all movies
router.post(
    "/",
    middlewares.checkAuthentication,
    middlewares.checkIsAdmin,
    UserController.create
); // Create a new movie, needs logged in user with the admin role
router.get("/:id", UserController.read); // Read a movie by Id
router.put(
    "/:id",
    UserController.update
); // Update a movie by Id, needs logged in user with the admin role
router.delete(
    "/:id",

    UserController.remove
); // Delete a movie by Id, needs logged in user with the admin role


module.exports = router;