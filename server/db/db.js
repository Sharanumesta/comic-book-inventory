const mongoose = require('mongoose');

const URI = process.env.MONGO_DB;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database Connection successful");
    } catch (error) {
        console.log("Database Connection failed");
        process.exit(0);
    }
}

module.exports = connectDb;