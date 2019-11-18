#!/usr/bin/env node
import {DBController} from './controllers/DBController'
import { AnyNaptrRecord } from 'dns';
import { LoginController } from './controllers/LoginController';
import * as expressNS from 'express';

const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  mysql = require('mysql'),
  fs = require('fs');

const dbController = new DBController();
const login = new LoginController();

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

app.get('/graph', (request: expressNS.Request, response: expressNS.Response) => {
  const graphJSONString: string = dbController.getLoadedFile();
  response.status(200).json({ success: true, data: graphJSONString });
});

app.post('/graph', (request: expressNS.Request, response: expressNS.Response) => {
  dbController.save2File(request.body.graph);
  response.status(200).json({ success: true, data: '' });
});

app.post('/login/', (request: expressNS.Request, response: expressNS.Response) => {
  login.auth(request, response);
  response.status(200).json({ success: true, data: '' });
});
