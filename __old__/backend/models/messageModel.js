const mongoose = require('mongoose');

// example of how to set up a model for a database:
const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    }
},
// this adds create & update timestamps to the model as objects to the model
// if you want them:
{
    timestamps: true
});

module.exports = mongoose.model('message', messageSchema);