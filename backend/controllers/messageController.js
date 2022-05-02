// here we're importing an async handler that automatically
// passes exceptions to our error middleware function
// so we don't need to specify it every time using '.catch':
const asyncHandler = require('express-async-handler');

// this is an example of importing a database model, as controller
// logic will usually involve manipulation of database items:
const Message = require('../models/messageModel');

// example CRUD functions follow. they don't do anything
// other than return an empty 200 response or error right now:
const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find();
    res.status(200).json(messages);
});

const createMessage = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error ('please add text');
    }
    const message = await Message.create({
        message: req.body.message
    })
    res.status(200).json(message);
});

const updateMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);

    if (!message) {
        res.status(400);
        throw new Error ('message not found');
    }

    // setting the optional parameter 'new:true' means create if it doesn't exist:
    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, {new:true});

    res.status(200).json(updatedTodo);
});

const deleteMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);

    if (!message) {
        res.status(400);
        throw new Error ('message not found');
    }

    await message.remove();
    res.status(200).json({id: req.params.id});
});

module.exports = {
    getMessages,
    createMessage,
    updateMessage,
    deleteMessage
}