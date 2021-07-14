"use strict";

const express  = require('express');
const router   = express.Router();

const AppointmentController = require('../controllers/appointment');

router.get("/getAppointments", AppointmentController.getAppointments); // List all users

module.exports = router;