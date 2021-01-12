// Dependencies
const fs = require("fs");
const crypto = require("crypto");

// Routing
module.exports = function(app) {

    // Function for writing the array of json objects to the db.json
    // Takes in a json object list and message to be logged
    const writeNotes = (jsonObjList, message) => {
        fs.writeFile("db/db.json", JSON.stringify(jsonObjList), (err) => {
            err ? console.error(err) : console.log(message);
        });
    };

    // API GET requests
    // Reads db.json and returns saved notes
    app.get("/api/notes", (req, res) => {
        fs.readFile("db/db.json", (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
        console.log("Retrieving Notes!");
    });

    // API POST requests
    // For creating new notes and writing to db.json
    app.post("/api/notes", (req, res) => {
        fs.readFile("db/db.json", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);

            // Parsing middleware allows us to use req.body
            let newNote = req.body;

            // Setting a random id for deleting notes later and updating note array
            newNote.id = crypto.randomBytes(16).toString('hex');
            notes.push(newNote);

            // Send updated notes array to front-end for display
            res.json(notes);

            // Update db.json and log the new acquisition
            writeNotes(notes, "New Note Added!");
        });
    });

    // API DELETE requests
    // For deleting specific notes
    app.delete("/api/notes/:note", (req, res) => {
        fs.readFile("db/db.json", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);

            // Identify note to be deleted
            let chosen = req.params.note;

            // Loop through db.json to find the chosen note
            for (var i = 0; i < notes.length; i++) {
                if (chosen === notes[i].id) {
                    
                    // Remove the perpetrator from the array
                    notes.splice(i, 1);
                };
            };

            res.json(notes);
            writeNotes(notes, "Note Deleted!");
        });
    });
};