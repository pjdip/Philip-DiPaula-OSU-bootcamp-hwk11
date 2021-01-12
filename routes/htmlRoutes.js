// Path package is a built-in node module we must define in order to use in the application
const path = require("path");

// Routing
module.exports = function(app) {

    // HTML GET requests for each visitable page
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "..public/index.html"));
    });
    
    app.get("/notes", (req,res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // * gives the default route when no matching route is found
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};