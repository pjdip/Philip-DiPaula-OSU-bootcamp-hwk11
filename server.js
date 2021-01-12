// NPM package dependencies
const express = require("express");

// Creating an express server
const app = express();

// Establishing an initial port
const PORT = process.env.PORT || 8080;

// Middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routing
// apiRoutes has to go first or it get's angry for some reason lol
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Listener
app.listen(PORT, function() {
    console.log("Note app listening on PORT: " + PORT);
});