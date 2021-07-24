"use strict";

const express  = require('express');
const router   = express.Router();

const AppointmentController = require('../controllers/appointment');

router.get("/getAppointments", AppointmentController.getAppointments); // List all users
router.post(
    "/",
    AppointmentController.create
);
router.put(
    "/:id",
    AppointmentController.update
);
router.delete(
    "/:id",
    AppointmentController.remove
);
router.post(
    "/getRecommendations",
    AppointmentController.getRecommendations
);

router.post(
    "/getAppointment",
    AppointmentController.getAppointment
);
module.exports = router;