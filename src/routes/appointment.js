"use strict";

const express  = require('express');
const router   = express.Router();

const AppointmentController = require('../controllers/appointment');

router.get("/", AppointmentController.getAppointments); // List all users

module.exports = router;