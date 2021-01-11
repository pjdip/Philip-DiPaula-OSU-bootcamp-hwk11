// Dependencies
const fs = require("fs");
const crypto = require("crypto");

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

        // Parsing middleware allows us to use req.body
        let newNote = req.body;

        // Setting a random id for deleting notes later
        newNote.id = crypto.randomBytes(16).toString('hex');

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
            if (chosen === notes[i].id) {
                notes.splice(i, 1);
            };
        };

        fs.writeFile("../db/db.json", notes, (err) => {
            err ? console.error(err) : console.log("Note Deleted!");
        });

        res.json(notes);

    });
};