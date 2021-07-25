"use strict";

const express = require("express");
const router = express.Router();

const ConversationController = require("../controllers/conversation");

router.post("/", ConversationController.addConversation); // Add new conversation
router.get("/:userId", ConversationController.getUserConversation); // Get conversation of a user
router.get(
	"/find/:firstUserId/:secondUserId",
	ConversationController.getConversation
); // Get conversation of two users
router.delete('/:id', ConversationController.deleteConversation); // Delete a conversation by Id

module.exports = router;
