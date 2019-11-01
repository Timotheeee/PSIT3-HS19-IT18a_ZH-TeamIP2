#!/usr/bin/env node
import {Dao} from "./Dao"
import { AnyNaptrRecord } from "dns";
import {Result} from "../../frontend/src/model/Result";

const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  mysql = require('mysql'),
  fs = require('fs'),
  dbpassword = "psit";


var dao = new Dao();


app.use(morgan('dev'));
app.use(express.static(__dirname + '//..//..//frontend//public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at http://' + host + ':' + port);
}

app.get('/api/', function (req: any, res: { status: (arg0: number) => { json: (arg0: { db: any; }) => void; }; }) {
  var graph = dao.getGraph();
  res.status(200).json(graph);
});

app.post('/api/', function (req: any, res: { status: (arg0: number) => { json: (arg0: { response: string; }) => void; }; }) {
  if(req.body.password===dbpassword)
  dao.saveGraph(req.body.graph);
  res.status(200).json({response:"ok"});
  console.log(req.body);
});

app.post('/password/', function (req: any, res: { status: (arg0: number) => { json: (arg0: { response: boolean; }) => void; }; }) {
  let response = req.body.password===dbpassword;
  res.status(200).json({"response":response});
  console.log(req.body);
});

app.post('/score/', function (req: any, res: { status: (arg0: number) => { json: (arg0: { result: Result; }) => void; }; }) {
  var result = new Result(75, [
    "Try avoiding any distractions while learning",
    "Attend the lectures more often"
  ]);
  res.status(200).json({
    result
  });
});
