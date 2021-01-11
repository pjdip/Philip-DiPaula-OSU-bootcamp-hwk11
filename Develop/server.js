// NPM package dependencies
const express = require("express");

// Creating an express server
const app = express();

// Establishing an initial port
const PORT = process.env.PORT || 3033;

// Middleware for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routing
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

// Listener
app.listen(PORT, function() {
    console.log("Note app listening on PORT: " + PORT);
});