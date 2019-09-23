#!/usr/bin/env node

const express = require('express'),
        bodyParser = require('body-parser'),
        morgan = require('morgan'),
        app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000, function () {
    console.log("ready captain.");
});

const fs = require('fs');

var db;
load();

function save() {
    fs.writeFile("./db.json", JSON.stringify(db), function (err) {
        if (err) {
            console.log(err);
        }
    });
}
function load() {
    fs.readFile("./db.json", function (err, data) {
        if (err) {
            return;
        }
        try {
            db = JSON.parse(data);
        } catch (e) {

        }
    });
}

app.post('/api/', function (req, res) {
    var answer = req.body.answer;
    var data = answer == 0 ? "good" : "bad";
    
    res.status(200).json({data:data});
});

app.get('/api/', function (req, res) {
    res.status(200).json({db: db});
});