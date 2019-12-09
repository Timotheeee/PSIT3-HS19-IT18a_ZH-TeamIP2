#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBController_1 = require("./controllers/DBController");
const LoginController_1 = require("./controllers/LoginController");
const express = require('express'), bodyParser = require('body-parser'), morgan = require('morgan'), app = express(), fs = require('fs');
const dbController = new DBController_1.DBController();
const login = new LoginController_1.LoginController();
app.use(morgan('dev'));
app.use(express.static(__dirname + ''));
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
app.get('/graph', (request, response) => {
    const graphJSONString = dbController.getLoadedFile();
    response.status(200).json({ success: true, data: graphJSONString });
});
app.post('/graph', (request, response) => {
    if (request.body.graph) {
        dbController.save2File(request.body.graph);
        response.status(200).json({ success: true, data: '' });
    }
    else {
        response.status(200).json({ success: false, data: '' });
    }
});
app.post('/login/', (request, response) => {
    login.auth(request, response);
});
