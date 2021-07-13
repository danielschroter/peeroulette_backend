"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const UserController = require('../controllers/user');


router.get("/", UserController.list); // List all users
router.get("/:id", UserController.read); // Read a user by Id
router.post("/switchEmployeeFilter", UserController.switchEmployeeFilter)
router.put(
    "/:id",
    UserController.update
); // Update a user by Id, needs logged in user with the admin role
router.delete(
    "/:id",
    UserController.remove
); // Delete a user by Id, needs logged in user with the admin role


module.exports = router;