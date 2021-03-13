const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); //core
const nodeCouchDB = require("node-couchdb");

const app = express();

// adding view engine middleware
app.set("view engine", "ejs");
app.set("view", path.join(__dirname, 'views'));

// adding body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function (req, res) {
    res.send("working....");
});

app.listen(3000, function () {
    console.log("Server running of port 3000");
});


