const mongoose = require("mongoose");

async function connectToMonogoDb(url) {
  mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDb successfully"))
    .catch(() => console.log("Failed to connect to MongoDB"));
}

module.exports = { connectToMonogoDb };
