"use strict";

const express = require("express");
const router = express.Router();

const MessageController = require("../controllers/message");

router.post("/", MessageController.addMessage); // Add message
router.get("/:conversationId", MessageController.getMessage); // Get messages of conversation

module.exports = router;
