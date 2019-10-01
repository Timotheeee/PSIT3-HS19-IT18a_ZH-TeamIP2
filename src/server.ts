#!/usr/bin/env node

const express = require('express'),
        bodyParser = require('body-parser'),
        morgan = require('morgan'),
        app = express();

app.use(morgan('dev'));
console.log(__dirname + '\\..\\public');
app.use(express.static(__dirname + '\\..\\public')); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://' + host + ':' + port);
}

const fs = require('fs');

var db: any;
load();

function save() {
    fs.writeFile("./db.json", JSON.stringify(db), function (err: any) {
        if (err) {
            console.log(err);
        }
    });
} 
function load() {
    fs.readFile("./db.json", function (err: any, data: string) {
        if (err) {
            return;
        }
        try {
            db = JSON.parse(data);
        } catch (e) {

        }
    });
}

app.post('/api/', function (req: { body: { answer: any; }; }, res: { status: (arg0: number) => { json: (arg0: { data: string; }) => void; }; }) {
    var answer = req.body.answer;
    var data = answer == 0 ? "good" : "bad";
    
    res.status(200).json({data:data});
});

app.get('/api/', function (req: any, res: { status: (arg0: number) => { json: (arg0: { db: any; }) => void; }; }) {
    res.status(200).json({db: db});
});