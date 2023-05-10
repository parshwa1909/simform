const mongoose = require("mongoose");
require("dotenv/config");

const connectToMongo = () => {
    const dbUsername = process.env.DB_USERNAME;
    const dbPassword = process.env.DB_PASSWORD;

    const mongoURL = `mongodb+srv://${dbUsername}:${dbPassword}@parshwa19.jqxc2ra.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.connect(mongoURL, () => {
        console.log("connected to mongo");
    });
};

module.exports = { connectToMongo };
