#!/usr/bin/env node

const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  mysql = require('mysql'),
  fs = require('fs');
app.use(morgan('dev'));
app.use(express.static(__dirname + '\\..\\..\\frontend\\public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://' + host + ':' + port);
}



var db: any;

//this isn't used for now, it will be once we have users
function save() {
  con.query("update graph set data = '?'", function (err: any, result: any) {
    if (err) throw err;
  });
}

function load() {
  con.query("SELECT data FROM graph where id=1", function (err: any, result: any) {
    if (err) throw err;
    db = JSON.parse(result[0].data);
  });
}

app.post('/api/', function (req: { body: { answer: any; }; }, res: { status: (arg0: number) => { json: (arg0: { data: string; }) => void; }; }) {
  var answer = req.body.answer;
  var data = answer == 0 ? "good" : "bad";

  res.status(200).json({ data: data });
});

app.get('/api/', function (req: any, res: { status: (arg0: number) => { json: (arg0: { db: any; }) => void; }; }) {
  res.status(200).json({ db: db });
});



var con = mysql.createConnection({
  host: "timotheeee1.site",
  port: 3306,
  user: "timothel_psit3",
  password: "psit3",
  database: "timothel_psit3"
});

con.connect(function (err: any) {
  if (err) throw err;
  console.log("Connected to db!");
  runQuery("use timothel_psit3");
  load();
  //save();
});

function runQuery(sql: string) {
  con.query(sql, function (err: any, result: any) {
    if (err) throw err;
  });
}
