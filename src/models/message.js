"use strict";

const mongoose = require("mongoose");

// Define the message schema
const MessageSchema = new mongoose.Schema(
	{
		conversationId: {
			type: String,
		},
		sender: {
			type: String,
		},
		text: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
