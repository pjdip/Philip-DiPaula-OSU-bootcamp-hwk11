// Data Load
var notes = require("../db/db.json");

// Routing
module.exports = function(app) {

    // API GET requests
    // Reads db.json and returns saved notes
    app.get("api/notes", function(req, res) {
        res.json(notes);
    });

    // API POST requests
    // For creating new notes and writing to db.json
    app.post("api/notes", function(req, res) {

        // parsing middleware allows us to use req.body
        var newNote = req.body;

        // setting a route for deleting notes later
        newNote.routeName = newNote.noteID;

        console.log(newNote);
        notes.push(newNote);
        res.json(newNote);
    });

    
};