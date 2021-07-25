"use strict";

const mongoose = require("mongoose");

// Define the conversation schema
const ConversationSchema = new mongoose.Schema(
	{
		members: {
			type: Array,
		},
	},
	{ timestamps: true }
);

ConversationSchema.set("versionKey", false);

module.exports = mongoose.model("Conversation", ConversationSchema);
