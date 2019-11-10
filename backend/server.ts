#!/usr/bin/env node
import {DBController} from "./controllers/DBController"
import { AnyNaptrRecord } from "dns";
import {Result} from "../frontend/src/model/Result";
import { LoginController } from "./controllers/LoginController";

const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  mysql = require('mysql'),
  fs = require('fs');


var dao = new DBController();


app.use(morgan('dev'));
app.use(express.static(__dirname + '//..//frontend//public'));
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

app.get('/graph', function (req: any, res: { status: (arg0: number) => { json: (arg0: { db: any; }) => void; }; }) {
  var graph = dao.getGraph();
  if(graph) {
    res.status(200).json(graph);
  } else {
    throw new Error();
  }

});

app.post('/graph', function (req: any, res: { status: (arg0: number) => { json: (arg0: { response: string; }) => void; }; }) {
  dao.saveGraph(JSON.parse(req.body.graph));
  res.status(200).json({response:"ok"});
  console.log(req.body);
});

app.post('/login/', function (req: any, res: { status: (arg0: number) => { json: (arg0: { token: string; }) => void; }; }) {
  let token = new LoginController().login(req);

  // if login succesful
  if(token) {
    res.status(200).json({"token": token});
  } else {
    // wrong login
    res.status(400).json({"token": ''});
  }

  console.log(req.body);
});

app.post('/userPath/', function (req: any, res: { status: (arg0: number) => { json: (arg0: { response: string; }) => void; }; }) {
  // for future features
  let path = req.body.userPath;

  res.status(200).json({response:"ok"});
});
