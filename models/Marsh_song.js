const mongoose = require("mongoose");

// define a schema that maps to the structure of the data in MongoDB
const songSchema =  new mongoose.Schema({
    name: String,
    src: String
});

module.exports = mongoose.model("Marsh_Song", songSchema, "marsh_songs"); // marsh_songs is the actual name of the collection 