// DATABASE
require('dotenv').config();

// Imports 
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

// Testing
//const Song = require('./models/Song');
// tell node to use json and HTTP header features in body-parser 
//app.use(express.urlencoded({extended: true})); 
// use the route handlers 
//const router = require('./handlers/router.js'); 
//router.handleAllSongs(app, Song); 

/*let djData = [
    { "name": "Alan Walker", "times": ["8pm", "11pm", "12am"]},
    { "name": "Tiesto", "times": ["12am", "1am", "2am"]},
    { "name": "Marshmellow", "times": ["9pm", "10pm", "12am"]}
];*/


// Static Files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/song", express.static(__dirname + "/public/song_list"));


// Set Views
// Set Templating Engine
app.use(expressLayouts);
//app.set("views", "./views");
app.set("layout", "./layouts/default-layout");
app.set("view engine", "ejs");


/*************************************/
// Array of objects for each page
// To create dynamic EJS views, layouts
/* THIS PART IS FOR DATABASE */
let djData = retrieveData();
// Retrieve data from the database and store it into djData
async function retrieveData() {
    const Data = require('./models/DJ_data'); 
    try {
        // Fetch all documents from the DJs collection
        const result = await Data.find({});
        // Store the result into djData
        djData= result.map(item => ({
            name: item.name,
            times: item.times
        }));
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
}

// Responsible for alanwalker
// Retrieve data from the database and store it into alan_songs
async function retrieveData1() {
    const Song = require('./models/Alan_song.js');
    try {
        // Fetch all documents from the DJs collection
        const result = await Song.find({});
        // Store the result into alan_songs
        var alan_songs= result.map(item => ({
            name: item.name,
            src: item.src
        }));
        return alan_songs;
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
}

// Responsible for tiesto
// Retrieve data from the database and store it into tiesto_songs
async function retrieveData2() {
    const Song = require('./models/Tiesto_song'); 
    try {
        // Fetch all documents from the DJs collection
        const result = await Song.find({});
        // Store the result into tiesto_songs
        var tiesto_songs= result.map(item => ({
            name: item.name,
            src: item.src
        }));
        return tiesto_songs;
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
}

// Responsible for marsh
// Retrieve data from the database and store it into marsh_songs
async function retrieveData3() {
    const Song = require('./models/Marsh_song'); 
    try {
        // Fetch all documents from the DJs collection
        const result = await Song.find({});
        // Store the result into marsh_songs
        var marsh_songs= result.map(item => ({
            name: item.name,
            src: item.src
        }));
        return marsh_songs;
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
}
/*************************************/



/*************************************/
/* THIS PART IS FOR DATABASE */
// Import required modules
const bodyParser = require('body-parser');

// Parse JSON-encoded bodies
app.use(bodyParser.json());

const Song = require('./models/Song'); // Import the Song model

// Integrate functions into Express routes
/* SEARCH SONG FROM DATABASE */
app.post('/search_song', async (req, res) => {
    const query = req.body.query; // Get the search query from the request body
    try {
        // Search for songs matching the query
        const songs = await Song.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive search by name
                { src: { $regex: query, $options: 'i' } }   // Case-insensitive search by src
            ]
        });
        res.json(songs); // Return the search results as JSON
    } catch (error) {
        res.status(500).json({ error: 'Error searching for songs' });
    }
});

/* ADD SONG TO DATABASE */
// Endpoint to add a new song to the MongoDB database for AlanWalker
app.post('/api/addsong1', async (req, res) => {
    const Song = require('./models/Alan_song.js');
    const { name, src } = req.body;
    try {
        // Create a new document for the song
        const newSong = await Song.create({ name, src });
        res.status(201).send('Song added successfully');
    } catch (error) {
        console.error('Error adding song to MongoDB:', error);
        res.status(500).send('Internal server error');
    }
});

// Endpoint to add a new song to the MongoDB database for Tiesto
app.post('/api/addsong2', async (req, res) => {
    const Song = require('./models/Tiesto_song.js');
    const { name, src } = req.body;
    try {
        // Create a new document for the song
        const newSong = await Song.create({ name, src });
        res.status(201).send('Song added successfully');
    } catch (error) {
        console.error('Error adding song to MongoDB:', error);
        res.status(500).send('Internal server error');
    }
});

// Endpoint to add a new song to the MongoDB database for Marsh
app.post('/api/addsong3', async (req, res) => {
    const Song = require('./models/Marsh_song.js');
    const { name, src } = req.body;
    try {
        // Create a new document for the song
        const newSong = await Song.create({ name, src });
        res.status(201).send('Song added successfully');
    } catch (error) {
        console.error('Error adding song to MongoDB:', error);
        res.status(500).send('Internal server error');
    }
});


/* DELETE SONG FROM DATABASE */
app.post('/api/deletesong1', async (req, res) => {
    const Song = require('./models/Alan_song.js');
    const { name, src } = req.body;
    try {
        // Create a new document for the song
        const newSong = await Song.deleteOne({ name, src });
        res.status(201).send('Song added successfully');
    } catch (error) {
        console.error('Error adding song to MongoDB:', error);
        res.status(500).send('Internal server error');
    }
});

/* DELETE SONG FROM DATABASE */
app.post('/api/deletesong2', async (req, res) => {
    const Song = require('./models/Tiesto_song.js');
    const { name, src } = req.body;
    try {
        // Create a new document for the song
        const newSong = await Song.deleteOne({ name, src });
        res.status(201).send('Song added successfully');
    } catch (error) {
        console.error('Error adding song to MongoDB:', error);
        res.status(500).send('Internal server error');
    }
});

/* DELETE SONG FROM DATABASE */
app.post('/api/deletesong3', async (req, res) => {
    const Song = require('./models/Marsh_song.js');
    const { name, src } = req.body;
    try {
        // Create a new document for the song
        const newSong = await Song.deleteOne({ name, src });
        res.status(201).send('Song added successfully');
    } catch (error) {
        console.error('Error adding song to MongoDB:', error);
        res.status(500).send('Internal server error');
    }
});
/*************************************/


// Routes
app.get("", (req, res) => {
    res.render("index");
});

app.get("/screen", (req, res) => {
    res.render("screen", {djData});   
});

app.get("/alanwalker", async(req, res) => {
    try {
        // Wait for data retrieval to complete
        const alan_songs = await retrieveData1();
        // Use alan_songs in your route handler
        res.render("alanwalker", {alan_songs});
    } catch (error) {
        console.error('Error handling /alanwalker request:', error);
        // Handle the error appropriately, maybe render an error page
        res.status(500).send('Internal Server Error');
    }
});

app.get("/tiesto", async(req, res) => {
    try {
        // Wait for data retrieval to complete
        const tiesto_songs = await retrieveData2();
        // Use tiesto_songs in your route handler
        res.render("tiesto", {tiesto_songs});
    } catch (error) {
        console.error('Error handling /tiesto request:', error);
        // Handle the error appropriately, maybe render an error page
        res.status(500).send('Internal Server Error');
    }
});

app.get("/marshmellow", async(req, res) => {
    try {
        // Wait for data retrieval to complete
        const marsh_songs = await retrieveData3();
        // Use marsh_songs in your route handler
        res.render("marshmellow", {marsh_songs});
    } catch (error) {
        console.error('Error handling /marshmellow request:', error);
        // Handle the error appropriately, maybe render an error page
        res.status(500).send('Internal Server Error');
    }
});



/*************************************/
/* THIS PART IS FOR DATABASE*/
// create connection to database 
require('./handlers/dataConnector.js').connect(); 
/*************************************/


app.use(function (req, res, next) { 
    res.status(404).send("Sorry can't find that!") 
});

// Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));

