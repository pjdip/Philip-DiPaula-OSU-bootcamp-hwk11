// NPM package dependencies
var express = require("express");

// Creating an express server
var app = express();

// Establishing an initial port
var PORT = process.env.PORT || 8080;

// Middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

// Listener
app.listen(PORT, function() {
    console.log("Note app listening on PORT: " + PORT);
});