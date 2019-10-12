#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dao_1 = require("./Dao");
const express = require('express'), bodyParser = require('body-parser'), morgan = require('morgan'), app = express(), mysql = require('mysql'), fs = require('fs');
var dao = new Dao_1.Dao();
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
app.get('/api/', function (req, res) {
    var graph = dao.getGraph();
    res.status(200).json(graph);
});
