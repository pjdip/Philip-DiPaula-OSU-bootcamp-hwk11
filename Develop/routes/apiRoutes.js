// Dependencies
const fs = require("fs");

// Routing
module.exports = function(app) {

    // Data Load
    let rawData = fs.readFileSync("../db/db.json");
    let notes = JSON.parse(rawData);
    /* var notes = require("../db/db.json"); */

    // API GET requests
    // Reads db.json and returns saved notes
    app.get("/api/notes", (req, res) => {
        res.json(notes);
    });

    // API POST requests
    // For creating new notes and writing to db.json
    app.post("/api/notes", (req, res) => {

        // parsing middleware allows us to use req.body
        let newNote = req.body;

        // setting a route for deleting notes later
        newNote.routeName = newNote.noteID;

        console.log(newNote);
        notes.push(newNote);
        res.json(newNote);

        fs.writeFile("../db/db.json", notes, (err) => {
            err ? console.error(err) : console.log("New Note Added!");
        });

    });

    // API DELETE requests
    // For deleting specific notes
    app.delete("/api/notes/:note", (req, res) => {
        
        // Identify note to be deleted
        var chosen = req.params.note;

        // Check db.json to find the chosen note
        for (var i = 0; i < notes.length; i++) {
            if (chosen === notes[i].routeName) {
                notes.splice(i, 1);
            };
        };

        fs.writeFile("../db/db.json", notes, (err) => {
            err ? console.error(err) : console.log("Note Deleted!");
        });

        res.json(notes);

    });
};