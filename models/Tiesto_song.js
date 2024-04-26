const mongoose = require("mongoose");

// define a schema that maps to the structure of the data in MongoDB
const songSchema =  new mongoose.Schema({
    name: String,
    src: String
});

module.exports = mongoose.model("Tiesto_Song", songSchema, "tiesto_songs"); // tiesto_songs is the actual name of the collection 