"use strict";

const express  = require('express');
const router   = express.Router();

const Ice_QuestionsController = require('../controllers/ice_questions');

router.get("/", Ice_QuestionsController.getIceQuestions); // List all users

module.exports = router;