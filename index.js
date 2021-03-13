const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); //core
const NodeCouchDb = require("node-couchdb");
// node-couchdb instance with default options
const couch = new NodeCouchDb({
    auth: {
        user: "username",
        password: "password"
    }
});

couch.listDatabases().then(dbs => console.log(dbs), err => {
    // request error occured
});


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


