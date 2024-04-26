const songs = JSON.parse(music);

document.getElementById("header").textContent = "Alan Walker's Playlist";

// Define function to handle search
function searchSong(event) {
    event.preventDefault(); // Prevent form submission
    const searchQuery = document.getElementById("search_bar").value.toLowerCase();
    const results = []; // Store search results here
    
    // Iterate through available songs    
    // Search for matching songs
    for (let song of songs) {
        if (song.name.toLowerCase().includes(searchQuery)) {
            results.push(song);
        }
    }

    // Display search results
    display(results);
}

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
function addNewSong(song) {
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
    newdeleteButton.addEventListener("click", () => deleteSong2(songDiv));

    // Append new song to the song list
    songDiv.appendChild(songNameDiv);
    songDiv.appendChild(newaudio);
    songDiv.appendChild(newdeleteButton);
    songList.appendChild(songDiv);
}


// Only apply to new songs added
function deleteSong2(songDiv) {
    songDiv.remove();
}


// Only apply to songs already exists 
function deleteSong(button) {
    // Find the parent node of the song to be deleted
    var songDiv = button.parentNode.parentNode;
    
    songDiv.parentNode.removeChild(songDiv);
}

// addEventListener to the search form
document.getElementById("search_form").addEventListener("submit", searchSong);
