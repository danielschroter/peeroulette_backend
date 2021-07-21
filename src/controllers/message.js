"use strict";

const MessageModel = require("../models/message");

const addMessage = async (req, res) => {
	const newMessage = new MessageModel(req.body);

	try {
		const savedMessage = await MessageModel.create(newMessage);
		return res.status(200).json(savedMessage);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		});
	}
};

const getMessage = async (req, res) => {
	try {
		const messages = await MessageModel.find({
			conversationId: req.params.conversationId,
		}).exec();
		return res.status(200).json(messages);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		});
	}
};

module.exports = {
	addMessage,
	getMessage,
};
