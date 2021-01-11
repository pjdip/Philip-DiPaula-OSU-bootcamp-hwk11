// Path package is a built-in node module we must define in order to use in the application
const path = require("path");

// Routing
module.exports = function(app) {

    // HTML GET requests for each visitable page

    app.get("/notes", function(req,res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // * gives the default route when no matching route is found
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};