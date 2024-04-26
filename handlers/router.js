// handle GET requests for [domain]/api/books - return all books 
const handleAllSongs = (app, Song) => { 
    app.get("/api/songs", (req, res) => { 
        // use mongoose to retrieve all books from Mongo 
        Song.find() 
            .then((data) => { 
                res.json(data); 
            }) 
            .catch((err) => { 
                res.json({ message: "Unable to connect to books" }); 
            }); 
    }); 
};

module.exports = { 
    handleAllSongs
};
