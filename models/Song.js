const mongoose = require("mongoose");

// define a schema that maps to the structure of the data in MongoDB
const songSchema =  new mongoose.Schema({
    name: String,
    src: String
});

module.exports = mongoose.model("Song", songSchema, "song"); // song is the actual name of the collection 