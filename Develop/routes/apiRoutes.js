// Dependencies
const fs = require("fs");
const crypto = require("crypto");

// Routing
module.exports = function(app) {

    const writeNotes = (message) => {
        fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
            err ? console.error(err) : console.log(message);
        });
    };

    // API GET requests
    // Reads db.json and returns saved notes
    app.get("/api/notes", (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
        console.log("Retrieving Notes!");
    });

    // API POST requests
    // For creating new notes and writing to db.json
    app.post("/api/notes", (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);

            // Parsing middleware allows us to use req.body
            let newNote = req.body;

            // Setting a random id for deleting notes later
            newNote.id = crypto.randomBytes(16).toString('hex');

            console.log(newNote);
            notes.push(newNote);
            res.json(notes);

            writeNotes("New Note Added!");
        });
/*         fs.writeFile("db/db.json", notes, (err) => {
            err ? console.error(err) : console.log("New Note Added!");
        }); */

    });

    // API DELETE requests
    // For deleting specific notes
    app.delete("/api/notes/:note", (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            // Identify note to be deleted
            var chosen = req.params.note;

            // Check db.json to find the chosen note
            for (var i = 0; i < notes.length; i++) {
                if (chosen === notes[i].id) {
                    notes.splice(i, 1);
                };
            };

            writeNotes("Note Deleted!");
            res.json(notes);
        });
/*         fs.writeFile("db/db.json", notes, (err) => {
            err ? console.error(err) : console.log("Note Deleted!");
        }); */

    });
};