const mongoose = require("mongoose");

// define a schema that maps to the structure of the data in MongoDB
const DJschema =  new mongoose.Schema({
    name: String,
    times: [String]
});

module.exports = mongoose.model("DJ_Data", DJschema, "DJ_Data"); // DJ_Data is the actual name of the collection 