"use strict";

const ConversationModel = require("../models/conversation");

const addConversation = async (req, res) => {
	const newConversation = {
		members: [req.body.senderId, req.body.receiverId],
	};

	// Check if conversation already exists
	let checkConversation = await ConversationModel.findOne({
		members: { $all: [req.body.senderId, req.body.receiverId] },
	  }).exec();
	  if (checkConversation)
		return res.status(404).json({
		  error: "Conversation already exists.",
		});

	try {
		const savedConversation = await ConversationModel.create(newConversation);
		return res.status(200).json(savedConversation);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		});
	}
};

const getUserConversation = async (req, res) => {
	try {
		const conversation = await ConversationModel.find({
			members: { $in: [req.params.userId] },
		}).exec();
		return res.status(200).json(conversation);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		});
	}
};

const getConversation = async (req, res) => {
	try {
		const conversation = await ConversationModel.findOne({
			members: { $all: [req.params.firstUserId, req.params.secondUserId] },
		}).exec();
		return res.status(200).json(conversation);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		});
	}
};

const deleteConversation = async (req, res) => {
    try {
        await ConversationModel.findByIdAndRemove(req.params.id).exec();

        return res.status(200).json({message: `Conversation with id${req.params.id} was deleted`});
    } catch(err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message
        });
    }
};

module.exports = {
	addConversation,
	getUserConversation,
	getConversation,
	deleteConversation,
};
