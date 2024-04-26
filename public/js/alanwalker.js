document.getElementById("header").textContent = "Alan Walker's Playlist";
 
// Handle form submission
document.getElementById('search_form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    const query = document.getElementById('search_bar').value; // Get search query
    const response = await fetch('/search_song', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query }) // Send query to server
    });
    const songs = await response.json(); // Parse JSON response
    display(songs); // Display search results
});



// Function to display search results
function display(results) {
    const searchResults = document.getElementById("search_results");
    searchResults.innerHTML = ""; // Clear previous results

    // Create and append list of search results
    results.forEach(song => {
        const songToAdd = document.createElement("div");
        songToAdd.textContent = song.name;

        // Create and implement the "Add" button
        const addButton = document.createElement("button");
        addButton.textContent = "Add";
        songToAdd.appendChild(addButton);
        searchResults.appendChild(songToAdd);
        addButton.addEventListener("click", () => addNewSong(song));
    });
}


// Function to add selected song to the song list
async function addNewSong(song) {
    const songList = document.querySelector(".song-list");

    // Check if the song already exists in the list
    var exist;
    const existingSongs = songList.querySelectorAll(".x");
    existingSongs.forEach(eachSong => {
        const eachSongName = eachSong.querySelector("div").textContent.trim();
        // Song already exists, show alert
        if (eachSongName == song.name) {
            exist = 1;
            return exist; // Exit the function
        }
    });

    if(exist){
        alert("The song already exists in the list.");
        return;
    }
    
    // Create new song div
    const songDiv = document.createElement("div");
    songDiv.classList.add("x");

    // Create new song div for name
    const songNameDiv = document.createElement("div");
    songNameDiv.textContent = song.name;

    // Create audio
    const newaudio = document.createElement("audio");
    newaudio.src = song.src;
    newaudio.controls = true;

    // Create delete button
    const newdeleteButton = document.createElement("button");
    newdeleteButton.textContent = "Delete";
    newdeleteButton.addEventListener("click", () => deleteSong(songDiv, song));

    // Append new song to the song list
    songDiv.appendChild(songNameDiv);
    songDiv.appendChild(newaudio);
    songDiv.appendChild(newdeleteButton);
    songList.appendChild(songDiv);
    
    // Add the new song to the MongoDB database
    try {
        const response = await fetch('/api/addsong1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        });
        if (response.ok) {
            console.log('Song added to MongoDB.');
        } else {
            console.error('Failed to add song to MongoDB:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding song to MongoDB:', error);
    }
}


// To delete the song from the song list and the database
async function deleteSong(songDiv, song) {
    songDiv.remove();

    try {
        const response = await fetch('/api/deletesong1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        });
        if (response.ok) {
            console.log('Song deleted from MongoDB.');
        } else {
            console.error('Failed to delete song from MongoDB:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting song to MongoDB:', error);
    }

}

function logOut() {
    // Target the song-list element
    var songList = document.querySelectorAll(".x");
    songList.forEach(song =>{
        song.remove();
    });
    document.querySelector(".song-list").style.overflowY ="hidden";
}
