#!/usr/bin/env node
import {DBController} from './controllers/DBController'
import { AnyNaptrRecord } from 'dns';
import {Result} from '../frontend/src/model/Result';
import { LoginController } from './controllers/LoginController';

const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  mysql = require('mysql'),
  fs = require('fs');

const dbController = new DBController();

app.use(morgan('dev'));
app.use(express.static(__dirname + '//..//frontend//public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('app listening at http://' + host + ':' + port);
}

app.get('/graph', function (req: any, res: { status: (arg0: number) => { json: (arg0: string) => void; }; }) {
  const graph = dbController.getLoadedFile();
  res.status(200).json(graph);
});

app.post('/graph', function (req: any, res: { status: (arg0: number) => { json: (arg0: { message: string; }) => void; }; }) {
  dbController.save2File(req.body.graph);
  res.status(200).json({message:"ok"});
});

app.post('/login/', function (req: any, res: { status: (arg0: number) => { json: (arg0: { token: string; }) => void; }; }) {
  new LoginController().auth(req, res);
});

app.post('/userPath/', function (req: any, res: { status: (arg0: number) => { json: (arg0: { message: string; }) => void; }; }) {
  // for future features
  let path = req.body.userPath;

  res.status(200).json({message:"ok"});
});
