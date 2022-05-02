// establishes the mongoose connection to mongoDB.
// MONGO_URI in .env must be set to the mongoDB connection string.
// it is found on the site via the 'connect' button when viewing the cluster.
// the relevant connection string is 'connect to your application.'
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
};

module.exports = connectDB;