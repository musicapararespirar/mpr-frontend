const mongoose = require('mongoose');
const config = require('config');
const db = config.get("MongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false

        });

        console.log("MongoDB connected.");
    } catch(err) {
        console.error(err.message);
        // Failure on exit
        process.exit(1);
    }
}


module.exports = connectDB;
