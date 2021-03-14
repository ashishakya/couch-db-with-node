const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); //core
const NodeCouchDb = require("node-couchdb");
require('dotenv').config()
// node-couchdb instance with default options
const couch = new NodeCouchDb({
    auth: {
        user: process.env.COUCH_DB_USERNAME,
        password: process.env.COUCH_DB_PASSWORD
    }
});

const dbName = "customers";
const viewUrl = "_design/all_customers/_view/all";

// list database
// couch.listDatabases().then(dbs => console.log(dbs), err => {
//     // request error occured
// });


const app = express();

// adding view engine middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

// adding body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function (req, res) {
    couch.get(dbName, viewUrl).then((data, headers, status) => {
        res.render("index", {
            customers: data.data.rows
        });
        // console.log(data.rows.rows);
        // 18:05
        // data is json response
        // headers is an object with all response headers
        // status is statusCode number
    }, (err) => {
        res.send(err);
        // either request error occured
        // ...or err.code=EDOCMISSING if document is missing
        // ...or err.code=EUNKNOWN if statusCode is unexpected
    });
});

app.post("/customers", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    couch.uniqid().then(ids => {
        const id = ids[0];
        couch.insert("customers", {
            _id: id,
            name,
            email
        }).then(function (data, headers, status) {
            res.redirect("/")
            // data is json response
            // headers is an object with all response headers
            // status is statusCode number
        }, function (err) {
            res.send(err);
            // either request error occured
            // ...or err.code=EDOCCONFLICT if document with the same id already exists
        });
    });
})

app.listen(3000, function () {
    console.log("Server running of port 3000");
});


